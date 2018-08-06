const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: ['node_modules', 'src']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        })
    ]
};
