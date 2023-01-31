import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type MyContractConfig = {};

export function myContractConfigToCell(config: MyContractConfig): Cell {
    return beginCell().endCell();
}

export class MyContract implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new MyContract(address);
    }

    static createFromConfig(config: MyContractConfig, code: Cell, workchain = 0) {
        const data = myContractConfigToCell(config);
        const init = { code, data };
        return new MyContract(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATLY,
            body: beginCell().endCell(),
        });
    }
}
