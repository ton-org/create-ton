import {Blockchain} from '@ton-community/sandbox'
import {Cell, toNano} from 'ton-core'
import {Contract} from '../wrappers/Contract'
import '@ton-community/test-utils'
import {compile} from '@ton-community/blueprint'

describe('Contract', () => {
    let code: Cell

    beforeAll(async () => {
        code = await compile('Contract')
    })

    it('should deploy', async () => {
        const blockchain = await Blockchain.create()

        const contract = blockchain.openContract(await Contract.createFromConfig({}, code))

        const deployer = await blockchain.treasury('deployer')

        const deployResult = await contract.sendDeploy(deployer.getSender(), toNano('0.05'))

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: contract.address,
            deploy: true,
        })
    })
})
