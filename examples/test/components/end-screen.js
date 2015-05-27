import React, {Component} from 'react';
import {attach} from '../../../src';

@attach('score')
export default class EndScreen extends Component {
  overlayStyle = {
    fillOpacity: 0.6
  }

  textStyle = {
    fontWeight: 'bold',
    fontSize: 40,
    textAnchor: 'middle',
    fill: 'white'
  }

  render(){
    let x = this.props.width / 2;
    return (
      <g>
        <rect style={this.overlayStyle} width={this.props.width} height={this.props.height} />
        <text x={x} y={this.props.height / 3} style={this.textStyle}>
          <tspan x={x} >Game Over</tspan>
          <tspan x={x} dy="1em">
            <tspan>You Scored </tspan>
            <tspan>{this.props.score}</tspan>
          </tspan>
          <tspan x={x} dy="1em"> Points</tspan>
          <tspan x={x} dy="2em">Press Space</tspan>
          <tspan x={x} dy="1em">to Restart!</tspan>
        </text>
      </g>);
  }
}
