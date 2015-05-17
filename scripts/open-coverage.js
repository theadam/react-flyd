var path = require('path');
console.log('opening coverage report coverage/index.html');
require('open')(path.resolve(__dirname, '../coverage/index.html'));
