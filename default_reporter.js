/* eslint no-console:0 */

var typeOf = require('precise-typeof');

module.exports =
{
  /**
   * Handles initial state report
   *
   * @param   {object} state - current state
   * @returns {void}
   */
  init: function(state)
  {
    console.log('# Started batch process\n');
    console.log('## Initial State:\n');
    console.log('```');
    console.log(JSON.stringify(sortKeys(state), null, 2));
    console.log('```');
    console.log('\n## Execution\n');
  },

  /**
   * Handles reports with starting command's execution
   *
   * @param   {object} state - current state
   * @param   {string} command - string representation of the command
   * @returns {void}
   */
  start: function(state, command)
  {
    console.log('\n### Executing `', command, '`' + withCmdPrefix(state) + '...\n');
  },

  /**
   * Handles reports with command's errors
   *
   * @param   {object} state - current state
   * @param   {string} command - string representation of the command
   * @param   {object} error - error returned by the command's execution
   * @returns {void}
   */
  error: function(state, command, error)
  {
    console.log('> Failed to execute `', command, '`' + withCmdPrefix(state) + ':');
    console.log('```');
    console.log(JSON.stringify(error, null, 2));
    console.log('```');
  },

  killed: function(state, command)
  {
    console.log('\n~~ Command `', command, '`' + withCmdPrefix(state) + ' has been terminated. ~~');
  },

  /**
   * Handles reports with command's output
   *
   * @param   {object} state - current state
   * @param   {string} command - string representation of the command
   * @param   {array|string|undefined} output - command's output
   * @returns {void}
   */
  output: function(state, command, output)
  {
    console.log('> Finished execution of `', command, '`' + withCmdPrefix(state) + ':');
    if (!Array.isArray(output)) output = [output];
    console.log('```');
    console.log(output.map(format).join('\n'));
    console.log('```');
  },

  /**
   * Handles reports with storing output data within state
   *
   * @param   {object} state - current state
   * @param   {string} command - string representation of the command
   * @param   {string} key - state's property key
   * @returns {void}
   */
  store: function(state, command, key)
  {
    console.log('> Storing output into `', key, '`\n');
  },

  /**
   * Handles reports with starting command's execution
   *
   * @param   {object} state - final state
   * @param   {object|null} error - optional error object
   * @returns {void}
   */
  done: function(state, error)
  {
    if (error)
    {
      console.log('\n## Finished with errors:\n');
      console.log('```');
      console.log(JSON.stringify(error, null, 2));
      console.log('```');
    }

    console.log('\n## Final State:\n');
    console.log('```');
    console.log(JSON.stringify(sortKeys(state), null, 2));
    console.log('```');
  }
};

/**
 * Tries really hard to sort object's keys alphabetically
 *
 * @param   {object} obj - object to sort
 * @returns {object} - sorted object
 */
function sortKeys(obj)
{
  var sortedObj = {};

  if (typeOf(obj) == 'object')
  {
    Object.keys(obj).sort().forEach(function(key)
    {
      sortedObj[key] = sortKeys(obj[key]);
    });

    obj = sortedObj;
  }

  return obj;
}

/**
 * Formats provided variable into a string, ready for console
 *
 * @param   {mixed} obj – object to format
 * @returns {string} - formatted string
 */
function format(obj)
{
  var output;

  if (typeOf(obj) == 'object' || typeOf(obj) == 'array' || typeOf(obj) == 'null')
  {
    output = JSON.stringify(obj);
  }
  else if (typeOf(obj) != 'undefined')
  {
    output = obj.toString();
  }
  else
  {
    output = '';
  }

  return output;
}

/**
 * Generates command prefix line
 *
 * @param   {object} state - current state
 * @returns {string} - prefix line or empty string
 */
function withCmdPrefix(state)
{
  var prefix;

  if (state.options && state.options.cmdPrefix)
  {
    prefix = ' with `' + state.options.cmdPrefix + '` prefix';
  }

  return prefix || '';
}
