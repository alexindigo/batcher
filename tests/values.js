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

  expected: `# Started batch process

## Initial State:

\`\`\`
{
  "complex": {
    "a": 1,
    "b": 2,
    "c": 3
  },
  "value": "original"
}
\`\`\`

## Execution


### Executing \`\` echo A-\${value} \`\`...

> Finished execution of \`\` echo A-\${value} \`\`:
\`\`\`
A-original
\`\`\`

### Executing \`\` ASSIGNMENT \`\`...

> Storing output into \`\` value \`\`

> Finished execution of \`\` ASSIGNMENT \`\`:
\`\`\`
42
\`\`\`

### Executing \`\` echo B-\${value} \`\`...

> Finished execution of \`\` echo B-\${value} \`\`:
\`\`\`
B-42
\`\`\`

### Executing \`\` VALUE SETTER \`\`...

> Storing output into \`\` value \`\`

> Finished execution of \`\` VALUE SETTER \`\`:
\`\`\`
new value
\`\`\`

### Executing \`\` VALUE SETTER \`\`...

> Finished execution of \`\` VALUE SETTER \`\`:
\`\`\`
goes nowhere
\`\`\`

### Executing \`\` ASSIGNMENT \`\`...

> Storing output into \`\` complex \`\`

> Finished execution of \`\` ASSIGNMENT \`\`:
\`\`\`
{"b":17,"d":"new value"}
\`\`\`

## Final State:

\`\`\`
{
  "complex": {
    "a": 1,
    "b": 17,
    "c": 3,
    "d": "new value"
  },
  "value": "new value"
}
\`\`\`
`};
