#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import { execSync, ExecSyncOptionsWithBufferEncoding } from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';

const PACKAGE_JSON = 'package.json';

async function main() {
    const name: string = (
        await inquirer.prompt({
            name: 'name',
            message: 'Project name',
        })
    ).name.trim();

    if (name.length === 0) throw new Error('Cannot initialize a project with an empty name');

    const contractName: string = (
        await inquirer.prompt({
            name: 'contractName',
            message: 'First created contract name',
        })
    ).contractName.trim();

    if (contractName.length === 0) throw new Error(`Cannot create a contract with an empty name`);

    if (contractName.toLowerCase() === 'contract' || !/^[a-zA-Z0-9]+$/.test(contractName))
        throw new Error(`Cannot create a contract with the name '${contractName}'`);

    const { variant }: { variant: string } = await inquirer.prompt([
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

    await fs.mkdir(name);

    const steps = 3;

    console.log(`\n[1/${steps}] Copying files...`);

    const basePath = path.join(__dirname, 'template');
    for (const file of await fs.readdir(basePath)) {
        if (file === PACKAGE_JSON) continue;
        await fs.copy(path.join(basePath, file), path.join(name, file));
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

    console.log(`[2/${steps}] Installing dependencies...\n`);

    const execOpts: ExecSyncOptionsWithBufferEncoding = {
        stdio: 'inherit',
        cwd: name,
    };

    execSync('npm i', execOpts);

    console.log(`\n[3/${steps}] Creating your first contract...`);

    execSync(`npx blueprint create ${contractName} --type ${variant}`, execOpts);

    execSync('git init', execOpts);

    console.log(`Success!`);
    console.log(
        chalk.blueBright(`
     ____  _    _   _ _____ ____  ____  ___ _   _ _____ 
    | __ )| |  | | | | ____|  _ \\|  _ \\|_ _| \\ | |_   _|
    |  _ \\| |  | | | |  _| | |_) | |_) || ||  \\| | | |  
    | |_) | |__| |_| | |___|  __/|  _ < | || |\\  | | |  
    |____/|_____\\___/|_____|_|   |_| \\_\\___|_| \\_| |_|  `)
    );
    console.log(chalk.blue(`                     TON development for professionals`));
    console.log(``);
    console.log(`Your new project is ready, available commands:`);
    console.log(``);
    console.log(chalk.greenBright(` >  `) + chalk.cyanBright(`cd ${name}`));
    console.log(chalk.greenBright(` >  `) + chalk.cyanBright(`npm install`));    
    console.log(` change directory to your new project and install it`);
    console.log(``);
    console.log(chalk.greenBright(` >  `) + chalk.cyanBright(`npx blueprint build`));
    console.log(` choose a smart contract and build it`);
    console.log(``);
    console.log(chalk.greenBright(` >  `) + chalk.cyanBright(`npm run test`));
    console.log(` run the default project test suite`);
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
