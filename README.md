# broccoli-typescript-compiler

[![Build Status](https://travis-ci.org/tildeio/broccoli-typescript-compiler.svg?branch=master)](https://travis-ci.org/tildeio/broccoli-typescript-compiler)
[![Build status](https://ci.appveyor.com/api/projects/status/xg70wjppvd3l7e50?svg=true)](https://ci.appveyor.com/project/embercli/broccoli-typescript-compiler)

A [Broccoli](https://github.com/broccolijs/broccoli) plugin which
compiles [TypeScript](http://www.typescriptlang.org) files.

## How to install?

```sh
$ npm install broccoli-typescript-compiler --save-dev
```

## How to use?

```js
var typescript = require("broccoli-typescript-compiler").default;
var cjsTree = typescript(inputTree, {
  tsconfig: {
    compilerOptions: {
      module: "commonjs",
      target: "es5",
      moduleResolution: "node",
      newLine: "LF",
      rootDir: "src",
      outDir: "dist",
      sourceMap: true,
      declaration: true,
    },
    files: ["src/index.ts", "src/tests/**"],
  },
  throwOnError: false,
  annotation: "compile program",
});
```

### Config Options:

`tsconfig:`

- default (when ommited): will find the nearest `tsconfig` relative to where the BroccoliTypeScriptCompiler is invoked.
- as string: a absolute path to a config tsconfig file
- as config object: See: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

`annotation:`

An optional string, which when provide should be a descriptive annotation. Useful for debugging, to tell multiple instances of the same plugin apart.

`throwOnError`

An optional boolean, defaulting to `false`. If set to `true`, will cause the build to break on errors.

*note: if `process.env.NODE_ENV === 'production'` is true, `throwOnError` will default to `true`.*

### Ways to use:

## via the broccoli plugin subclass

This outputs only the emitted files from the compiled program.

```js
const { TypescriptCompiler } = require("broccoli-typescript-compiler");
let compiled = new TypescriptCompiler(input, options);
```

## via function

This outputs only the emitted files from the compiled program.

```js
const { default: typescript } = require("broccoli-typescript-compiler");

let compiled = typescript(src, options);
```

## filter function (passthrough non .ts files)

This selects only ts files from the input to compile and merges emitted files with the non ts files in the input.

```js
const { filterTypescript } = require("broccoli-typescript-compiler");
let output = filterTypescript(input, options);
```

## Development

### How to upgrade `typescript`

1. Update `typescript` in `package.json`
2. Run `yarn run generate-tsconfig-interface`
3. Update `vendor/typescript`. `cd vendor/typescript && git fetch --tags && git checkout v[new-version-of-typescript]`
4. Commit all of the above changes
5. Run `yarn test`. There may be some changes needed to the tests to accomidate changes in TypeScript.