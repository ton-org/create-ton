# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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