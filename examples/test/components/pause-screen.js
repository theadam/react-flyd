import React, {Component} from 'react';

import {attach, pass} from '../../../src';

@attach('isPaused')
export default class PauseScreen extends Component {
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
    if(this.props.isPaused){
      return (
        <g>
          <rect style={this.overlayStyle} width={this.props.width} height={this.props.height} />
          <text x={this.props.width / 2} y={this.props.height / 2} style={this.textStyle}>Paused</text>
        </g>);
    }
    return null;
  }
}
