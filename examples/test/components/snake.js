import React, {Component} from 'react';

import BodyUnit from './body-unit'
import {attach} from '../../../src';

@attach('body')
export default class Snake extends Component {
  render(){
  return (
    <g>
      {
        this.props.body.map((pos, i) => {
          return <BodyUnit x={pos.x} y={pos.y} width={this.props.unitWidth} height={this.props.unitHeight} key={i} />;
        }, this)
      }
    </g>);
  }
}
