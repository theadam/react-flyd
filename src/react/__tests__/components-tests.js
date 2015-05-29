import React, {Component} from 'react';
import flyd from 'flyd';
import expect from 'expect.js';

import {attach, pass, contextifyStreams} from '../components';

@pass('passedStream')
@attach('attachedStream')
class BottomComponent extends Component {
  componentWillMount(){
    if(this.props.passedStream){
      this.props.passedStream('From Bottom Component');
    }
  }

  render(){
    if(this.props.attachedStream){
      return <span>{this.props.attachedStream}</span>;
    }
    return null;
  }
}

class TopComponent extends Component {
  render(){
    return <BottomComponent />;
  }
}

describe('components', () => {
  describe('contextifyStreams', () => {
    it('should propogate streams prop in context to children', () => {
      let Comp = contextifyStreams(TopComponent);
      let output = React.renderToStaticMarkup(<Comp streams={{attachedStream: flyd.stream('test')}} />);

      expect(output).to.be('<span>test</span>');
    });
  });

  describe('attach', () => {
    it('should propogate streams prop in context to children', () => {
      let Comp = attach('ANYTHING', TopComponent);
      let output = React.renderToStaticMarkup(<Comp streams={{attachedStream: flyd.stream('test')}} />);

      expect(output).to.be('<span>test</span>');
    });

    it('should be able to attach the value of a stream', () => {
      let output = React.renderToStaticMarkup(<BottomComponent streams={{attachedStream: flyd.stream('test')}} />);

      expect(output).to.be('<span>test</span>');
    });
  });

  describe('pass', () => {
    it('should propogate streams prop in context to children', () => {
      let Comp = pass('ANYTHING', TopComponent);
      let output = React.renderToStaticMarkup(<Comp streams={{attachedStream: flyd.stream('test')}} />);

      expect(output).to.be('<span>test</span>');
    });

    it('should be able to pass the value of a stream', () => {
      let stream = flyd.stream();
      let output = React.renderToStaticMarkup(<BottomComponent streams={{passedStream: stream}} />);

      expect(output).to.be('<noscript></noscript>');
      expect(stream()).to.be('From Bottom Component');
    });
  });
});
