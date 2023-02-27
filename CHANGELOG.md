# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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