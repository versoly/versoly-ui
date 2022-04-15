const { SourceMapDevToolPlugin } = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    "versoly-ui": path.resolve(__dirname, 'src/js/versoly-ui.js')
  },
  output: {
    filename: 'versoly-ui.js',
    library: {
      type: 'module',
    },
    // prevent error: `Uncaught ReferenceError: self is not define`
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      })],
  },
  experiments: {
    outputModule: true,
  },
};
