/**
 *
 * Why do we need this file?
 * For cases where manual eslint usage is required (e.g. editor/IDE support),
 * creating an .eslintrc.js which does nothing more than call the Neutrino API to generate a config
 * that's equivalent to the one used by neutrino lint.
 *
 */

const { Neutrino } = require('neutrino');

module.exports = Neutrino({ root: __dirname })
    .use('.neutrinorc.js')
    .call('eslintrc');
