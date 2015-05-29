import 'babel/polyfill';
import React from 'react';

import createStreams from './streams/createStreams';
import App from './components/app';

const streams = createStreams();
function render(){
  let width = window.innerWidth;
  let height = window.innerHeight - 200;
  let min = Math.max(Math.min(width, height), 400);
  let cellSize = Math.floor(min / 20);
  React.render(<App streams={streams} cellWidth={cellSize} cellHeight={cellSize} />, document.getElementById('content'));
}

window.addEventListener('resize', render);
render();
