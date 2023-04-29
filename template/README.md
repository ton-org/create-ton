# {{name}}

## Project structure

-   `contracts` - contains the source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - contains the wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - contains scripts used by the project, mainly the deployment scripts.   

## How to use

### Build

`yarn blueprint build`

### Test

`yarn blueprint test`

### Deploy

`yarn blueprint run`

### Add new contract

`yarn blueprint create ContractName`

# License
MIT
