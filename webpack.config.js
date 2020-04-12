const path = require('path')

module.exports = {
  mode: "development",

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  devServer: {
    contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'dist')],
    publicPath: '/'
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".jsx", ".wasm", ".mjs", ".json", ".cjs"],
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  },
}
