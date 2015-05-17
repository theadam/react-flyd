import React, {Component} from 'react';

import Grid from './grid';
import Snake from './snake';
import PauseScreen from './pause-screen';
import {attach, pass} from '../../../src';

@attach('isPaused')
@pass(['pause', 'addToLength'])
export default class App extends Component{
  render(){
    return (
      <div>
        <svg height={this.props.height * this.props.cellHeight} width={this.props.width * this.props.cellWidth}>
          <g>
            <Grid {...this.props}/>
            <Snake unitWidth={this.props.cellWidth} unitHeight={this.props.cellHeight} />
            <PauseScreen height={this.props.height * this.props.cellHeight} width={this.props.width * this.props.cellWidth} />
          </g>
        </svg>
        <button onClick={this.props.pause}>{this.props.isPaused ? 'Unpause' : 'Pause'}</button>
        <button onClick={this.props.addToLength}>Eat</button>
      </div>
    );
  }
}
