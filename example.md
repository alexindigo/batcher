# Started batch process

## Initial State:

```
{
  "deploy": [
    "echo \"pushing A to ${cdn}:${dir}:${file}\"",
    "echo \"pushing B to ${cdn}:${dir}:${file}\""
  ],
  "myValue": "42",
  "options": {
    "cwd": "/Users/alex/Projects/batcher",
    "verbose": true
  },
  "versions": {
    "node": "0.10",
    "os": "10"
  }
}
```

## Execution


### Executing `` echo A ``...

> Finished execution of `` echo A ``:
```
A
```

### Executing `` node -v ``...


### Executing `` npm -v ``...

> Finished execution of `` node -v ``:
```
v6.10.1
```
> Finished execution of `` npm -v ``:
```
3.10.10
```

### Executing `` [echo A, echo B] ``...


### Executing `` [echo X, echo Y, echo Z] ``...

> Finished execution of `` [echo A, echo B] ``:
```
A
B
```
> Finished execution of `` [echo X, echo Y, echo Z] ``:
```
X
Y
Z
```

### Executing `` whoami ``...

> Storing output into `` user ``

> Finished execution of `` whoami ``:
```
alex
```

### Executing `` echo xxx-${user}-zzz ``...

> Finished execution of `` echo xxx-${user}-zzz ``:
```
xxx-alex-zzz
```

### Executing `` node -v ``...


### Executing `` npm -v ``...

> Storing output into `` node ``

> Finished execution of `` node -v ``:
```
v6.10.1
```
> Storing output into `` npm ``

> Finished execution of `` npm -v ``:
```
3.10.10
```

### Executing `` {"node":"node -v","npm":"npm -v"} ``...

> Finished execution of `` {"node":"node -v","npm":"npm -v"} ``:
```
node: v6.10.1
npm: 3.10.10
```

### Executing `` function () { return 'echo "<${user}> with node: ${node}"'; } ``...

> Storing output into `` hook ``

> Finished execution of `` function () { return 'echo "<${user}> with node: ${node}"'; } ``:
```
echo "<${user}> with node: ${node}"
```

### Executing `` context => context.versions.os ``...

> Storing output into `` os ``

> Finished execution of `` context => context.versions.os ``:
```
10
```

### Executing `` echo "<${user}> with node: ${node}" ``...

> Storing output into `` result ``

> Finished execution of `` echo "<${user}> with node: ${node}" ``:
```
<alex> with node: v6.10.1
```

### Executing `` echo "1. ${myValue}" ``...

> Finished execution of `` echo "1. ${myValue}" ``:
```
1. 42
```

### Executing `` ASSIGNMENT ``...

> Storing output into `` myValue ``

> Finished execution of `` ASSIGNMENT ``:
```
13
```

### Executing `` ASSIGNMENT ``...

> Storing output into `` myNewValue ``

> Finished execution of `` ASSIGNMENT ``:
```
28
```

### Executing `` echo "2. ${myValue}" ``...

> Finished execution of `` echo "2. ${myValue}" ``:
```
2. 13
```

### Executing `` VALUE SETTER ``...

> Storing output into `` myValue ``

> Finished execution of `` VALUE SETTER ``:
```
updated to string
```

### Executing `` echo "3. ${myValue}" ``...

> Finished execution of `` echo "3. ${myValue}" ``:
```
3. updated to string
```

### Executing `` ASSIGNMENT ``...

> Storing output into `` versions ``

> Finished execution of `` ASSIGNMENT ``:
```
{"node":"0.12","npm":"2.1"}
```

### Executing `` [echo 1, echo 2, echo 3] ``...

> Storing output into `` newList ``

> Finished execution of `` [echo 1, echo 2, echo 3] ``:
```
1
2
3
```

### Executing `` function (cb) { this.run('echo "__${node}__ + __${npm}__"', function(err, data) ... }.bind(this)); } ``...

> Finished execution of `` function (cb) { this.run('echo "__${node}__ + __${npm}__"', function(err, data) ... }.bind(this)); } ``:
```
augmented result from custom function: __v6.10.1__ + __3.10.10__
```

### Executing `` (context, cb) => { cb(null, context.versions.node); } ``...

> Finished execution of `` (context, cb) => { cb(null, context.versions.node); } ``:
```
0.12
```

### Executing `` function () { return 'ABC + ' + this.custom + ' + XYZ'; } ``...

> Finished execution of `` function () { return 'ABC + ' + this.custom + ' + XYZ'; } ``:
```
ABC + __v6.10.1__ + __3.10.10__ + XYZ
```

### Executing `` context => `${context.newList[0]} and ${context.hook}` ``...

> Storing output into `` newValue ``

