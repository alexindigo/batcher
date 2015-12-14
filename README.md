# Batcher
Batch processor of shell commands and javascript functions over shared state object. Async, sequential, parallel.

[![Build Status](https://img.shields.io/travis/alexindigo/batcher/master.svg?style=flat-square)](https://travis-ci.org/alexindigo/batcher)
[![Coverage Status](https://img.shields.io/coveralls/alexindigo/batcher/master.svg?style=flat-square)](https://coveralls.io/github/alexindigo/batcher?branch=master)

*Notice of change of ownership: Starting version 1.0.0 this package has changed it's owner and goals. Old version (0.0.2) is still available on npm via `npm install batcher@0.0.2`. Thank you.*

## Why

Some tasks better implemented using shell commands, some tasks require nodejs power, this module allows to bring them together in a simple, yet powerful "batch" script and combine via shared state object.

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
npm install batcher --save
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

``````markdown
# Started batch process

## Initial State:

```
{
  "word": "ABC"
}
```

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
``````

For more examples check out [`example.js`](example.js).

## License

[MIT](LICENSE)
