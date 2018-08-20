module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'index.js',
        library: 'Button',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
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
    }
};
