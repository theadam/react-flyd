import flyd from 'flyd';
import key from 'keymaster';
import flydEvery from 'flyd-every';
import flydFilter from 'flyd-filter';
import scanMerge from 'flyd-scanmerge';
import R from 'ramda';

import Vector from '../utils/vector';
import flydStateMachine, {from, on, transitionTo, hasState, onTransition} from '../utils/flydStateMachine';

function flydAnimate(expectedDelay = 0){
  let s = flyd.stream();
  let last = Date.now();
  function animate() {
    if (s.end()) return;
    let now = Date.now();
    let diff = now - last;
    if(diff >= expectedDelay){
      last = now;
      s(now);
    }
    requestAnimationFrame(animate);
  }
  animate();
  return s;
}

// changes the vector's direction
const directions = {
  up: new Vector(0, -1),
  down: new Vector(0, 1),
  left: new Vector(-1, 0),
  right: new Vector(1, 0)
};

function sameAxis(dir1, dir2){
  return dir1.x === dir2.x || dir1.y === dir2.y;
}

function random(limit){
  return Math.floor(Math.random() * limit);
}

function createAppleStream(positionStream, bodyStream, width, height){
  let curApple = null;
  return flyd.stream([positionStream], () => {
    if(curApple === null || Vector.equal(positionStream(), curApple)){
      do{
        curApple = new Vector(random(width()), random(height()));
      }
      while(R.containsWith(Vector.equal, curApple, bodyStream()));

      return curApple;
    }
  });
}

function createPositionStream(ticks, reset, turnFilter){
  let turns = reset.map(() => directions.right)(directions.right);

  //  handles mapping keys to changing direction
  Object.keys(directions).forEach((direction) => key(direction, R.compose(R.F, () => turns(directions[direction]))));

  // Ensures that the direction isnt on the same axis as the last direction on the last tick
  let directionOnTick = scanMerge([
    [turnFilter(ticks.map(() => turns())), (dir, next) => sameAxis(dir, next) ? dir : next],
    [reset, () => directions.right]
  ], turns());

  return scanMerge([
    [directionOnTick, Vector.add],
    [reset, () => new Vector(0, 0)]
  ], new Vector(0, 0));
}

function createLifecycleStreams(){
  let s = {};

  s.pause = flyd.stream();
  key('p', R.compose(R.F, s.pause));
  key('space', R.compose(R.F, s.pause));

  s.start = flyd.stream();
  key('space', s.start);

  s.end = flyd.stream();

  s.restart = flyd.stream();
  key('r', R.compose(R.F, s.restart));
  key('space', R.compose(R.F, s.restart));

  let gameState = flydStateMachine('start', [
    on(s.start, transitionTo('running'), from('start')),
    on(s.pause, transitionTo('paused'), from('running')),
    on(s.pause, transitionTo('running'), from('paused')),
    on(s.end, transitionTo('end'), from('running')),
    on(s.restart, transitionTo('running'), from('end'))
  ]);

  s.isPaused = hasState('paused', gameState);
  s.isRunning = hasState('running', gameState);
  s.isAtStart = hasState('start', gameState);
  s.isAtEnd = hasState('end', gameState);

  s.reset = onTransition('end', 'running', gameState);

  return s;
}

export default function createStreams(){
  let s = {};

  s.height = flyd.stream(20);
  s.width = flyd.stream(20);

  s = R.merge(s, createLifecycleStreams());

  let runningFilter = R.curryN(2, flydFilter)(() => s.isRunning());

  // Ticks the game clock
  s.ticks = runningFilter(flydAnimate(100));

  s.position = createPositionStream(s.ticks, s.reset, runningFilter);

  s.body = scanMerge([
    [s.position, (bod, position) => bod.concat(position).slice(-s.length())],
    [s.reset, () => [s.position()]]
  ], [s.position()]);

  s.addToLength = flyd.stream();
  s.length = scanMerge([
    [s.addToLength, R.inc],
    [s.reset, () => 5]
  ], 5);

  let outOfBounds = flydFilter(v => v.x >= s.width() || v.x < 0 || v.y >= s.height() || v.y < 0, s.position);
  outOfBounds.map(s.end);

  let touchesBody = flydFilter(body => R.filter(unit => Vector.equal(unit, s.position()), body).length > 1, s.body);
  touchesBody.map(s.end);

  s.apple = createAppleStream(s.position, s.body, s.width, s.height);

  s.apple.map(s.addToLength);

  s.score = scanMerge([
    [s.apple, R.inc],
    [s.reset, () => 0]
  ], 0);

  return s;
}
