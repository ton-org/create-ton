# npm create ton

> [!CAUTION]
> Deprecated. Use [Acton](https://ton-blockchain.github.io/acton/) instead.
> 
> Pull requests are not accepted at the moment; please bring any problems or tasks to [issues](https://github.com/ton-org/create-ton/issues).

This is an entry point script for the Blueprint development tool

## Usage

```bash
npm create ton@latest
```

(or using other package managers)

If you want to input data non-interactively (for example, in scripts), do:

```bash
npm create ton@latest -- project-dir --type first-contract-type --contractName FirstContractName
```

where `first-contract-type` can currently be one of `tolk-empty`, `tolk-counter`, `func-empty` (deprecated), `func-counter` (deprecated), `tact-empty` (deprecated), `tact-counter` (deprecated)

For more details please go to https://ton-blockchain.github.io/acton/
