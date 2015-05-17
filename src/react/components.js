import React from 'react';
import R from 'ramda';
import flydObj from 'flyd-obj';

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

    componentWillMount(){
      var stream = flydObj.stream(projectAll(this.props.streams, streams));
      this.toEnd = [stream];
      stream.map((v) => this.setState(v));
    },

    componentDidUnmount(){
      this.toEnd.forEach((s) => s.end(true));
    },

    render(){
      return <ReactClass {...this.props} {...this.state} streams={this.props.streams} />;
    }
  }));
});

export const pass = R.curryN(2, function(streams, ReactClass){
  return contextifyStreams(React.createClass({

    componentWillMount(){
      this.setState(projectAll(this.props.streams, streams));
    },

    render(){
      return <ReactClass {...this.props} {...this.state} streams={this.props.streams} />;
    }
  }));
});