> Finished execution of `` context => `${context.newList[0]} and ${context.hook}` ``:
```
1 and echo "<${user}> with node: ${node}"
```

### Executing `` echo cmd1 `` with ``echo with-prefix`` prefix...

> Finished execution of `` echo cmd1 `` with ``echo with-prefix`` prefix:
```
with-prefix echo cmd1
```

### Executing `` echo cmd2-1 `` with ``echo with-prefix`` prefix...


### Executing `` echo cmd2-2 `` with ``echo with-prefix`` prefix...

> Finished execution of `` echo cmd2-1 `` with ``echo with-prefix`` prefix:
```
with-prefix echo cmd2-1
```
> Finished execution of `` echo cmd2-2 `` with ``echo with-prefix`` prefix:
```
with-prefix echo cmd2-2
```

### Executing `` echo cmd3 `` with ``echo with-prefix`` prefix...

> Storing output into `` storingInState ``

> Finished execution of `` echo cmd3 `` with ``echo with-prefix`` prefix:
```
with-prefix echo cmd3
```

### Executing `` [echo cmd4-1, echo cmd4-2] `` with ``echo with-prefix`` prefix...

> Finished execution of `` [echo cmd4-1, echo cmd4-2] `` with ``echo with-prefix`` prefix:
```
with-prefix echo cmd4-1
with-prefix echo cmd4-2
```

### Executing `` {"output1":"cmd5-1","output2":"cmd5-2"} `` with ``echo with-prefix`` prefix...

> Finished execution of `` {"output1":"cmd5-1","output2":"cmd5-2"} `` with ``echo with-prefix`` prefix:
```
output1: with-prefix cmd5-1
output2: with-prefix cmd5-2
```

### Executing `` [echo "pushing A to ${cdn}:${dir}:${file}", echo "pushing B to ${cdn}:${dir}:${file}"] ``...

> Finished execution of `` [echo "pushing A to ${cdn}:${dir}:${file}", echo "pushing B to ${cdn}:${dir}:${file}"] ``:
```
["pushing A to image1:/dir:file1","pushing B to image1:/dir:file1"]
["pushing A to image2:/dir:file1","pushing B to image2:/dir:file1"]
["pushing A to image1:/dir:file2","pushing B to image1:/dir:file2"]
["pushing A to image2:/dir:file2","pushing B to image2:/dir:file2"]
```

### Executing `` echo "scp to ${cdn}" ``...

> Finished execution of `` echo "scp to ${cdn}" ``:
```
scp to image1
scp to image2
```

### Executing `` echo ${cdn} and ${file} ``...

> Storing output into `` customCommandOverCombo ``

> Finished execution of `` echo ${cdn} and ${file} ``:
```
image1 and file1
image2 and file1
image1 and file2
image2 and file2
```

### Executing `` [echo Aa, echo Bbb, echo Cccc, echo Ddddd] ``...

> Storing output into `` listOfStuff ``

> Finished execution of `` [echo Aa, echo Bbb, echo Cccc, echo Ddddd] ``:
```
Aa
Bbb
Cccc
Ddddd
```

### Executing `` echo "read from list: ${listOfStuff}" ``...

> Finished execution of `` echo "read from list: ${listOfStuff}" ``:
```
read from list: Aa
read from list: Bbb
read from list: Cccc
read from list: Ddddd
```

### Executing `` ls | wc -l ``...

> Storing output into `` files ``

> Finished execution of `` ls | wc -l ``:
```
15
```

## Final State:

```
{
  "custom": "__v6.10.1__ + __3.10.10__",
  "customCommandOverCombo": [
    "image1 and file1",
    "image2 and file1",
    "image1 and file2",
    "image2 and file2"
  ],
  "deploy": [
    "echo \"pushing A to ${cdn}:${dir}:${file}\"",
    "echo \"pushing B to ${cdn}:${dir}:${file}\""
  ],
  "files": "15",
  "hook": "echo \"<${user}> with node: ${node}\"",
  "listOfStuff": [
    "Aa",
    "Bbb",
    "Cccc",
    "Ddddd"
  ],
  "myNewValue": 28,
  "myValue": "updated to string",
  "newList": [
    "1",
    "2",
    "3"
  ],
  "newValue": "1 and echo \"<${user}> with node: ${node}\"",
  "node": "v6.10.1",
  "npm": "3.10.10",
  "options": {
    "cmdPrefix": null,
    "cwd": "/Users/alex/Projects/batcher/tests",
    "verbose": true
  },
  "os": "10",
  "result": "<alex> with node: v6.10.1",
  "storingInState": "with-prefix echo cmd3",
  "user": "alex",
  "versions": {
    "node": "0.12",
    "npm": "2.1",
    "os": "10"
  }
}
```
