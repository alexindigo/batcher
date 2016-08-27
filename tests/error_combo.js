var batcher = require('../');

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
### Executing ` non-existent-combo-command `...\n\
\n\
> Failed to execute ` non-existent-combo-command `:\n\
```\n\
{\n\
  "killed": false,\n\
  "code": 127,\n\
  "signal": null,\n\
  "cmd": "non-existent-combo-command",\n\
  "stdout": "",\n\
  "stderr": "/bin/sh: non-existent-combo-command: not found"\n\
}\n\
```\n\
\n\
## Finished with errors:\n\
\n\
```\n\
{\n\
  "killed": false,\n\
  "code": 127,\n\
  "signal": null,\n\
  "cmd": "non-existent-combo-command",\n\
  "stdout": "",\n\
  "stderr": "/bin/sh: non-existent-combo-command: not found"\n\
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
### Executing ` non-existent-combo-command `...\n\
\n\
> Failed to execute ` non-existent-combo-command `:\n\
```\n\
{\n\
  "killed": false,\n\
  "code": 1,\n\
  "signal": null,\n\
  "cmd": "non-existent-combo-command",\n\
  "stdout": "",\n\
  "stderr": "\'non-existent-combo-command\' is not recognized as an internal or external command,\\r\\noperable program or batch file."\n\
}\n\
```\n\
\n\
## Finished with errors:\n\
\n\
```\n\
{\n\
  "killed": false,\n\
  "code": 1,\n\
  "signal": null,\n\
  "cmd": "non-existent-combo-command",\n\
  "stdout": "",\n\
  "stderr": "\'non-existent-combo-command\' is not recognized as an internal or external command,\\r\\noperable program or batch file."\n\
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
    batcher.forEach({combo: 'mode'}).command('non-existent-combo-command'),

    'never-gets-a-chance'
  ],

  expected: process.platform == 'win32' ? win32Expected : posixExpected
};
