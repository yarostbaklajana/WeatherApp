const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = function (env) {
    const isProd = env === "prod";
    if (isProd) {
        process.env.NODE_ENV = "production";
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
                    test: /\.json$/,
                    use: 'json-loader'
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
            })
        ]
    }

    if (isProd) {
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        )
    }
    return config;

}