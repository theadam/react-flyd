import flyd from 'flyd';
import expect from 'expect.js';

import flydStateMachine, {on, from, always, transitionTo, hasState} from '../flydStateMachine';

describe('flydStateMachine', () => {

  let event1;
  let event2;
  let event3;
  let event4;
  let machine;

  beforeEach(() => {
    event1 = flyd.stream();
    event2 = flyd.stream();
    event3 = flyd.stream();
    event4 = flyd.stream();
    machine = flydStateMachine('state1', [
      on(event1, transitionTo('state1'), always),
      on(event2, transitionTo('state2'), always),
      on(event3, transitionTo('state3'), from('state2')),
      on(event4, transitionTo('state4'), from('state1')),
      on(event4, transitionTo('otherState4'), from('state2'))
    ]);
  });

  it('should transition on state changes', () => {

    expect(machine()).to.be('state1');
    event2(true);
    expect(machine()).to.be('state2');
    event3(true);
    expect(machine()).to.be('state3');
    event1(true);
    expect(machine()).to.be('state1');
    event3(true);
    expect(machine()).to.be('state1');
    event4(true);
    expect(machine()).to.be('state4');
    event2(true);
    expect(machine()).to.be('state2');
    event4(true);
    expect(machine()).to.be('otherState4');
  });

  it('should be able to create isState streams', () => {
    let isState2 = hasState('state2', machine);
    expect(isState2()).to.be(false);
    machine('state2');
    expect(isState2()).to.be(true);
  });

});
