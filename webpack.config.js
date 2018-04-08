"use strict";
const webpack = require('webpack');
const path = require('path');
const flowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

module.exports = {
	entry: './src/js/app.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'public/js')
	},
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
		},{
			test: /\.scss/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						url: true,
						importLoaders: 2
					}
				},
				'sass-loader'
			]
		},{
			test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
			loader: 'url-loader'
		}]
	},
	plugins: [
		new flowBabelWebpackPlugin(),
		new webpack.LoaderOptionsPlugin({ options: {} }),
	]
};
