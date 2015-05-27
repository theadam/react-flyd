import React, {Component} from 'react';

export default class StartScreen extends Component {
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
        <text x={x} y={this.props.height / 2} style={this.textStyle}>
          <tspan x={x} dy="-0.5em">Press Space</tspan>
          <tspan x={x} dy="1.2em">to Start!</tspan>
        </text>
      </g>);
  }
}
