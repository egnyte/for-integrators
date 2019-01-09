module.exports = {
    mode: "development",
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ["css-loader"]
        }]
    }
};
