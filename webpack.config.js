const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
                            loader: 'css-loader'
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