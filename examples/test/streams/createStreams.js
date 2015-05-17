import flyd from 'flyd';
import key from 'keymaster';
import flydEvery from 'flyd-every';
import flydFilter from 'flyd-filter';
import R from 'ramda';

import Vector from '../utils/vector';

// changes the vector's direction
const up = (dir) => dir.x === 0 ? dir : new Vector(0, -1);
const down = (dir) => dir.x === 0 ? dir : new Vector(0, 1);
const left = (dir) => dir.y === 0 ? dir : new Vector(-1, 0);
const right = (dir) => dir.y === 0 ? dir : new Vector(1, 0);

export default function createStreams(){
  let s = {};
  s.pause = flyd.stream();
  key('p', s.pause);
  s.isPaused = flyd.scan(R.not, false, s.pause);

  s.turns = flyd.stream();

  //  handles mapping keys to changing direction
  key('left', () => s.turns(left));
  key('right', () => s.turns(right));
  key('up', () => s.turns(up));
  key('down', () => s.turns(down));

  // Ticks the game clock
  s.ticks = flydFilter(() => !s.isPaused(), flydEvery(150));

  s.direction = flyd.scan((dir, f) => f(dir), new Vector(1, 0), s.turns);

  s.addToLength = flyd.stream();
  s.length = flyd.scan(R.inc, 5, s.addToLength);

  s.position = flyd.scan(Vector.add, new Vector(0, 0), s.ticks.map(() => s.direction()));

  s.body = flyd.scan((bod, position) => bod.concat(position).slice(-s.length()), [], s.position);
  return s;
}
