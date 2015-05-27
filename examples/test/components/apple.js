import React, {Component} from 'react';
import {attach} from '../../../src';

@attach('apple')
export default class Apple extends Component {
  style = {
    fill: 'rgb(255,0,0)',
    stroke: 'rgb(0,100,0)'
  }

  render(){
    return <rect
      width={this.props.width}
      height={this.props.width}
      x={this.props.apple.x * this.props.width}
      y={this.props.apple.y * this.props.height}
      style={this.style} rx={this.props.width / 2} ry={this.props.height / 2}/>;
  }
}
