var numberOfTestFiles = 13;

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

    // check state assignment
    function(cb)
    {
      this.custom = 42;
      cb(null, 'Assigned 42 to `this.custom`');
    },

    // check exposed (internal) methods
    function(cb)
    {
      this.run('echo ${custom}', function(err, data)
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

    console.log('DONE', state);
  },

  expected: '# Started batch process\n\
\n\
## Initial State:\n\
\n\
```\n\
{\n\
  "nay": null,\n\
  "no": false,\n\
  "yes": true,\n\
  "user": "test",\n\
  "field": "value"\n\
}\n\
```\n\
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
### Executing ` CUSTOM FUNCTION `...\n\
\n\
> Finished execution of ` CUSTOM FUNCTION `:\n\
```\n\
Assigned 42 to `this.custom`\n\
```\n\
\n\
### Executing ` CUSTOM FUNCTION `...\n\
\n\
> Finished execution of ` CUSTOM FUNCTION `:\n\
```\n\
internal: 42\n\
```\n\
\n\
### Executing ` CUSTOM FUNCTION `...\n\
\n\
> Finished execution of ` CUSTOM FUNCTION `:\n\
```\n\
\n\
```\n\
DONE { never: undefined,\n\
  nay: null,\n\
  no: false,\n\
  yes: true,\n\
  user: \'test\',\n\
  field: \'value\',\n\
  options: { cwd: \'tests/\' },\n\
  numTestSuites: \'' + numberOfTestFiles + '\',\n\
  custom: 42 }\n\
'};
