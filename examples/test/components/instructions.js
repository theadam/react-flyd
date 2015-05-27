import React, {Component} from 'react';

const text = {
  'Arrow Keys': 'Change directions',
  'Space Bar': 'Start/Pause/Restart game'
};

export default class Instructions extends Component {

  keyStyle = () => {
    return {
      fontWeight: 'bold'
    };
  }

  divStyle = () => {
    return {
      float: 'left'
    };
  }

  renderKey = (key) => {
    return (
      <div key={key} style={this.keyStyle()}>
        <span>{key}: </span>
      </div>
    );
  }

  renderValue = (val) => {
    return (
      <div key={val}>
        <span>{val}</span>
      </div>
    );
  }

  render(){
    let divStyle = this.divStyle();
    return (
      <div style={{marginTop: 15}}>
        <div style={divStyle}>
          {Object.keys(text).map(this.renderKey)}
        </div>
        <div style={Object.assign({marginLeft: 15}, divStyle)}>
          {Object.keys(text).map((x) => text[x]).map(this.renderValue)}
        </div>
      </div>
    );
  };
}
