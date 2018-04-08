"use strict";
const webpack = require('webpack');
const path = require('path');
const flowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

module.exports = {
	// エントリーポイントの設定
	entry: './src/js/app.js',
	// 出力の設定
	output: {
		// 出力するファイル名
		filename: 'bundle.js',
		// 出力先の絶対パス
		path: path.join(__dirname, 'public/js')
	},
	// ローダーの設定
	module: {
		rules: [{
			enforce: 'pre',
			test: /\.js$/,
			loader: 'eslint-loader',
			exclude: /node_modules/,
			options: {
				emitWarning: true
			}
		},{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [['env', {
						targets: {
							browsers: [
								'android >= 2',
								'ios >= 7',
								'ie >= 10',
								'chrome >= 50'
							]
						}
					}]],
					plugins: ['babel-plugin-transform-flow-strip-types']
				}
			}]
		}]
	},
	plugins: [
		new flowBabelWebpackPlugin(),
		new webpack.LoaderOptionsPlugin({ options: {} }),
	]
};
