const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { merge } = require('@neutrinojs/compile-loader');

// Customize Neutrino with object format.
module.exports = {
    // Override build behavior
    options: {
        mains: {
            index: 'index'
        }
    },

    // Using middleware:
    // inform Neutrino to load additional middleware when it runs,
    // including any additional files you wish to include as middleware
    use: [
        [
            '@neutrinojs/react',
            {
                html: {
                    title: 'Neutrino Demo'
                }
            }
        ],
        [
            '@neutrinojs/style-loader',
            {
                // Override the default file extension of `.css` if needed
                test: /\.(css|sass|scss)$/,
                moduleTest: /\.module\.(css|sass|scss)$/,
                loaders: [
                    // Define loaders as objects
                    {
                        loader: 'sass-loader',
                        useId: 'sass-loader',
                        options: {
                            includePaths: [
                                path.resolve(__dirname, './src/stylesheets')
                            ]
                        }
                    }
                ]
            }
        ],
        // In the Neutrino API, the config property is an instance of webpack-chain,
        // which allows us to modify underlying Webpack configuration file.
        // Resolve path for src directory
        neutrino =>
            neutrino.config.resolve.modules.add(neutrino.options.source),
        // Add support for TypeScript
        neutrino =>
            // Loader order is the same as in Webpack: bottom to top
            neutrino.config.module
                .rule('typescript')
                .test(/\.tsx?$/)
                .exclude.add(/(node_modules|bower_components)/)
                .end()
                .use('cache-loader')
                .loader('cache-loader')
                .end()
                .use('thread-loader')
                .loader('thread-loader')
                .options({
                    // There should be 1 cpu for the fork-ts-checker-webpack-plugin.
                    workers: require('os').cpus().length - 1
                })
                .end()
                .use('ts-loader')
                .loader('ts-loader')
                .options({
                    happyPackMode: true
                })
                .end(),
        // Create named plugins
        neutrino =>
            neutrino.config
                .plugin('fork-ts-checker')
                .use(ForkTsCheckerWebpackPlugin, [
                    {
                        checkSyntacticErrors: true,
                        tslint: true,
                        // watch is optional but improves performance (fewer stat calls).
                        watch: ['./src', './test']
                    }
                ])
    ],

    // Environment-specific overrides:
    // selectively make changes based on the values of any arbitrary environment variable
    env: {
        NODE_ENV: {
            production: {
                // use: ['@neutrinojs/...']
            },
            development: {
                // ...
            },
            test: {
                // ...
            }
        }
    }
};
