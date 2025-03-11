#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import { execSync, ExecSyncOptionsWithBufferEncoding } from 'child_process';
import inquirer from 'inquirer';
import arg from 'arg';
import chalk from 'chalk';

const FILES_WITH_NAME_TEMPLATE = ['package.json', 'README.md'];
const NAME_TEMPLATE = '{{name}}';

const VARIANT_CHOICES = [
    {
        name: 'An empty contract (FunC)',
        value: 'func-empty',
    },
    {
        name: 'An empty contract (Tolk)',
        value: 'tolk-empty',
    },
    {
        name: 'An empty contract (TACT)',
        value: 'tact-empty',
    },
    {
        name: 'A simple counter contract (FunC)',
        value: 'func-counter',
    },
    {
        name: 'A simple counter contract (Tolk)',
        value: 'tolk-counter',
    },
    {
        name: 'A simple counter contract (TACT)',
        value: 'tact-counter',
    },
];

async function main() {
    console.log();

    const localArgs = arg({
        '--type': String, // one of the VARIANT_CHOICES
        '--contractName': String, // PascalCase name for the contract
        '--no-ci': Boolean, // whether to skip installation of dependendencies, git init
                            // and creation of the first contract via Blueprint
     });

    const desiredProjectName: string =
        localArgs._[0] ||
        (
            await inquirer.prompt({
                name: 'name',
                message: 'Project name',
            })
        ).name.trim();

    const projectPath = path.resolve(desiredProjectName);

    const name = path.basename(projectPath);

    if (name.length === 0) throw new Error('Cannot initialize a project with an empty name');

    const noCi = localArgs['--no-ci'] ?? false;

    const contractName: string =
        (noCi ? 'NonExistent' : localArgs['--contractName']) ||
        (
            await inquirer.prompt({
                name: 'contractName',
                message: 'First created contract name (PascalCase)',
            })
        ).contractName.trim();

    if (!noCi) {
        if (contractName.length === 0) throw new Error(`Cannot create a contract with an empty name`);

        if (contractName.toLowerCase() === 'contract' || !/^[A-Z][a-zA-Z0-9]*$/.test(contractName))
            throw new Error(`Cannot create a contract with the name '${contractName}'`);
    }

    const argsVariant =
        VARIANT_CHOICES.map(e => e.value).indexOf(localArgs['--type'] || '') !== -1
            ? localArgs['--type']
            : undefined;

    const variant: string =
        (noCi ? 'none' : argsVariant) ||
        (
            await inquirer.prompt([
                {
                    name: 'variant',
                    message: 'Choose the project template',
                    type: 'list',
                    choices: VARIANT_CHOICES,
                },
            ])
        ).variant;

    await fs.mkdir(projectPath, {
        recursive: true,
    });

    const steps = noCi ? 2 : 3;

    console.log(`\n[1/${steps}] Copying files...`);

    const basePath = path.join(__dirname, 'template');
    for (const file of await fs.readdir(basePath)) {
        if (FILES_WITH_NAME_TEMPLATE.includes(file)) continue;
        await fs.copy(path.join(basePath, file), path.join(projectPath, file));
    }

    await fs.writeFile(
        path.join(projectPath, '.gitignore'),
        `node_modules
temp
build
dist
.DS_Store

# VS Code
.vscode/*
.history/
*.vsix

# IDEA files
.idea

# VIM
Session.vim
.vim/

# Other private editor folders
.nvim/
.emacs/
.helix/
`
    );

    for (const file of FILES_WITH_NAME_TEMPLATE) {
        await fs.writeFile(
            path.join(projectPath, file),
            (await fs.readFile(path.join(basePath, file))).toString().replace(NAME_TEMPLATE, name)
        );
    }

    if (noCi) {
        console.log(`[2/${steps}] Skipping dependencies, git init and contract creation...\n`);
        printResultingUsageDetails(desiredProjectName, noCi);
        return;
    } else {
        console.log(`[2/${steps}] Installing dependencies...\n`);
    }

    const execOpts: ExecSyncOptionsWithBufferEncoding = {
        stdio: 'inherit',
        cwd: projectPath,
    };

    const pkgManager = (process.env.npm_config_user_agent ?? 'npm/').split(' ')[0].split('/')[0];

    switch (pkgManager) {
        case 'yarn':
            execSync('yarn', execOpts);
            break;
        case 'pnpm':
            execSync('pnpm install', execOpts);
            break;
        case 'bun':
            execSync('bun install', execOpts);
            break;
        default:
            execSync('npm install --ignore-scripts', execOpts);
            break;
    }

    console.log(`\n[3/${steps}] Creating your first contract...`);

    let execCommand = 'npm exec';
    switch (pkgManager) {
        case 'yarn':
            execCommand = 'yarn run';
            break;
        case 'pnpm':
            execCommand = 'pnpm exec';
            break;
        case 'bun':
            execCommand = 'bun x';
            break;
    }
    execSync(
        `${execCommand} blueprint${pkgManager !== 'npm' ? '' : ' --'} create ${contractName} --type ${variant}`,
        execOpts
    );

    try {
        execSync('git init', execOpts);
    } catch (e) {
        console.error('Failed to initialize git repository:', (e as any).toString());
    }

    printResultingUsageDetails(desiredProjectName, noCi);
}

function printResultingUsageDetails(desiredProjectName: string, noCi: boolean) {
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
    if (noCi) {
        console.log(`Your new project is almost ready!`);
        console.log(`Install dependencies before running available commands:`);
    } else {
        console.log(`Your new project is ready, available commands:`);
    }
    console.log(``);
    console.log(chalk.greenBright(` >  `) + chalk.cyanBright(`cd ${desiredProjectName}`));
    console.log(` change directory to your new project`);
    console.log(``);
    console.log(chalk.greenBright(` >  `) + chalk.cyanBright(`npx blueprint build`));
    console.log(` choose a smart contract and build it`);
    console.log(``);
    console.log(chalk.greenBright(` >  `) + chalk.cyanBright(`npx blueprint test`));
    console.log(` run the default project test suite`);
    console.log(``);
    console.log(chalk.greenBright(` >  `) + chalk.cyanBright(`npx blueprint run`));
    console.log(` choose a script and run it (e.g., a deploy script)`);
    console.log(``);
    console.log(chalk.greenBright(` >  `) + chalk.cyanBright(`npx blueprint create AnotherContract`));
    console.log(` create a new contract and all related necessary files`);
    console.log(``);
    console.log(`For help and docs visit https://github.com/ton-community/blueprint`);
    console.log(``);
}

main().catch(console.error);
