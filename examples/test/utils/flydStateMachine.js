import flyd from 'flyd';
import R from 'ramda';

function skipDups(s){
  return flyd.stream([s], (self) => {
    if(s() !== self()){
      self(s());
    }
  });
}

export const always = () => true;
export const from = (...args) => (fromState) => args.indexOf(fromState) > -1;

export const transitionTo = (value) => () => value;

export const hasState = flyd.curryN(2, (state, machine) => skipDups(flyd.stream([machine], () => machine() === state)));

export const onTransition = (fromState, toState, machine) => {
  let curState = machine();
  return flyd.stream([machine], () => {
    if(curState === fromState && machine() === toState){
      return true;
    }
    curState = machine();
  });
};

export const on = (stream, transitionFn, predicate) => {
  return stream.map(() => {
    return (state) => {
      let fromState = state;
      let toState = transitionFn(stream, fromState);
      if(predicate(fromState, toState)){
        return toState;
      }
    };
  });
};


export default function flydStateMachine(init, states) {
  let s = flyd.immediate(flyd.stream(states, (self, changed) => {
    for(let stream of changed){
      let stateFn = stream();
      let val = stateFn(self());
      if(val){
        return val;
      }
    }
  }));
  s(init);
  return s;
}
