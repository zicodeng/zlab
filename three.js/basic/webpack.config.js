const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outDir = './dist';
const context = __dirname;

module.exports = {
    entry: {
        index: './src/index.ts'
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, outDir)
    },
    context,
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css', '.scss'],
        modules: ['node_modules', 'src']
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            // There should be 1 cpu for the fork-ts-checker-webpack-plugin.
                            workers: require('os').cpus().length - 1
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            // IMPORTANT! Use happyPackMode mode to speed-up
                            // compilation and reduce errors reported to webpack.
                            happyPackMode: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            tslint: true,
            // watch is optional but improves performance (fewer stat calls).
            watch: ['./src', './test']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
