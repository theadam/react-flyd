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
    let fullWidth = this.props.width * this.props.cellWidth + 2;
    let fullHeight = this.props.height * this.props.cellHeight;
    return (
      <div style={{width: fullWidth, marginLeft: window.innerWidth / 2 - fullWidth / 2}}>
        <Title>SNAKE!</Title>
        <svg height={fullHeight} width={fullWidth}>
          <g>
            <Grid {...this.props}/>
            <Snake unitWidth={this.props.cellWidth} unitHeight={this.props.cellHeight} />
            <Apple width={this.props.cellWidth} height={this.props.cellHeight} />
            {this.props.isPaused ?
                <PauseScreen height={fullHeight} width={fullWidth} />
              : null}
            {this.props.isAtStart ?
                <StartScreen height={fullHeight} width={fullWidth} />
              : null}
            {this.props.isAtEnd ?
                <EndScreen height={fullHeight} width={fullWidth} />
              : null}
          </g>
        </svg>
        <Instructions />
      </div>
    );
  }
}
