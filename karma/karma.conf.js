var webpackConfig = require('../webpack/webpack.config.client');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    // karma only needs to know about the test bundle
    files: [
      '../node_modules/babel-polyfill/browser.js',
      './tests.js'
    ],
    frameworks: [ 'chai', 'mocha' ],
    plugins: [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    preprocessors: {
      'tests.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
  });
};
