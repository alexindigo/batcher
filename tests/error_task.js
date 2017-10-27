module.exports =
{
  batch:
  [
    ['echo ABC', 42, 'echo will it get there'],

    'never-gets-a-chance'
  ],

  expected: `# Started batch process

## Initial State:

\`\`\`
{}
\`\`\`

## Execution


### Executing \`\` echo ABC \`\`...


### Executing \`\` 42 \`\`...

> Failed to execute \`\` 42 \`\`:
\`\`\`
{
  "message": "Unsupported command type: [number] 42"
}
\`\`\`

~~ Command \`\` echo ABC \`\` has been terminated. ~~

## Finished with errors:

\`\`\`
{
  "message": "Unsupported command type: [number] 42"
}
\`\`\`

## Final State:

\`\`\`
{}
\`\`\`
`};
