import { Blockchain } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { MyContract } from '../wrappers/MyContract';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('MyContract', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('MyContract');
    });

    it('should deploy', async () => {
        const blockchain = await Blockchain.create();

        const myContract = blockchain.openContract(await MyContract.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await myContract.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: myContract.address,
            deploy: true,
        });
    });
});
