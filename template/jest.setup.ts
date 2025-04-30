import { buildAllTact } from '@ton/blueprint';

export default async function () {
    console.log('\n\nBuilding tact contracts...\n\n');
    await buildAllTact();
}
