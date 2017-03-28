const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = function (env) {
    
    const isProd = env === "prod";
    if (isProd) {
        process.env.NODE_ENV = "production";
    }

    console.info(`This build is in production mode: ${isProd}`);

    if(!process.env.OPENWEATHER_API_KEY) {
        throw new Error('You need to set OPENWEATHER_API_KEY as environment variable!');
    }

    const config = {
        context: path.join(__dirname, '/src'),
        entry: './index',
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.jsx', '.js']
        },

        module: {
            rules: [
                {
                    test: /\.(jsx|js)$/,
                    use: 'babel-loader',
                    exclude: ['node_modules']
                },
                
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },

                {
                    test: /\.css$/,
                    use: ExtractTextWebpackPlugin.extract({
                        use: {
                            loader: 'css-loader',
                            options: {
                                minimize: isProd
                            }
                        }
                    })
                }

            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: "index.html"
            }),

            new ExtractTextWebpackPlugin({
                filename: "bundle.css"
            }),

            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
        ]
    }

    if (isProd) {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        )
    }
    return config;

}