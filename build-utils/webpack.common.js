const commonPaths = require('./common-paths')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = {
	entry: commonPaths.appEntry,
	output: {
		path: commonPaths.outputPath,
		filename: '[hash].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.png/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000
						}
					}
				]
			},
			{
				test: /\.css/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.js/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	resolve: {
		alias: {
			jquery: 'jquery/src/jquery'
		}
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new CleanWebpackPlugin(['dist'], {
			root: commonPaths.root
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.template.ejs',
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor',
		// 	filename: 'vendor-[hash].min.js'
		// }),
		// new BundleAnalyzerPlugin()
	]
}
module.exports = config