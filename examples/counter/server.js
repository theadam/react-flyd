/* eslint-disable */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

config.entry.push('webpack-dev-server/client?http://localhost:3000');
config.entry.push('webpack/hot/only-dev-server');

config.plugins.push(new webpack.HotModuleReplacementPlugin());

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
