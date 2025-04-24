import { buildAll } from '@ton/blueprint';

export default async function () {
    console.log('\n\nBuild all contracts...\n\n');
    await buildAll();
}
