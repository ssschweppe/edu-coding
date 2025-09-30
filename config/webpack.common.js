const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlPages = require("./webpack.pages.js");
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/javascripts/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(".", "docs"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png | svg | jpg | jpeg | webp | gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.(ttf | otf | woff | woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]", // hash обновляет информацию(?)
        },
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [new MiniCssExtractPlugin(), ...htmlPages],
};
