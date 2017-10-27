var batcher = require('../');

module.exports =
{
  state:
  {
    'pre-hook': 'echo This is prehook command',

    'hook': 'echo SUCCESS',

    'letters': ['abc', 'xyz'],

    'combos': {name: ['alice', 'bob'], secret: ['abc', 'xyz'], known: false}
  },

  batch:
  [
    batcher.command('pre-hook'),

    {result: batcher.command('hook')},

    'echo expecting ${result}',

    batcher.forEach({cdn: ['image1', 'image2']}).command('echo pretend scp to ${cdn}'),

    batcher.forEach([{cdn: 'here'}, {cdn: 'there'}]).command('echo pretend scp to ${cdn}'),

    batcher.forEach('letters').command('echo ${letters}'),

    batcher.command(['echo ${letters}', 'echo ${result}']),

    batcher.forEach('combos').command('echo ${name} has ${secret} ${known}')
  ],

  expected: `# Started batch process

## Initial State:

\`\`\`
{
  "combos": {
    "known": false,
    "name": [
      "alice",
      "bob"
    ],
    "secret": [
      "abc",
      "xyz"
    ]
  },
  "hook": "echo SUCCESS",
  "letters": [
    "abc",
    "xyz"
  ],
  "pre-hook": "echo This is prehook command"
}
\`\`\`

## Execution


### Executing \`\` echo This is prehook command \`\`...

> Finished execution of \`\` echo This is prehook command \`\`:
\`\`\`
This is prehook command
\`\`\`

### Executing \`\` echo SUCCESS \`\`...

> Storing output into \`\` result \`\`

> Finished execution of \`\` echo SUCCESS \`\`:
\`\`\`
SUCCESS
\`\`\`

### Executing \`\` echo expecting \${result} \`\`...

> Finished execution of \`\` echo expecting \${result} \`\`:
\`\`\`
expecting SUCCESS
\`\`\`

### Executing \`\` echo pretend scp to \${cdn} \`\`...

> Finished execution of \`\` echo pretend scp to \${cdn} \`\`:
\`\`\`
pretend scp to image1
pretend scp to image2
\`\`\`

### Executing \`\` echo pretend scp to \${cdn} \`\`...

> Finished execution of \`\` echo pretend scp to \${cdn} \`\`:
\`\`\`
pretend scp to here
pretend scp to there
\`\`\`

### Executing \`\` echo \${letters} \`\`...

> Finished execution of \`\` echo \${letters} \`\`:
\`\`\`
abc
xyz
\`\`\`

### Executing \`\` [echo \${letters}, echo \${result}] \`\`...

> Finished execution of \`\` [echo \${letters}, echo \${result}] \`\`:
\`\`\`
abc,xyz
SUCCESS
\`\`\`

### Executing \`\` echo \${name} has \${secret} \${known} \`\`...

> Finished execution of \`\` echo \${name} has \${secret} \${known} \`\`:
\`\`\`
alice has abc
bob has abc
alice has xyz
bob has xyz
\`\`\`

## Final State:

\`\`\`
{
  "combos": {
    "known": false,
    "name": [
      "alice",
      "bob"
    ],
    "secret": [
      "abc",
      "xyz"
    ]
  },
  "hook": "echo SUCCESS",
  "letters": [
    "abc",
    "xyz"
  ],
  "pre-hook": "echo This is prehook command",
  "result": "SUCCESS"
}
\`\`\`
`};
