import React from 'react';

import createStreams from './streams/createStreams';
import App from './components/app';

const streams = createStreams();

React.render(<App streams={streams} cellWidth={20} cellHeight={20} height={20} width={20} />, document.body);
