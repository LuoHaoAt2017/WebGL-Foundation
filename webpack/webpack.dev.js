const { merge } = require("webpack-merge");
const config = require("./webpack.config");

module.exports = merge(config, {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
});
