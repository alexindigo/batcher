# batcher [![NPM Module](https://img.shields.io/npm/v/batcher.svg?style=flat)](https://www.npmjs.com/package/batcher)

Batch processor of shell commands and javascript functions over shared state object. Async, sequential, parallel.

[![Linux Build](https://img.shields.io/travis/alexindigo/batcher/master.svg?label=linux:0.12-6.x&style=flat)](https://travis-ci.org/alexindigo/batcher)
[![Windows Build](https://img.shields.io/appveyor/ci/alexindigo/batcher/master.svg?label=windows:0.12-6.x&style=flat)](https://ci.appveyor.com/project/alexindigo/batcher)

[![Coverage Status](https://img.shields.io/coveralls/alexindigo/batcher/master.svg?style=flat-square)](https://coveralls.io/github/alexindigo/batcher?branch=master)
[![Dependency Status](https://img.shields.io/david/alexindigo/batcher/master.svg?style=flat)](https://david-dm.org/alexindigo/batcher)
[![bitHound Overall Score](https://www.bithound.io/github/alexindigo/batcher/badges/score.svg)](https://www.bithound.io/github/alexindigo/batcher)

*Notice of change of ownership: Starting version 1.0.0 this package has changed it's owner and goals. Old version (0.0.2) is still available on npm via `npm install batcher@0.0.2`. Thank you.*

## Why

Some tasks (e.g. deploy scripts) better implemented using shell commands, some tasks require nodejs power, this module allows to bring them together in a simple, yet powerful "batch" script and combine via shared state object.

## Features

- Executes provided shell commands asynchronously and sequentially.
- Shares state object among all specified tasks.
- Allows to update state with output from shell commands.
- Allows for parallel execution of the commands.
- Accepts custom (*sync and async*) functions as tasks.
- Provides markdown-compatible default reporter.
- Natively supports custom reporters.

## Install

```
npm install --save batcher
```

## Examples

Following setup:

```javascript
var batcher = require('batcher');

batcher({
  word: 'ABC'
},
[
  // simple shell command
  'echo A',

  // using state variable
  'echo word is ${word}',

  // updating state
  {twoWords: 'echo ${word} + ${word}'},

  // reusing updated state
  'echo two words are ${twoWords}',

  // parallel execution
  ['echo Marco', 'echo Polo'],

  // custom sync function as a task
  function()
  {
    return this.twoWords.substr(0, 5);
  },

  // custom async function as a task
  function(cb)
  {
    cb(null, this.twoWords.substr(0, 8));
  }
]);
```

Outputs (*with default reporter*):

    # Started batch process

    ## Initial State:

    ```
    {
      "word": "ABC"
    }
    ```

    ## Execution


    ### Executing ` echo A `...

    > Finished execution of ` echo A `:
    ```
    A
    ```

    ### Executing ` echo word is ${word} `...

    > Finished execution of ` echo word is ${word} `:
    ```
    word is ABC
    ```

    ### Executing ` echo ${word} + ${word} `...

    > Storing output into ` twoWords `

    > Finished execution of ` echo ${word} + ${word} `:
    ```
    ABC + ABC
    ```

    ### Executing ` echo two words are ${twoWords} `...

    > Finished execution of ` echo two words are ${twoWords} `:
    ```
    two words are ABC + ABC
    ```

    ### Executing ` echo Marco `...


    ### Executing ` echo Polo `...

    > Finished execution of ` echo Polo `:
    ```
    Polo
    ```
    > Finished execution of ` echo Marco `:
    ```
    Marco
    ```

    ### Executing ` CUSTOM SYNC FUNCTION `...

    > Finished execution of ` CUSTOM SYNC FUNCTION `:
    ```
    ABC +
    ```

    ### Executing ` CUSTOM ASYNC FUNCTION `...

    > Finished execution of ` CUSTOM ASYNC FUNCTION `:
    ```
    ABC + AB
    ```

    ## Final State:

    ```
    {
      "word": "ABC",
      "twoWords": "ABC + ABC"
    }
    ```

For more examples check out [`example.js`](example.js) and [`example.md`](example.md) for default output.

## License

Batcher is released under the [MIT](LICENSE) license.
