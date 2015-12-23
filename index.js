'use strict';

var ts         = require('typescript');
var Filter     = require('broccoli-persistent-filter');
var stringify  = require('json-stable-stringify');
var crypto     = require('crypto');

var loadTSConfig = require('./lib/load-ts-config');

module.exports = TypeScript;
function TypeScript(inputTree, _options) {
  var options = _options || {};

  if (!(this instanceof TypeScript)) {
    return new TypeScript(inputTree, options);
  }

  Filter.call(this, inputTree, {
    persist: true,
    extensions: ['ts','d.ts'],
    targetExtension: 'js',
    name: 'broccoli-typescript-compiler',
    annotation: options.annotation
  });

  var tsConfig = options.tsconfig;
  if (tsConfig) {
    this.options = loadTSConfig(tsConfig);
  } else {
    throw new TypeError('TypeScriptCompiler missing tsconfig: "path/to/tsconfig.json"');
  }
}

TypeScript.prototype = Object.create(Filter.prototype);
TypeScript.prototype.constructor = TypeScript;

TypeScript.prototype.baseDir = function() {
  return __dirname;
};

/*
 * @private
 *
 * @method optionsString
 * @returns a stringifeid version of the input options
 */
TypeScript.prototype.optionsHash  = function() {
  if (!this._optionsHash) {
    this._optionsHash = crypto.createHash('md5').update(stringify(this.options), 'utf8').digest('hex');
  }
  return this._optionsHash;
};

TypeScript.prototype.cacheKeyProcessString = function(string, relativePath) {
  return this.optionsHash() + Filter.prototype.cacheKeyProcessString.call(this, string, relativePath);
};

TypeScript.prototype.processString = function (string, relativePath) {
  return ts.transpileModule(string, {compilerOptions: this.options, fileName: relativePath}).outputText;
};
