var batcher = require('../');

module.exports =
{
  batch:
  [
    batcher.forEach({combo: 'mode'}).command('non-existent-combo-command'),

    'never-gets-a-chance'
  ],

  expected: '# Started batch process\n\
\n\
## Initial State:\n\
\n\
```\n\
{}\n\
```\n\
\n\
### Executing ` non-existent-combo-command `...\n\
\n\
> Failed to execute ` non-existent-combo-command `:\n\
```\n\
{\n\
  "killed": false,\n\
  "code": 127,\n\
  "signal": null,\n\
  "cmd": "/bin/sh -c non-existent-combo-command",\n\
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
  "cmd": "/bin/sh -c non-existent-combo-command",\n\
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
'
};
