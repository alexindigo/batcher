var posixExpected = '# Started batch process\n\
\n\
## Initial State:\n\
\n\
```\n\
{}\n\
```\n\
\n\
## Execution\n\
\n\
\n\
### Executing `` echo A ``...\n\
\n\
> Finished execution of `` echo A ``:\n\
```\n\
A\n\
```\n\
\n\
### Executing `` echo Z ``...\n\
\n\
\n\
### Executing `` [sleep 1, error-here] ``...\n\
\n\
\n\
### Executing `` function (cb) { setTimeout(function() ... }, 2000); } ``...\n\
\n\
\n\
### Executing `` function (cb) { var id = setTimeout(function() ... }; } ``...\n\
\n\
> Finished execution of `` echo Z ``:\n\
```\n\
Z\n\
```\n\
> Failed to execute `` [sleep 1, error-here] ``:\n\
```\n\
{\n\
  "killed": false,\n\
  "code": 127,\n\
  "signal": null,\n\
  "cmd": "error-here",\n\
  "stdout": "",\n\
  "stderr": "/bin/sh: error-here: not found"\n\
}\n\
```\n\
\n\
~~ Command `` function (cb) { var id = setTimeout(function() ... }; } `` has been terminated. ~~\n\
\n\
~~ Command `` function (cb) { setTimeout(function() ... }, 2000); } `` has been terminated. ~~\n\
\n\
## Finished with errors:\n\
\n\
```\n\
{\n\
  "killed": false,\n\
  "code": 127,\n\
  "signal": null,\n\
  "cmd": "error-here",\n\
  "stdout": "",\n\
  "stderr": "/bin/sh: error-here: not found"\n\
}\n\
```\n\
\n\
## Final State:\n\
\n\
```\n\
{}\n\
```\n\
';

var win32Expected = '# Started batch process\n\
\n\
## Initial State:\n\
\n\
```\n\
{}\n\
```\n\
\n\
## Execution\n\
\n\
\n\
### Executing `` echo A ``...\n\
\n\
> Finished execution of `` echo A ``:\n\
```\n\
A\n\
```\n\
\n\
### Executing `` echo Z ``...\n\
\n\
\n\
### Executing `` [sleep 1, error-here] ``...\n\
\n\
\n\
### Executing `` function (cb) { setTimeout(function() ... }, 2000); } ``...\n\
\n\
\n\
### Executing `` function (cb) { var id = setTimeout(function() ... }; } ``...\n\
\n\
> Finished execution of `` echo Z ``:\n\
```\n\
Z\n\
```\n\
> Failed to execute `` [sleep 1, error-here] ``:\n\
```\n\
{\n\
  "killed": false,\n\
  "code": 1,\n\
  "signal": null,\n\
  "cmd": "error-here",\n\
  "stdout": "",\n\
  "stderr": "\'error-here\' is not recognized as an internal or external command,\\r\\noperable program or batch file."\n\
}\n\
```\n\
\n\
~~ Command `` function (cb) { var id = setTimeout(function() ... }; } `` has been terminated. ~~\n\
\n\
~~ Command `` function (cb) { setTimeout(function() ... }, 2000); } `` has been terminated. ~~\n\
\n\
## Finished with errors:\n\
\n\
```\n\
{\n\
  "killed": false,\n\
  "code": 1,\n\
  "signal": null,\n\
  "cmd": "error-here",\n\
  "stdout": "",\n\
  "stderr": "\'error-here\' is not recognized as an internal or external command,\\r\\noperable program or batch file."\n\
}\n\
```\n\
\n\
## Final State:\n\
\n\
```\n\
{}\n\
```\n\
';

module.exports =
{
  batch:
  [
    'echo A',

    [
      'echo Z',
      ['sleep 1', 'error-here'],

      // regular custom function
      function(cb)
      {
        setTimeout(function()
        {
          cb(null, 'Should be cancelled');
        }, 2000);
      },

      // terminable function
      // function needs to be defined with an argument
      // to signal that it's async capable
      // but eslint complaining
      function(cb) // eslint-disable-line no-unused-vars
      {
        var id = setTimeout(function()
        {
          throw new Error('Should be cancelled.');

          cb('will not get here'); // eslint-disable-line no-unreachable
        }, 1500);

        return function terminate()
        {
          // prevent from throwing
          clearTimeout(id);
        };
      }
    ],

    'should not get here'
  ],

  expected: process.platform == 'win32' ? win32Expected : posixExpected
};
