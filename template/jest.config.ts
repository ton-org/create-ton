import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    globalSetup: './jest.setup.ts',
    cache: false, // disabled caching to prevent old Tact files from being used after a rebuild
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
