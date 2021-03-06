var defaultReporter = require('../default_reporter.js')
  , typeOf          = require('precise-typeof')
  ;

// Public API
module.exports = report;

/**
 * Generates report via default or custom reporter
 *
 * @private
 * @param   {string} type - type of the report
 * @param   {object} state - current state
 * @param   {...mixed} [params] - extra parameters to report
 * @returns {void}
 */
function report(type, state, params)
{
  var reporter = defaultReporter;

  // get rest of arguments
  params  = Array.prototype.slice.call(arguments, 1);

  // `init` and `done` types don't have command associated with them
  if (['init', 'done'].indexOf(type) == -1)
  {
    // second (1) position is for command
    // if command present get string representation of it
    params[1] = stringifyCommand(state, params[1]);
  }

  if (state && state.options && state.options.reporter)
  {
    reporter = state.options.reporter;
  }

  reporter[type].apply(null, params);
}

/**
 * Gets command description out of command object
 *
 * @private
 * @param   {object} state - current state
 * @param   {mixed} command - command object
 * @returns {string} - description of the command
 */
function stringifyCommand(state, command)
{
  var name;

  if (typeof command == 'function')
  {
    name = typeof command.commandDescription == 'function'
      ? command.commandDescription(state)
      : Function.prototype.toString.call(command)
      ;

    // truncate long functions
    name = name.split('\n');

    // remove inline comments
    name = name.filter((line) => !line.match(/^\s*\/\//));
    name = name
      .map((line) => line.replace(/^([^'"]*)\s*\/\/.*$/, '$1')) // remove end of line comments
      .map((line) => line.trim()) // remove extra space
      ;

    if (name.length > 6)
    {
      // get side lines
      name.splice(3, name.length - 5);

      // join first and last lines
      name = [name.slice(0, name.length - 2).join(' '), name.slice(-2).join(' ')].join(' ... ');
    }
    else
    {
      name = name.join(' ');
    }
  }
  else if (Array.isArray(command))
  {
    name = '[' + command.join(', ') + ']';
  }
  else if (typeOf(command) == 'object')
  {
    name = JSON.stringify(command);
  }
  else
  {
    name = '' + command;
  }

  return name;
}
