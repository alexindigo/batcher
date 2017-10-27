module.exports =
{
  batch:
  [
    'echo ABC',

    {options: {cmdPrefix: 'echo prefixed:'}},

    ['echo ABC', ['echo KLM', 'echo XYZ']],

    {word: 'echo word'},

    {options: {cmdPrefix: null}},

    'echo entered ${word}'
  ],

  expected: `# Started batch process

## Initial State:

\`\`\`
{}
\`\`\`

## Execution


### Executing \`\` echo ABC \`\`...

> Finished execution of \`\` echo ABC \`\`:
\`\`\`
ABC
\`\`\`

### Executing \`\` echo ABC \`\` with \`\`echo prefixed:\`\` prefix...


### Executing \`\` [echo KLM, echo XYZ] \`\` with \`\`echo prefixed:\`\` prefix...

> Finished execution of \`\` echo ABC \`\` with \`\`echo prefixed:\`\` prefix:
\`\`\`
prefixed: echo ABC
\`\`\`
> Finished execution of \`\` [echo KLM, echo XYZ] \`\` with \`\`echo prefixed:\`\` prefix:
\`\`\`
prefixed: echo KLM
prefixed: echo XYZ
\`\`\`

### Executing \`\` echo word \`\` with \`\`echo prefixed:\`\` prefix...

> Storing output into \`\` word \`\`

> Finished execution of \`\` echo word \`\` with \`\`echo prefixed:\`\` prefix:
\`\`\`
prefixed: echo word
\`\`\`

### Executing \`\` echo entered \${word} \`\`...

> Finished execution of \`\` echo entered \${word} \`\`:
\`\`\`
entered prefixed: echo word
\`\`\`

## Final State:

\`\`\`
{
  "options": {
    "cmdPrefix": null
  },
  "word": "prefixed: echo word"
}
\`\`\`
`};
