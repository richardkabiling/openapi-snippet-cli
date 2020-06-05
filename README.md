openapi-snippet-cli
===================

Adds openapi snippets using `openapi-snippet` module in redoc style (x-codeSamples). This is a CLI wrapper on [openapi-snippet](https://github.com/ErikWittern/openapi-snippet)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/openapi-snippet-cli.svg)](https://npmjs.org/package/openapi-snippet-cli)
[![Downloads/week](https://img.shields.io/npm/dw/openapi-snippet-cli.svg)](https://npmjs.org/package/openapi-snippet-cli)
[![License](https://img.shields.io/npm/l/openapi-snippet-cli.svg)](https://github.com/richardkabiling/openapi-snippet-cli/blob/master/package.json)

* [Getting Started](#getting-started)
* [Usage](#usage)
* [Arguments](#arguments)
* [Options](#options)

# Getting Started
To install:

```sh-session
$ npm install -g openapi-snippet-cli
```

# Usage
## Adding Snippets to a Schema
```sh-session
$ openapi-snippet schema.yaml -o dist/schema.yaml
```

The example above should add snippets to `schema.yaml` and output the modified schema to a new file `dist/schema.yaml`.

## Outputting JSON
```sh-session
$ openapi-snippet schema.yaml -e json -o dist/schema.json
```

## Choosing Targets
```sh-session
$ openapi-snippet schema.yaml -t java -t c -o dist/schema.json
```

The example above should add snippets for `java` and `c` using their default frameworks

```sh-session
$ openapi-snippet schema.yaml -t java_okhttp -o dist/schema.json
```

This should add snippets for 'java` using OkHttp.

# Arguments
```
USAGE
  $ openapi-snippet [FILE]

ARGUMENTS
  FILE  input openapi document. It will attempt to resolve references (including both internal adn external ones)
```

# Options

```
OPTIONS
  -e, --ext=yaml|json    [default: yaml] output format
  -h, --help             show CLI help
  -o, --output=output    [default: output.yaml] output file name

  -t, --targets=targets  target snippet languages + frameworks. Can be provided multiple times. If inputting language only, defaults to one of the frameworks. Supports
                         languages supported in https://github.com/ErikWittern/openapi-snippet. Defaults to adding snippets for ALL supported languages.

  -v, --version          show CLI version
```
