# Neutrino Demo

This project demostrates basic usage of Neutrino.

## Features

While Neutrino is a powerful tool to start modern JavaScript applications with ease, this project aims to test Neutrino for the following features:

-   The ability to start a development server (e.g. webpack-dev-server).

    > Good: webpack-dev-server is used under underneath; HMR (Hot Module Replacement) can be configured easily.

-   The ability to transpile TypeScript to JavaScript.

    > Good: `ts-loader` can be added easily via Neutrino API.

-   The ability to transpile SASS to CSS.

    > Good: `sass-loader` can be added easily in `@neutrinojs/style-loader` middleware.

-   The ability to customize configuration files.

    > Good: Neutrino API and Webpack chain API make underlying Webpack configuration customizable.

-   The ability to support JavaScript new features (e.g. ES6, ES7).

    > Good: Babel is used by default, and it requires no further configuration.

-   The ability to support React.

    > Good: supported by `@neutrinojs/react` middleware.

-   The ability to run tests written in TypeScript.

    > Ok: for some reasons, the command `neutrino test` fails to apply Babel loader with correct presets and plugins. The workaround is to create jest configurations in `jest.config.js` and use command `jest test` directly.

## References

https://neutrinojs.org/
