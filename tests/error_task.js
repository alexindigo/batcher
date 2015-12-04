module.exports =
{
  batch:
  [
    ['echo ABC', 42, 'echo will it get there'],

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
### Executing ` echo ABC `...\n\
\n\
\n\
### Executing ` 42 `...\n\
\n\
> Failed to execute ` 42 `:\n\
```\n\
{\n\
  "message": "Unsupported command type: [number] 42"\n\
}\n\
```\n\
\n\
~~ Command ` echo ABC ` has been terminated. ~~\n\
\n\
## Finished with errors:\n\
\n\
```\n\
{\n\
  "message": "Unsupported command type: [number] 42"\n\
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
