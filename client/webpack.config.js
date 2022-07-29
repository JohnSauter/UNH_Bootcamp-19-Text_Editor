const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    devtool: "source-map",
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
      editor: "./src/js/editor.js",
      header: "./src/js/header.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      /* Without publicPath the HTML looks for the manifest in dist/auto/. */
      publicPath: "",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "text_editor",
      }),

      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "./sw.js",
      }),

      new MiniCssExtractPlugin(),

      new WebpackPwaManifest({
        name: "text_editor",
        short_name: "jate",
        description: "JATE text editor",
        background_color: "#ffffff",
        fingerprints: false,
        crossorigin: "use-credentials", //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
