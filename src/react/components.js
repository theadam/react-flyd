import React from 'react';
import R from 'ramda';
import flydObj from 'flyd-obj';
import flyd from 'flyd';

import {projectAll} from './utils';

export function contextifyStreams(ReactClass){
  return React.createClass({
    propTypes: {
      streams: React.PropTypes.object
    },

    contextTypes: {
      streams: React.PropTypes.object
    },

    childContextTypes: {
      streams: React.PropTypes.object
    },

    getChildContext() {
      return { streams: this.getStreams() };
    },

    getStreams() {
      return this.props.streams || this.context.streams;
    },

    render() {
      return <ReactClass {...this.props} streams={this.getStreams()} />;
    }
  });
}

export const attach = R.curryN(2, function(streams, ReactClass){
  return contextifyStreams(React.createClass({

    getInitialState(){
      this.stream = flyd.immediate(flydObj.stream(projectAll(this.props.streams, streams)));
      return this.stream();
    },

    componentDidMount(){
      this.stream.map(v => this.setState(v));
    },

    componentWillUnmount(){
      this.stream.end(true);
    },

    render(){
      return <ReactClass {...this.props} {...this.state} streams={this.props.streams} />;
    }
  }));
});

export const pass = R.curryN(2, function(streams, ReactClass){
  return contextifyStreams(React.createClass({

    getInitialState(){
      return projectAll(this.props.streams, streams);
    },

    render(){
      return <ReactClass {...this.props} {...this.state} streams={this.props.streams} />;
    }
  }));
});
