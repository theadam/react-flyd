'use strict';

var webpack = require('webpack');

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

var flydExternal = {
  root: 'flyd',
  commonjs2: 'flyd',
  commonjs: 'flyd',
  amd: 'flyd'
};

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }]
  },
  output: {
    library: 'reactFlyd',
    libraryTarget: 'umd'
  },
  externals: {
    react: reactExternal,
    flyd: flydExternal
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js']
  }
};
