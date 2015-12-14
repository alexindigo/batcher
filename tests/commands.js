var batcher = require('../');

module.exports =
{
  state:
  {
    'pre-hook': 'echo "This is prehook command"',

    'hook': 'echo "SUCCESS"',

    'letters': ['abc', 'xyz'],

    'combos': {name: ['alice', 'bob'], secret: ['abc', 'xyz'], known: false}
  },

  batch:
  [
    batcher.command('pre-hook'),

    {result: batcher.command('hook') },

    'echo expecting ${result}',

    batcher.forEach({cdn: ['image1', 'image2']}).command('echo "pretend scp to ${cdn}"'),

    batcher.forEach([{cdn: 'here'}, {cdn: 'there'}]).command('echo "pretend scp to ${cdn}"'),

    batcher.forEach('letters').command('echo ${letters}'),

    batcher.command(['echo ${letters}', 'echo ${result}']),

    batcher.forEach('combos').command('echo ${name} has ${known} ${secret}')
  ],

  expected: '# Started batch process\n\
\n\
## Initial State:\n\
\n\
```\n\
{\n\
  "combos": {\n\
    "name": [\n\
      "alice",\n\
      "bob"\n\
    ],\n\
    "secret": [\n\
      "abc",\n\
      "xyz"\n\
    ],\n\
    "known": false\n\
  },\n\
  "letters": [\n\
    "abc",\n\
    "xyz"\n\
  ],\n\
  "hook": "echo \\"SUCCESS\\"",\n\
  "pre-hook": "echo \\"This is prehook command\\""\n\
}\n\
```\n\
\n\
## Execution\n\
\n\
\n\
### Executing ` echo "This is prehook command" `...\n\
\n\
> Finished execution of ` echo "This is prehook command" `:\n\
```\n\
This is prehook command\n\
```\n\
\n\
### Executing ` echo "SUCCESS" `...\n\
\n\
> Storing output into ` result `\n\
\n\
> Finished execution of ` echo "SUCCESS" `:\n\
```\n\
SUCCESS\n\
```\n\
\n\
### Executing ` echo expecting ${result} `...\n\
\n\
> Finished execution of ` echo expecting ${result} `:\n\
```\n\
expecting SUCCESS\n\
```\n\
\n\
### Executing ` echo "pretend scp to ${cdn}" `...\n\
\n\
> Finished execution of ` echo "pretend scp to ${cdn}" `:\n\
```\n\
pretend scp to image1\n\
pretend scp to image2\n\
```\n\
\n\
### Executing ` echo "pretend scp to ${cdn}" `...\n\
\n\
> Finished execution of ` echo "pretend scp to ${cdn}" `:\n\
```\n\
pretend scp to here\n\
pretend scp to there\n\
```\n\
\n\
### Executing ` echo ${letters} `...\n\
\n\
> Finished execution of ` echo ${letters} `:\n\
```\n\
abc\n\
xyz\n\
```\n\
\n\
### Executing ` [echo ${letters}, echo ${result}] `...\n\
\n\
> Finished execution of ` [echo ${letters}, echo ${result}] `:\n\
```\n\
abc,xyz\n\
SUCCESS\n\
```\n\
\n\
### Executing ` echo ${name} has ${known} ${secret} `...\n\
\n\
> Finished execution of ` echo ${name} has ${known} ${secret} `:\n\
```\n\
alice has abc\n\
alice has xyz\n\
bob has abc\n\
bob has xyz\n\
```\n\
\n\
## Final State:\n\
\n\
```\n\
{\n\
  "combos": {\n\
    "name": [\n\
      "alice",\n\
      "bob"\n\
    ],\n\
    "secret": [\n\
      "abc",\n\
      "xyz"\n\
    ],\n\
    "known": false\n\
  },\n\
  "letters": [\n\
    "abc",\n\
    "xyz"\n\
  ],\n\
  "hook": "echo \\"SUCCESS\\"",\n\
  "pre-hook": "echo \\"This is prehook command\\"",\n\
  "result": "SUCCESS"\n\
}\n\
```\n\
'
};
