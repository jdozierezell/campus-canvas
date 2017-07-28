const commonConfig = require('./build-utils/webpack.common')
const webpackMerge = require('webpack-merge')

module.exports = (env) => { // function syntax rather than object syntax allows for env variable to be passed in
	console.log(env)

	const envConfig = require(`./build-utils/webpack.${env.env}.js`)

	return webpackMerge(commonConfig, envConfig)
}