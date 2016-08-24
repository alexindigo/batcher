/* eslint no-console:0 */

var inspect = require('util').inspect;

/**
 * Workaround for bug in node@6.4.0
 * removes `\r` from output
 *
 * @param   {mixed} data - data to format for output to console
 * @returns {string} - formatted data, sans `\r`
 */
function formatOutput(data)
{
  return inspect(data).replace(/\r/g, '');
}

var customReporter =
  {
    init: function(state)
    {
      console.log('init:', formatOutput(state));
    },

    start: function(state, command)
    {
      console.log('start:', command);
    },

    error: function(state, command, error)
    {
      console.log('error:', command, error);
    },

    killed: function(state, command)
    {
      console.log('killed:', command);
    },

    output: function(state, command, output)
    {
      console.log('output:', command, output);
    },

    store: function(state, command, key)
    {
      console.log('store:', command, key);
    },

    done: function(state, error)
    {
      if (error)
      {
        console.log('last error:', formatOutput(error));
      }

      console.log('done:', formatOutput(state));
    }
  };

module.exports =
{
  state:
  {
    options: {reporter: customReporter}
  },

  batch:
  [
    'echo A',

    ['echo ABC', ['echo X', 'echo Y', 'echo Z']],

    {user: 'echo alex'},

    'echo xxx-${user}-zzz',

    [['echo A', 'echo B'], ['echo W', 'echo X', 'echo Y', 'echo Z']]
  ],

  expected: 'init: { options: \n\
   { reporter: \n\
      { init: [Function],\n\
        start: [Function],\n\
        error: [Function],\n\
        killed: [Function],\n\
        output: [Function],\n\
        store: [Function],\n\
        done: [Function] } } }\n\
start: echo A\n\
output: echo A A\n\
start: echo ABC\n\
start: [echo X, echo Y, echo Z]\n\
output: echo ABC ABC\n\
output: [echo X, echo Y, echo Z] [ \'X\', \'Y\', \'Z\' ]\n\
start: echo alex\n\
store: echo alex user\n\
output: echo alex alex\n\
start: echo xxx-${user}-zzz\n\
output: echo xxx-${user}-zzz xxx-alex-zzz\n\
start: [echo A, echo B]\n\
start: [echo W, echo X, echo Y, echo Z]\n\
output: [echo A, echo B] [ \'A\', \'B\' ]\n\
output: [echo W, echo X, echo Y, echo Z] [ \'W\', \'X\', \'Y\', \'Z\' ]\n\
done: { options: \n\
   { reporter: \n\
      { init: [Function],\n\
        start: [Function],\n\
        error: [Function],\n\
        killed: [Function],\n\
        output: [Function],\n\
        store: [Function],\n\
        done: [Function] } },\n\
  user: \'alex\' }\n\
'
};
