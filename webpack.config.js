// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';


const config = {
  entry: {
		index: './src/scripts/index.js',
		megamenu: './src/scripts/megamenu.js',
		footer: './src/scripts/footer.js',
		readmore: './src/scripts/readmore.js', 
		blogheader: './src/scripts/blogheader.js',
  },
  output: {
    filename: '[name].min.js',
    path: __dirname + '/assets',
  },
	plugins: [
		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	],
	module: {
		rules: [{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			}
			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
	},
};

module.exports = () => {
  config.mode = 'production',
	config.watch = true
	
  return config;
};