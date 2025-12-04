module.exports = {
    mode: "development",
    entry: "./index.js",
    output: {
      path: __dirname + "/app",
      filename: "bundle.js",
      publicPath: "/app/",
    },
    devServer: {
      static: {
        directory: __dirname,
      },
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ["css-loader"]
        }]
    }
};
