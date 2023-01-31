import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from "ton-core";

export type ContractConfig = {

}

export function contractConfigToCell(config: ContractConfig): Cell {
    return beginCell()
        .endCell()
}

export class Contract implements Contract {
    constructor(
        readonly address: Address,
        readonly init?: { code: Cell, data: Cell },
    ) {}

    static createFromAddress(address: Address) {
        return new Contract(address)
    }

    static createFromConfig(config: ContractConfig, code: Cell, workchain = 0) {
        const data = contractConfigToCell(config)
        const init = { code, data }
        return new Contract(contractAddress(workchain, init), init)
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATLY,
            body: beginCell()
                .endCell(),
        })
    }
}