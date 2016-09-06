module.exports = {
    devtool: "eval",
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
