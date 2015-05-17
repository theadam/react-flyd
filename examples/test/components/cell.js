import React, {Component} from 'react';

export default class Cell extends Component {
  style = {
    fill: 'rgb(255,255,255)',
    stroke: 'rgb(0,0,0)'
  }

  render(){
    return <rect
      width={this.props.width}
      height={this.props.width}
      x={this.props.x * this.props.width}
      y={this.props.y * this.props.height}
      style={this.style} />;
  }
}
