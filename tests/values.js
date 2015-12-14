var batcher = require('../');

module.exports =
{
  state:
  {
    value: 'original',
    complex: {a: 1, b: 2, c: 3}
  },

  batch:
  [
    'echo A-${value}',

    {value: 42},

    'echo B-${value}',

    {value: batcher.value('new value')},

    // this gets executed in vain
    batcher.value('goes nowhere'),

    // object assignment
    {complex: {b: 17, d: 'new value'}}
  ],

  expected: '# Started batch process\n\
\n\
## Initial State:\n\
\n\
```\n\
{\n\
  "complex": {\n\
    "a": 1,\n\
    "b": 2,\n\
    "c": 3\n\
  },\n\
  "value": "original"\n\
}\n\
```\n\
\n\
## Execution\n\
\n\
\n\
### Executing ` echo A-${value} `...\n\
\n\
> Finished execution of ` echo A-${value} `:\n\
```\n\
A-original\n\
```\n\
\n\
### Executing ` ASSIGNMENT `...\n\
\n\
> Storing output into ` value `\n\
\n\
> Finished execution of ` ASSIGNMENT `:\n\
```\n\
42\n\
```\n\
\n\
### Executing ` echo B-${value} `...\n\
\n\
> Finished execution of ` echo B-${value} `:\n\
```\n\
B-42\n\
```\n\
\n\
### Executing ` VALUE SETTER `...\n\
\n\
> Storing output into ` value `\n\
\n\
> Finished execution of ` VALUE SETTER `:\n\
```\n\
new value\n\
```\n\
\n\
### Executing ` VALUE SETTER `...\n\
\n\
> Finished execution of ` VALUE SETTER `:\n\
```\n\
goes nowhere\n\
```\n\
\n\
### Executing ` ASSIGNMENT `...\n\
\n\
> Storing output into ` complex `\n\
\n\
> Finished execution of ` ASSIGNMENT `:\n\
```\n\
{"b":17,"d":"new value"}\n\
```\n\
\n\
## Final State:\n\
\n\
```\n\
{\n\
  "complex": {\n\
    "a": 1,\n\
    "b": 17,\n\
    "c": 3,\n\
    "d": "new value"\n\
  },\n\
  "value": "new value"\n\
}\n\
```\n\
'
};
