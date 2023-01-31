#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';

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

    console.log(`Success!`);
    console.log(chalk.blueBright(`
     ____  _    _   _ _____ ____  ____  ___ _   _ _____ 
    | __ )| |  | | | | ____|  _ \\|  _ \\|_ _| \\ | |_   _|
    |  _ \\| |  | | | |  _| | |_) | |_) || ||  \\| | | |  
    | |_) | |__| |_| | |___|  __/|  _ < | || |\\  | | |  
    |____/|_____\\___/|_____|_|   |_| \\_\\___|_| \\_| |_|  `));
    console.log(chalk.blue(`                     TON development for professionals`));
    console.log(``);
    console.log(`Your new project is ready, available commands:`);
    console.log(``);
    console.log(chalk.greenBright(` >  `) + chalk.cyanBright(`cd ${name}`));
    console.log(` change directory to your new project`);
    console.log(``);
    console.log(chalk.greenBright(` >  `) + chalk.cyanBright(`npm run test`));
    console.log(` run the default project test suite`);
    console.log(``);
    console.log(chalk.greenBright(` >  `) + chalk.cyanBright(`npx blueprint build`));
    console.log(` choose a smart contract and build it`);
    console.log(``);
    console.log(chalk.greenBright(` >  `) + chalk.cyanBright(`npx blueprint run`));
    console.log(` choose a script and run it (eg. a deploy script)`);
    console.log(``);
    console.log(chalk.greenBright(` >  `) + chalk.cyanBright(`npx blueprint create MyNewContract`));
    console.log(` create all the necessary files for a new contract`);
    console.log(``);
    console.log(`For help and docs visit https://github.com/ton-community/blueprint`);
    console.log(``);
}

main().catch(console.error);
