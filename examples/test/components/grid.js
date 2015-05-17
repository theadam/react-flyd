import React, {Component} from 'react';

import Cell from './cell';

export default class Grid extends Component {
  render(){
    var list = [];
    for(var i = 0; i < this.props.width; i++){
      for(var j = 0; j < this.props.height; j++){
        list.push(<Cell width={this.props.cellWidth} height={this.props.cellWidth} key={i+'-'+j} x={i} y={j} />);
      }
    }
    return (
       <g>
         {list}
       </g>
    );
  }
}
