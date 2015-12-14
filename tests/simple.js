module.exports =
{
  batch:
  [
    'echo A',

    ['echo ABC', ['echo KLM', 'echo XYZ']],

    {user: 'echo alex'},

    'echo xxx-${user}-zzz',

    [['echo A', 'echo B'], ['echo W', 'echo X', 'echo Y', 'echo Z']]
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
### Executing ` echo A `...\n\
\n\
> Finished execution of ` echo A `:\n\
```\n\
A\n\
```\n\
\n\
### Executing ` echo ABC `...\n\
\n\
\n\
### Executing ` [echo KLM, echo XYZ] `...\n\
\n\
> Finished execution of ` echo ABC `:\n\
```\n\
ABC\n\
```\n\
> Finished execution of ` [echo KLM, echo XYZ] `:\n\
```\n\
KLM\n\
XYZ\n\
```\n\
\n\
### Executing ` echo alex `...\n\
\n\
> Storing output into ` user `\n\
\n\
> Finished execution of ` echo alex `:\n\
```\n\
alex\n\
```\n\
\n\
### Executing ` echo xxx-${user}-zzz `...\n\
\n\
> Finished execution of ` echo xxx-${user}-zzz `:\n\
```\n\
xxx-alex-zzz\n\
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
## Final State:\n\
\n\
```\n\
{\n\
  "user": "alex"\n\
}\n\
```\n\
'};
