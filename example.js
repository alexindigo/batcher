var batcher    = require('./');

var cdnServers = ['image1', 'image2'];
var cdnFiles   = ['file1', 'file2'];

batcher({
  myValue  : '42',
  versions : {os: '10', node: '0.10'},
  deploy : ['echo "pushing A to ${cdn}:${dir}:${file}"', 'echo "pushing B to ${cdn}:${dir}:${file}"'],
  options: {cwd: __dirname, verbose: true}
}, [
  // simple command
  'echo A',

  // set of commands
  ['node -v', 'npm -v'],

  // set of sets
  // `batcher` treats it as set of commands
  // and passes sub arrays to `executioner` module
  // which executes arrays as sets of commands
  [['echo A', 'echo B'], ['echo X', 'echo Y', 'echo Z']],

  // stores output within state object
  {user: 'whoami'},

  // uses variables from state object
  'echo xxx-${user}-zzz',

  // multiple state assigns
  {node: 'node -v', npm: 'npm -v'},

  // produces prefixed output
  // `batcher` parses tasks objects
  // but in this case, task is an array
  // and it's content passed to `executioner` module
  // which interprets object as prefixed commands
  [{node: 'node -v', npm: 'npm -v'}],

  // stores custom function output within state
  // creates hook command
  {hook: function(cb){ cb(null, 'echo "<${user}> with node: ${node}"'); }},

  // modifying state directly in turn with commands
  'echo "1. ${myValue}"',

  // anything that it not a string, array or function get's assigned
  // to the respective state property
  {myValue: 13, myNewValue: 28},

  // now it's different
  'echo "2. ${myValue}"',

  // or use `value` method to specify any type of the value
  {myValue: batcher.value('updated to string')},

  // now it's string
  'echo "3. ${myValue}"',

  // update state with object, will be merged with existing one
  // mainly so we can update `options` object
  {versions: {node: '0.12', npm: '2.1'}},

  // but array get's executed
  {newList: ['echo 1', 'echo 2', 'echo 3']},

  // async function run with state context
  // with few helper methods
  function(cb)
  {
    // `run` method is available in the context
    // allows to execute shell command within state
    this.run('echo "__${node}__ + __${npm}__"', function(err, data)
    {
      if (err) return cb(err);

      // store result in the state
      this.custom = data;

      cb(null, 'augmented result from custom function: ' + data);
    }.bind(this));
  },

  // sync function
  function()
  {
    return 'ABC + ' + this.custom + ' + XYZ';
  },

  // execute commands with common prefix
  // e.g. `ssh my-server`

  // all following shell commands will prepended with this prefix
  {options: {cmdPrefix: 'echo with-prefix'}},

  'echo cmd1',

  ['echo cmd2-1', 'echo cmd2-2'],

  {storingInState: 'echo cmd3'},

  // sequential command series
  [['echo cmd4-1', 'echo cmd4-2']],

  // prefixed output with prefixed command
  [{output1: 'cmd5-1', output2: 'cmd5-2'}],

  // reset command prefix
  {options: {cmdPrefix: null}},

  // execute command from state object
  {result: batcher.command('hook') },

  // loop over lists
  batcher.forEach({cdn: cdnServers, dir: '/dir', file: cdnFiles}).command('deploy'),

  // or use straightoutta array of objects
  batcher.forEach([{cdn: cdnServers[0]}, {cdn: cdnServers[1]}]).command('echo "scp to ${cdn}"'),

  // also works with standalone commands
  // and result could be stored as well
  {customCommandOverCombo: batcher.forEach({cdn: cdnServers, dir: '/dir', file: cdnFiles}).command('echo ${cdn} and ${file}')},

  // store output of several commands as an array
  {listOfStuff: ['echo Aa', 'echo Bbb', 'echo Cccc', 'echo Ddddd']},

  // iterate over it
  batcher.forEach('listOfStuff').command('echo "read from list: ${listOfStuff}"'),

  // execute a command with custom options
  {files: 'ls | wc -l', options: {cwd: __dirname + '/tests'}}
]);
