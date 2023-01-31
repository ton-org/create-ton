#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import inquirer from 'inquirer';

const PACKAGE_JSON = 'package.json';

async function main() {
    const { name, variant } = await inquirer.prompt([
        {
            name: 'name',
            message: 'Project name',
        },
        {
            name: 'variant',
            message: 'Choose the project template',
            type: 'list',
            choices: [
                {
                    name: 'An empty contract',
                    value: 'empty',
                },
                {
                    name: 'A simple counter contract',
                    value: 'counter',
                },
            ],
        },
    ]);

    if (name.length === 0) throw new Error('Cannot initialize a project with an empty name');

    await fs.mkdir(name);

    const steps = 2;

    console.log(`[1/${steps}] Copying files...`);

    const basePath = path.join(__dirname, 'template');
    for (const file of await fs.readdir(basePath)) {
        if (file === PACKAGE_JSON || file === 'variants') continue;
        await fs.copy(path.join(basePath, file), path.join(name, file));
    }

    const variantPath = path.join(basePath, 'variants', variant);
    for (const file of await fs.readdir(variantPath)) {
        await fs.copy(path.join(variantPath, file), path.join(name, file));
    }

    await fs.writeFile(
        path.join(name, '.gitignore'),
        `node_modules
temp
build`
    );

    await fs.writeFile(
        path.join(name, PACKAGE_JSON),
        (await fs.readFile(path.join(basePath, PACKAGE_JSON))).toString().replace('{{name}}', name)
    );

    console.log(`[2/${steps}] Installing dependencies...`);

    execSync('npm i', {
        stdio: 'inherit',
        cwd: name,
    });

    execSync('git init', {
        stdio: 'inherit',
        cwd: name,
    });

    console.log('\nInitialized git repository.\n');

    console.log(`Success!
Now you can run the following to run the default tests:
cd ${name}
npm run test

You can also run the following commands in your project's directory:

npx blueprint create MyContract
creates all the necessary files for a new contract

npx blueprint build
asks you to choose a contract and builds it

npx blueprint run
asks you to choose a script and runs it
`);
}

main().catch(console.error);
