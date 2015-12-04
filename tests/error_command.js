module.exports =
{
  batch:
  [
    'non-existent-command',

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
### Executing ` non-existent-command `...\n\
\n\
> Failed to execute ` non-existent-command `:\n\
```\n\
{\n\
  "killed": false,\n\
  "code": 127,\n\
  "signal": null,\n\
  "cmd": "/bin/sh -c non-existent-command",\n\
  "stdout": "",\n\
  "stderr": "/bin/sh: non-existent-command: not found"\n\
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
  "cmd": "/bin/sh -c non-existent-command",\n\
  "stdout": "",\n\
  "stderr": "/bin/sh: non-existent-command: not found"\n\
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
