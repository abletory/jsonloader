const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');
module.exports = {
    ...jestConfig,
    moduleNameMapper: {
        '^c/cssLibrary$':
            '<rootDir>/force-app/main/default/lwc/cssLibrary/cssLibrary.css',
        '^lightning/refresh*':
            '<rootDir>/force-app/test/jest-mocks/lightning/refresh'
    },
    setupFiles: ['jest-canvas-mock'],
    testTimeout: 10000
};
