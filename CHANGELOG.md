# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## Added

- Contracts are built before test run

## [0.23.0] - 2025-04-24

### Changed

- Updated template dependencies

## [0.22.0] - 2025-04-09

### Added

- Added flag `--no-ci` to skip installation of dependencies, git init and creation of the first contract via Blueprint

### Changed

- Updated template dependencies

## [0.21.0] - 2025-03-02

### Changed

- Updated template dependencies

## [0.20.0] - 2025-01-17

### Changed

- Updated template dependencies
- Compiler dependencies are now explicitly installed, allowing end users to use their preferred versions of compilers

## [0.19.0] - 2024-12-18

### Changed

- Updated template dependencies

## [0.18.1] - 2024-11-03

### Fixed

- Rebuilt the package

## [0.18.0] - 2024-11-03

### Added

- Added support for Tolk, the new TON programming language

### Changed

- Updated template dependencies

## [0.17.0] - 2024-09-17

### Fixed

- Fixed creation of new projects with `npm` via `--ignore-scripts` option

### Changed

- Updated template dependencies

## [0.16.0] - 2024-09-16

### Changed

- Updated template dependencies

## [0.15.0] - 2024-07-12

### Added

- Added Bun support

### Changed

- Updated template .gitignore
- Updated template dependencies

## [0.14.0] - 2024-05-27

### Changed

- Updated template dependencies

## [0.13.0] - 2024-03-27

### Changed

- Updated template dependencies

## [0.12.0] - 2024-03-13

### Changed

- Updated template dependencies

## [0.11.1] - 2024-02-24

### Changed

- Set template's @ton/core version to `~0`
- Updated template dependencies

## [0.11.0] - 2024-01-26

### Changed

- Updated template dependencies: blueprint, sandbox, others to their latest versions

## [0.10.0] - 2023-12-01

### Changed

- Updated template dependencies: blueprint, sandbox, test-utils, ton, ton-core, ton-crypto to their latest @ton versions

## [0.9.0] - 2023-08-28

### Removed

- Removed flag `--path`

### Changed

- The project name (asked interactively or passed in CLI non-interactively) is now resolved as a path to get the full project path, and the basename (last segment) of that path is taken as the actual project name. For example, running `create-ton .` in a directory named `test-project` will create the project in that very directory (without creating any subdirectories) with the name `test-project`

## [0.8.0] - 2023-08-28

### Added

- Added flag `--path` to specify where the project should be initialized, defaults to the project name

## [0.7.0] - 2023-08-20

### Changed

- Changed template ton-core dependency to ^0.51.0, ton to ~13.6.0, which fixes dependency tree problems

## [0.6.0] - 2023-08-08

### Added

- Added flags `--contractName` and `--type` to allow fully non-interactive runs
- Added scripts `start` and `build` to the template

### Changed

- Updated blueprint to 0.12.0, test-utils to 0.3.0

### Removed

- Removed license from the template

## [0.5.0] - 2023-06-06

### Changed

- Updated template's jest config to ignore the `dist` directory
- Updated template dependencies: blueprint to 0.10.0, sandbox to 0.11.0
- Updated dependencies

## [0.4.0] - 2023-05-04

### Changed

- Updated template readme
- Updated template jest config to use TypeScript
- Updated dependencies: blueprint to 0.9.0, sandbox to 0.10.0

## [0.3.0] - 2023-04-07

### Changed

- Updated template dependencies: blueprint to 0.8.0, sandbox to 0.8.0, ton-core to 0.49.0
- Updated dependencies

### Fixed

- Fixed duplicate contract type question when using pnpm

## [0.2.0] - 2023-03-27

### Added

- Added the ability to pass project name as a command line argument

### Changed

- Dependencies of newly created projects are now installed using the package manager that is used to invoke create-ton
- Updated template dependencies' versions: blueprint to 0.6.1, sandbox to 0.7.0

## [0.1.0] - 2023-03-21

### Added

- Added support for [TACT](https://github.com/tact-lang/tact), including TACT smart contract templates
- Added `.prettierignore` to template to ignore generated TACT files

### Changed

- Updated template dependencies, including blueprint to 0.6.0, sandbox to 0.6.1, test-utils to 0.2.0
- Edited template's `README.md`
- Changed template's `.gitignore` to contain a newline at the end
- Updated dependencies

### Removed

- Removed dubious `LICENSE` file from template

## [0.0.11] - 2023-03-02

### Changed

- Updated template dependencies' versions: blueprint to 0.4.1, sandbox to 0.5.1, ton to 13.4.1, ton-core to 0.48.0

## [0.0.10] - 2023-02-27

### Added

- Added a check for exceptions for git repository initialization

### Changed

- Bumped sandbox version to 0.5.0
- Bumped blueprint version to 0.3.0
- Bumped ton-core version to 0.47.1

## [0.0.9] - 2023-02-09

### Added

- Added a hint to indicate that contract names must be PascalCase, and a restriction that contract names must start with a capital letter

### Fixed

- Added back stdlib.fc to the template so that newly created projects can be built, tested and deployed immediately

### Changed

- Made some minor changes to the CLI instructions after creating a new project
- Bumped sandbox version to 0.4.0
- Bumped blueprint version to 0.2.0

## [0.0.8] - 2023-02-05

### Changed

- Bumped sandbox version to 0.3.0

## [0.0.7] - 2023-02-03

### Added

- CLI now asks for contract name to be created first

### Changed

- Contract template files are no longer stored in this package, templates from [blueprint](https://github.com/ton-community/blueprint) are now used instead
