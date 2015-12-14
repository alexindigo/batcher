module.exports =
{
  batch:
  [
    'echo ABC',

    {options: {cmdPrefix: 'echo "prefixed:"'}},

    ['echo ABC', ['echo KLM', 'echo XYZ']],

    {word: 'echo word'},

    {options: {cmdPrefix: null}},

    'echo entered ${word}'
  ],

  expected: '# Started batch process\n\
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
### Executing ` echo ABC `...\n\
\n\
> Finished execution of ` echo ABC `:\n\
```\n\
ABC\n\
```\n\
\n\
### Executing ` echo ABC ` with `echo "prefixed:"` prefix...\n\
\n\
\n\
### Executing ` [echo KLM, echo XYZ] ` with `echo "prefixed:"` prefix...\n\
\n\
> Finished execution of ` echo ABC ` with `echo "prefixed:"` prefix:\n\
```\n\
prefixed: echo ABC\n\
```\n\
> Finished execution of ` [echo KLM, echo XYZ] ` with `echo "prefixed:"` prefix:\n\
```\n\
prefixed: echo KLM\n\
prefixed: echo XYZ\n\
```\n\
\n\
### Executing ` echo word ` with `echo "prefixed:"` prefix...\n\
\n\
> Storing output into ` word `\n\
\n\
> Finished execution of ` echo word ` with `echo "prefixed:"` prefix:\n\
```\n\
prefixed: echo word\n\
```\n\
\n\
### Executing ` echo entered ${word} `...\n\
\n\
> Finished execution of ` echo entered ${word} `:\n\
```\n\
entered prefixed: echo word\n\
```\n\
\n\
## Final State:\n\
\n\
```\n\
{\n\
  "options": {\n\
    "cmdPrefix": null\n\
  },\n\
  "word": "prefixed: echo word"\n\
}\n\
```\n\
'};
