import React, {Component} from 'react';

export default class Title extends Component {

  style = {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold'
  }

  render(){
    return <h1 style={this.style}>{this.props.children}</h1>;
  }

}
