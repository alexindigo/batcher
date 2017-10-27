module.exports =
{
  batch:
  [
    ['sleep 4 && echo D', 'sleep 2 && echo B', 'sleep 1 && echo A', 'sleep 3 && echo C', 'sleep 5 && echo E'],

    [['sleep 4 && echo D', 'sleep 3 && echo C', 'sleep 5 && echo E'], ['sleep 2 && echo B', 'sleep 1 && echo A']],

    {
      second: 'sleep 1 && echo Second',
      first: function(cb) { setTimeout(function() { cb(null, 'First'); }, 500); },
      third: context => `${context.nonExistent || 'Third'}`
    }
  ],

  expected: `# Started batch process

## Initial State:

\`\`\`
{}
\`\`\`

## Execution


### Executing \`\` sleep 4 && echo D \`\`...


### Executing \`\` sleep 2 && echo B \`\`...


### Executing \`\` sleep 1 && echo A \`\`...


### Executing \`\` sleep 3 && echo C \`\`...


### Executing \`\` sleep 5 && echo E \`\`...

> Finished execution of \`\` sleep 1 && echo A \`\`:
\`\`\`
A
\`\`\`
> Finished execution of \`\` sleep 2 && echo B \`\`:
\`\`\`
B
\`\`\`
> Finished execution of \`\` sleep 3 && echo C \`\`:
\`\`\`
C
\`\`\`
> Finished execution of \`\` sleep 4 && echo D \`\`:
\`\`\`
D
\`\`\`
> Finished execution of \`\` sleep 5 && echo E \`\`:
\`\`\`
E
\`\`\`

### Executing \`\` [sleep 4 && echo D, sleep 3 && echo C, sleep 5 && echo E] \`\`...


### Executing \`\` [sleep 2 && echo B, sleep 1 && echo A] \`\`...

> Finished execution of \`\` [sleep 2 && echo B, sleep 1 && echo A] \`\`:
\`\`\`
B
A
\`\`\`
> Finished execution of \`\` [sleep 4 && echo D, sleep 3 && echo C, sleep 5 && echo E] \`\`:
\`\`\`
D
C
E
\`\`\`

### Executing \`\` sleep 1 && echo Second \`\`...


### Executing \`\` function (cb) { setTimeout(function() { cb(null, 'First'); }, 500); } \`\`...


### Executing \`\` context => \`\${context.nonExistent || 'Third'}\` \`\`...

> Storing output into \`\` third \`\`

> Finished execution of \`\` context => \`\${context.nonExistent || 'Third'}\` \`\`:
\`\`\`
Third
\`\`\`
> Storing output into \`\` first \`\`

> Finished execution of \`\` function (cb) { setTimeout(function() { cb(null, 'First'); }, 500); } \`\`:
\`\`\`
First
\`\`\`
> Storing output into \`\` second \`\`

> Finished execution of \`\` sleep 1 && echo Second \`\`:
\`\`\`
Second
\`\`\`

## Final State:

\`\`\`
{
  "first": "First",
  "second": "Second",
  "third": "Third"
}
\`\`\`
`};
