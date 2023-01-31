import {toNano} from 'ton-core'
import {MyContract} from '../wrappers/MyContract'
import {compile, NetworkProvider} from '@ton-community/blueprint'

export async function run(provider: NetworkProvider) {
    const myContract = MyContract.createFromConfig({}, await compile('MyContract'))

    await provider.deploy(myContract, toNano('0.05'))

    const openedContract = provider.open(myContract)

    // run methods on `openedContract`
}
