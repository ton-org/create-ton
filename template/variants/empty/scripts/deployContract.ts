import {toNano} from 'ton-core'
import {Contract} from '../wrappers/Contract'
import {compile, NetworkProvider} from '@ton-community/blueprint'

export async function run(provider: NetworkProvider) {
    const contract = Contract.createFromConfig({}, await compile('Contract'))

    await provider.deploy(contract, toNano('0.05'))

    const openedContract = provider.open(contract)

    // run methods on `openedContract`
}
