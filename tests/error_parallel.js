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
### Executing `` [sleep 1, error-here, not this one] ``...\n\
\n\
\n\
### Executing `` [sleep 3, echo Y] ``...\n\
\n\
\n\
### Executing `` [sleep 4, echo X] ``...\n\
\n\
> Finished execution of `` echo Z ``:\n\
```\n\
Z\n\
```\n\
> Failed to execute `` [sleep 1, error-here, not this one] ``:\n\
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
~~ Command `` [sleep 4, echo X] `` has been terminated. ~~\n\
\n\
~~ Command `` [sleep 3, echo Y] `` has been terminated. ~~\n\
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
### Executing `` [sleep 1, error-here, not this one] ``...\n\
\n\
\n\
### Executing `` [sleep 3, echo Y] ``...\n\
\n\
\n\
### Executing `` [sleep 4, echo X] ``...\n\
\n\
> Finished execution of `` echo Z ``:\n\
```\n\
Z\n\
```\n\
> Failed to execute `` [sleep 1, error-here, not this one] ``:\n\
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
~~ Command `` [sleep 4, echo X] `` has been terminated. ~~\n\
\n\
~~ Command `` [sleep 3, echo Y] `` has been terminated. ~~\n\
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

    ['echo Z', ['sleep 1', 'error-here', 'not this one'], ['sleep 3', 'echo Y'], ['sleep 4', 'echo X']],

    'no, nay, never'
  ],

  expected: process.platform == 'win32' ? win32Expected : posixExpected
};
