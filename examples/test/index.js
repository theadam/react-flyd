import React from 'react';

import createStreams from './streams/createStreams';
import App from './components/app';

const streams = createStreams();
function render(){
  let width = window.innerWidth;
  let height = window.innerHeight - 200;
  let min = Math.max(Math.min(width, height), 400);
  console.log(width, height);
  React.render(<App streams={streams} cellWidth={min / 20} cellHeight={min / 20} />, document.body);
}

window.addEventListener('resize', render);
render();
