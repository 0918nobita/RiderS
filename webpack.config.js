"use strict";
const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const flowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

module.exports = env => {
	let config = {
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
				// ローダーの処理対象ファイル
				test: /\.js$/,
				// 除外するディレクトリ
				exclude: /node_modules/,
				// 利用するローダー
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
				// babel-loader よりも優先する
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			}]
		},
		plugins: [
			new flowBabelWebpackPlugin()
		]
	};
	if (env !== void 0 && env.production !== void 0) config.plugins.push(new uglifyJsPlugin({uglifyOptions: {ecma: 6}}));
	return config;
};
