import React, {Component} from 'react';

export default class BodyUnit extends Component {
  style = {
    fill: 'rgb(0,200,0)',
    stroke: 'rgb(0,100,0)'
  }

  render(){
    return <rect
      width={this.props.width}
      height={this.props.width}
      x={this.props.x * this.props.width}
      y={this.props.y * this.props.height}
      style={this.style} rx={this.props.width / 4} ry={this.props.height / 4}/>;
  }
}
