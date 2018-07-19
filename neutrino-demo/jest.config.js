module.exports = {
    roots: ['./'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleDirectories: ['node_modules', './src'],
    testRegex: '(/test/.*|(\\.|/)(test|spec))\\.tsx?$'
};
