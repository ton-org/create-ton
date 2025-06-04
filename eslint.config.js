const base = require('@ton/toolchain');

module.exports = [
    ...base,
    {
        rules: {
            'no-console': 'off',
        },
    },
];
