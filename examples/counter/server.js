import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';

config.entry.push('webpack-dev-server/client?http://localhost:3000');
config.entry.push('webpack/hot/only-dev-server');

config.plugins.push(new webpack.HotModuleReplacementPlugin());

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
  },
}).listen(3000, 'localhost', err => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }

  // eslint-disable-next-line no-console
  console.log('Listening at localhost:3000');
});
