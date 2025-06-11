jest.mock('child_process');
jest.mock('fs-extra');
jest.mock('inquirer', () => ({
    prompt: jest.fn(),
}));

import * as child_process from 'child_process';

import * as fsExtra from 'fs-extra';
import * as inquirer from 'inquirer';

import { main } from './main';

const mockedFs = fsExtra as unknown as { [K in keyof typeof fsExtra]: jest.Mock };
const mockedPrompt = inquirer.prompt as unknown as jest.Mock;
const mockedExec = child_process as unknown as { execSync: jest.Mock };

describe('main', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockedPrompt.mockImplementation((questions: any) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const answers: any = {};
            for (const q of Array.isArray(questions) ? questions : [questions]) {
                if (q.name === 'name') answers[q.name] = 'TestProject';
                if (q.name === 'contractName') answers[q.name] = 'TestContract';
                if (q.name === 'variant') answers[q.name] = 'func-empty';
            }
            return Promise.resolve(answers);
        });
        mockedFs.readdir.mockResolvedValue(['index.ts', 'package.json']);
        mockedFs.readFile.mockResolvedValue('{"name": "{{name}}"}');
        mockedFs.writeFile.mockResolvedValue(undefined);
        mockedFs.copy.mockResolvedValue(undefined);
        mockedFs.mkdir.mockResolvedValue(undefined);
        mockedExec.execSync.mockImplementation(() => Buffer.from(''));
    });

    it('should create a project with --no-ci and fill templates', async () => {
        process.argv = [
            'node',
            'cli.js',
            'TestProject',
            '--type',
            'func-empty',
            '--contractName',
            'TestContract',
            '--no-ci',
        ];

        await main();

        expect(mockedFs.mkdir).toHaveBeenCalledWith(expect.stringContaining('TestProject'), { recursive: true });
        expect(mockedFs.copy).toHaveBeenCalled();
        expect(mockedFs.writeFile).toHaveBeenCalledWith(
            expect.stringContaining('package.json'),
            expect.stringContaining('TestProject'),
        );
    });
});
