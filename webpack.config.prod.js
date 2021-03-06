const path = require("path");
const WebpackShellPlugin = require("webpack-shell-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        OpenInSteam: "./src/Main.js",
        OISPopup: "./src/Popup.js",
    },
    output: {
        filename: "[name]/index.js",
        path: path.resolve(__dirname, "dist/"),
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name]/index.css",
        }),
        new WebpackShellPlugin({
            onBuildStart: ["rm -rf dist/"],
            onBuildExit: ["./package.sh"],
        }),
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
            ],
        }],
    },
};
