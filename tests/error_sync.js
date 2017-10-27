module.exports =
{
  batch:
  [
    'echo A',

    [
      'echo Z',

      // regular custom function
      function(cb)
      {
        setTimeout(function()
        {
          cb(null, 'Will be cancelled');
        }, 2500);
      },

      // broken sync function
      function()
      {
        this.happened = 'Modified state before throwing up';

        // report error from within sync function
        throw new Error('Sync functions throw instead of passing error into callback.');
      }
    ],

    'should not get here'
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

### Executing \`\` echo Z \`\`...


### Executing \`\` function (cb) { setTimeout(function() ... }, 2500); } \`\`...


### Executing \`\` function () { this.happened = 'Modified state before throwing up';  throw new Error('Sync functions throw instead of passing error into callback.'); } \`\`...

> Failed to execute \`\` function () { this.happened = 'Modified state before throwing up';  throw new Error('Sync functions throw instead of passing error into callback.'); } \`\`:
\`\`\`
{}
\`\`\`

~~ Command \`\` function (cb) { setTimeout(function() ... }, 2500); } \`\` has been terminated. ~~

~~ Command \`\` echo Z \`\` has been terminated. ~~

## Finished with errors:

\`\`\`
{}
\`\`\`

## Final State:

\`\`\`
{
  "happened": "Modified state before throwing up"
}
\`\`\`
`};
