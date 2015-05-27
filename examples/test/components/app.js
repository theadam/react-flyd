import React, {Component} from 'react';

import Grid from './grid';
import Snake from './snake';
import PauseScreen from './pause-screen';
import StartScreen from './start-screen';
import EndScreen from './end-screen';
import Instructions from './instructions';
import Title from './title';

import Apple from './apple';
import {attach, pass} from '../../../src';

@attach(['isPaused', 'height', 'width', 'isAtEnd', 'isAtStart'])
@pass(['pause', 'addToLength', 'start', 'restart'])
export default class App extends Component{

  render(){
    return (
      <div style={{width: this.props.width * this.props.cellWidth}}>
        <Title>SNAKE!</Title>
        <svg height={this.props.height * this.props.cellHeight} width={this.props.width * this.props.cellWidth}>
          <g>
            <Grid {...this.props}/>
            <Snake unitWidth={this.props.cellWidth} unitHeight={this.props.cellHeight} />
            <Apple width={this.props.cellWidth} height={this.props.cellHeight} />
            {this.props.isPaused ?
                <PauseScreen height={this.props.height * this.props.cellHeight} width={this.props.width * this.props.cellWidth} />
              : null}
            {this.props.isAtStart ?
                <StartScreen height={this.props.height * this.props.cellHeight} width={this.props.width * this.props.cellWidth} />
              : null}
            {this.props.isAtEnd ?
                <EndScreen height={this.props.height * this.props.cellHeight} width={this.props.width * this.props.cellWidth} />
              : null}
          </g>
        </svg>
        <Instructions />
      </div>
    );
  }
}
