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

  expected: `# Started batch process

## Initial State:

\`\`\`
{}
\`\`\`

## Execution


### Executing \`\` echo A \`\`...

> Finished execution of \`\` echo A \`\`:
\`\`\`
A
\`\`\`

### Executing \`\` echo ABC \`\`...


### Executing \`\` [echo KLM, echo XYZ] \`\`...

> Finished execution of \`\` echo ABC \`\`:
\`\`\`
ABC
\`\`\`
> Finished execution of \`\` [echo KLM, echo XYZ] \`\`:
\`\`\`
KLM
XYZ
\`\`\`

### Executing \`\` echo alex \`\`...

> Storing output into \`\` user \`\`

> Finished execution of \`\` echo alex \`\`:
\`\`\`
alex
\`\`\`

### Executing \`\` echo xxx-\${user}-zzz \`\`...

> Finished execution of \`\` echo xxx-\${user}-zzz \`\`:
\`\`\`
xxx-alex-zzz
\`\`\`

### Executing \`\` [echo A, echo B] \`\`...


### Executing \`\` [echo W, echo X, echo Y, echo Z] \`\`...

> Finished execution of \`\` [echo A, echo B] \`\`:
\`\`\`
A
B
\`\`\`
> Finished execution of \`\` [echo W, echo X, echo Y, echo Z] \`\`:
\`\`\`
W
X
Y
Z
\`\`\`

## Final State:

\`\`\`
{
  "user": "alex"
}
\`\`\`
`};
