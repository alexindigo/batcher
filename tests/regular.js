var numberOfTestFiles = 15;

module.exports =
{
  state:
  {
    field: 'value',
    user : 'test',
    yes  : true,
    no   : false,
    nay  : null,
    never: undefined
  },

  batch:
  [
    'echo A',

    [['echo A', 'echo B'], ['echo W', 'echo X', 'echo Y', 'echo Z']],

    [{prefixed: 'echo output'}],

    'echo xxx-${user}-zzz',

    {numTestSuites: 'ls | wc -l', options: {cwd: 'tests/'}},

    // --- sync functions

    // check state assignment
    function()
    {
      this.custom = 13;
      return 'Assigned 13 to `this.custom`';
    },

    // check return value
    {internal: function()
    {
      return this.custom * 2;
    }},

    // empty response functions ok too
    function()
    {
    },

    // --- async functions

    // check state assignment
    function(cb)
    {
      this.acustom = 42;
      cb(null, 'Assigned 42 to `this.acustom`');
    },

    // check exposed (internal) methods
    function(cb)
    {
      this.run('echo ${acustom}', function(err, data)
      {
        cb(err, data ? 'internal: ' + data : null);
      });
    },

    // empty response functions ok too
    function(cb)
    {
      cb(null);
    }
  ],

  callback: function(err, state)
  {
    if (err) throw err;

    console.log('DONE', JSON.stringify(state, null, 2)); // eslint-disable-line no-console
  },

  expected: `# Started batch process

## Initial State:

\`\`\`
{
  "field": "value",
  "nay": null,
  "no": false,
  "user": "test",
  "yes": true
}
\`\`\`

## Execution


### Executing \`\` echo A \`\`...

> Finished execution of \`\` echo A \`\`:
\`\`\`
A
\`\`\`

### Executing \`\` [echo A, echo B] \`\`...


### Executing \`\` [echo W, echo X, echo Y, echo Z] \`\`...

> Finished execution of \`\` [echo A, echo B] \`\`:
\`\`\`
A
B
\`\`\`
> Finished execution of \`\` [echo W, echo X, echo Y, echo Z] \`\`:
\`\`\`
W
X
Y
Z
\`\`\`

### Executing \`\` {"prefixed":"echo output"} \`\`...

> Finished execution of \`\` {"prefixed":"echo output"} \`\`:
\`\`\`
prefixed: output
\`\`\`

### Executing \`\` echo xxx-\${user}-zzz \`\`...

> Finished execution of \`\` echo xxx-\${user}-zzz \`\`:
\`\`\`
xxx-test-zzz
\`\`\`

### Executing \`\` ls | wc -l \`\`...

> Storing output into \`\` numTestSuites \`\`

> Finished execution of \`\` ls | wc -l \`\`:
\`\`\`
${numberOfTestFiles}
\`\`\`

### Executing \`\` function () { this.custom = 13; return 'Assigned 13 to \`this.custom\`'; } \`\`...

> Finished execution of \`\` function () { this.custom = 13; return 'Assigned 13 to \`this.custom\`'; } \`\`:
\`\`\`
Assigned 13 to \`this.custom\`
\`\`\`

### Executing \`\` function () { return this.custom * 2; } \`\`...

> Storing output into \`\` internal \`\`

> Finished execution of \`\` function () { return this.custom * 2; } \`\`:
\`\`\`
26
\`\`\`

### Executing \`\` function () { } \`\`...

> Finished execution of \`\` function () { } \`\`:
\`\`\`

\`\`\`

### Executing \`\` function (cb) { this.acustom = 42; cb(null, 'Assigned 42 to \`this.acustom\`'); } \`\`...

> Finished execution of \`\` function (cb) { this.acustom = 42; cb(null, 'Assigned 42 to \`this.acustom\`'); } \`\`:
\`\`\`
Assigned 42 to \`this.acustom\`
\`\`\`

### Executing \`\` function (cb) { this.run('echo \${acustom}', function(err, data) ... }); } \`\`...

> Finished execution of \`\` function (cb) { this.run('echo \${acustom}', function(err, data) ... }); } \`\`:
\`\`\`
internal: 42
\`\`\`

### Executing \`\` function (cb) { cb(null); } \`\`...

> Finished execution of \`\` function (cb) { cb(null); } \`\`:
\`\`\`

\`\`\`
DONE {
  "nay": null,
  "no": false,
  "yes": true,
  "user": "test",
  "field": "value",
  "options": {
    "cwd": "tests/"
  },
  "numTestSuites": "${numberOfTestFiles}",
  "custom": 13,
  "internal": 26,
  "acustom": 42
}
`};
