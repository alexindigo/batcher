module.exports =
{
  batch:
  [
    'echo A',

    ['echo Z',

    // regular custom function
    function(cb)
    {
      setTimeout(function()
      {
        cb(null, 'Should be cancelled');
      }, 2000);
    },

    // broken sync function
    function()
    {
      this.happened = 'Modified state before throwing up';

      // report error from within sync function
      throw 'Sync functions throw instead of passing error into callback.';

      this.notHappened = 'Not really happened';

      return 'Never goes out';
    }],

    'should not get here'
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
### Executing ` echo Z `...\n\
\n\
\n\
### Executing ` CUSTOM ASYNC FUNCTION `...\n\
\n\
\n\
### Executing ` CUSTOM SYNC FUNCTION `...\n\
\n\
> Failed to execute ` CUSTOM SYNC FUNCTION `:\n\
```\n\
"Sync functions throw instead of passing error into callback."\n\
```\n\
\n\
~~ Command ` CUSTOM ASYNC FUNCTION ` has been terminated. ~~\n\
\n\
~~ Command ` echo Z ` has been terminated. ~~\n\
\n\
## Finished with errors:\n\
\n\
```\n\
"Sync functions throw instead of passing error into callback."\n\
```\n\
\n\
## Final State:\n\
\n\
```\n\
{\n\
  "happened": "Modified state before throwing up"\n\
}\n\
```\n\
'
};
