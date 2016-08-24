module.exports =
{
  batch:
  [
    ['sleep 4 && echo D', 'sleep 2 && echo B', 'sleep 1 && echo A', 'sleep 3 && echo C', 'sleep 5 && echo E'],

    [['sleep 4; echo D', 'sleep 3; echo C', 'sleep 5; echo E'], ['sleep 2; echo B', 'sleep 1; echo A']],

    {second: 'sleep 1; echo Second', first: function(cb){ setTimeout(function(){ cb(null, 'First'); }, 500); }}
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
### Executing ` sleep 4 && echo D `...\n\
\n\
\n\
### Executing ` sleep 2 && echo B `...\n\
\n\
\n\
### Executing ` sleep 1 && echo A `...\n\
\n\
\n\
### Executing ` sleep 3 && echo C `...\n\
\n\
\n\
### Executing ` sleep 5 && echo E `...\n\
\n\
> Finished execution of ` sleep 1 && echo A `:\n\
```\n\
A\n\
```\n\
> Finished execution of ` sleep 2 && echo B `:\n\
```\n\
B\n\
```\n\
> Finished execution of ` sleep 3 && echo C `:\n\
```\n\
C\n\
```\n\
> Finished execution of ` sleep 4 && echo D `:\n\
```\n\
D\n\
```\n\
> Finished execution of ` sleep 5 && echo E `:\n\
```\n\
E\n\
```\n\
\n\
### Executing ` [sleep 4; echo D, sleep 3; echo C, sleep 5; echo E] `...\n\
\n\
\n\
### Executing ` [sleep 2; echo B, sleep 1; echo A] `...\n\
\n\
> Finished execution of ` [sleep 2; echo B, sleep 1; echo A] `:\n\
```\n\
B\n\
A\n\
```\n\
> Finished execution of ` [sleep 4; echo D, sleep 3; echo C, sleep 5; echo E] `:\n\
```\n\
D\n\
C\n\
E\n\
```\n\
\n\
### Executing ` sleep 1; echo Second `...\n\
\n\
\n\
### Executing ` CUSTOM ASYNC FUNCTION `...\n\
\n\
> Storing output into ` first `\n\
\n\
> Finished execution of ` CUSTOM ASYNC FUNCTION `:\n\
```\n\
First\n\
```\n\
> Storing output into ` second `\n\
\n\
> Finished execution of ` sleep 1; echo Second `:\n\
```\n\
Second\n\
```\n\
\n\
## Final State:\n\
\n\
```\n\
{\n\
  "first": "First",\n\
  "second": "Second"\n\
}\n\
```\n\
'
};
