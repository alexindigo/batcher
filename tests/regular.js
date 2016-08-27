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

  expected: '# Started batch process\n\
\n\
## Initial State:\n\
\n\
```\n\
{\n\
  "field": "value",\n\
  "nay": null,\n\
  "no": false,\n\
  "user": "test",\n\
  "yes": true\n\
}\n\
```\n\
\n\
## Execution\n\
\n\
\n\
### Executing ` echo A `...\n\
\n\
> Finished execution of ` echo A `:\n\
```\n\
A\n\
```\n\
\n\
### Executing ` [echo A, echo B] `...\n\
\n\
\n\
### Executing ` [echo W, echo X, echo Y, echo Z] `...\n\
\n\
> Finished execution of ` [echo A, echo B] `:\n\
```\n\
A\n\
B\n\
```\n\
> Finished execution of ` [echo W, echo X, echo Y, echo Z] `:\n\
```\n\
W\n\
X\n\
Y\n\
Z\n\
```\n\
\n\
### Executing ` {"prefixed":"echo output"} `...\n\
\n\
> Finished execution of ` {"prefixed":"echo output"} `:\n\
```\n\
prefixed: output\n\
```\n\
\n\
### Executing ` echo xxx-${user}-zzz `...\n\
\n\
> Finished execution of ` echo xxx-${user}-zzz `:\n\
```\n\
xxx-test-zzz\n\
```\n\
\n\
### Executing ` ls | wc -l `...\n\
\n\
> Storing output into ` numTestSuites `\n\
\n\
> Finished execution of ` ls | wc -l `:\n\
```\n\
' + numberOfTestFiles + '\n\
```\n\
\n\
### Executing ` CUSTOM SYNC FUNCTION `...\n\
\n\
> Finished execution of ` CUSTOM SYNC FUNCTION `:\n\
```\n\
Assigned 13 to `this.custom`\n\
```\n\
\n\
### Executing ` CUSTOM SYNC FUNCTION `...\n\
\n\
> Storing output into ` internal `\n\
\n\
> Finished execution of ` CUSTOM SYNC FUNCTION `:\n\
```\n\
26\n\
```\n\
\n\
### Executing ` CUSTOM SYNC FUNCTION `...\n\
\n\
> Finished execution of ` CUSTOM SYNC FUNCTION `:\n\
```\n\
\n\
```\n\
\n\
### Executing ` CUSTOM ASYNC FUNCTION `...\n\
\n\
> Finished execution of ` CUSTOM ASYNC FUNCTION `:\n\
```\n\
Assigned 42 to `this.acustom`\n\
```\n\
\n\
### Executing ` CUSTOM ASYNC FUNCTION `...\n\
\n\
> Finished execution of ` CUSTOM ASYNC FUNCTION `:\n\
```\n\
internal: 42\n\
```\n\
\n\
### Executing ` CUSTOM ASYNC FUNCTION `...\n\
\n\
> Finished execution of ` CUSTOM ASYNC FUNCTION `:\n\
```\n\
\n\
```\n\
DONE {\n\
  "nay": null,\n\
  "no": false,\n\
  "yes": true,\n\
  "user": "test",\n\
  "field": "value",\n\
  "options": {\n\
    "cwd": "tests/"\n\
  },\n\
  "numTestSuites": "' + numberOfTestFiles + '",\n\
  "custom": 13,\n\
  "internal": 26,\n\
  "acustom": 42\n\
}\n\
'};
