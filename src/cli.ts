#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import readline from "readline";

const PACKAGE_JSON = 'package.json'

function question(q: string): Promise<string> {
    const iface = readline.createInterface(process.stdin, process.stdout)

    return new Promise((resolve) => {
        iface.question(q, (ans) => {
            iface.close()
            resolve(ans)
        })
    })
}

async function main() {
    const defaultName = path.basename(process.cwd())

    let name = (await question(`Project name? (${defaultName}) `)).trim()
    if (name.length === 0) name = defaultName

    const basePath = path.join(__dirname, 'template')
    for (const file of await fs.readdir(basePath)) {
        if (file === PACKAGE_JSON) continue
        await fs.copy(path.join(basePath, file), file)
    }

    await fs.writeFile(PACKAGE_JSON, (await fs.readFile(path.join(basePath, PACKAGE_JSON))).toString().replace('{{name}}', name))

    execSync('npm i', {
        stdio: 'inherit',
    })
}

main().catch(console.error)