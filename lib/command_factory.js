var partial    = require('lodash.partial')
  , cartesian  = require('cartesian')
  , clone      = require('./clone.js')
  , isObject   = require('./is_object.js')
  , runCommand = require('./run_command.js')
  ;

// Public API
module.exports =
{
  command: commandFactory,
  forEach: forEachFactory,
  value  : valueFactory
};

/**
 * Creates command executor from state property
 *
 * @param   {array|string} [combos] – list of combinations
 * @param   {string} cmd - state property to get command from
 * @returns {function} function that executes the command
 */
function commandFactory(combos, cmd)
{
  var command;

  // if no combos provided
  // consider it as a single command run
  if (!cmd)
  {
    cmd = combos;
    combos = [{}];
  }

  command = partial(iterate, combos, cmd);
  command.commandDescription = partial(commandDescription, cmd);
  return command;
}

/**
 * Constructs set of commands for each property of the passed object
 * with loops over passed arrays
 *
 * @param   {object|array|string} properties - list of properties to run a command with
 * @returns {object} run command factory
 */
function forEachFactory(properties)
{
  // expand object's combinations into an array of objects
  if (isObject(properties))
  {
    properties = cartesian(clone(properties));
  }

  return {command: partial(commandFactory, properties)};
}

/**
 * Creates function that returns provided value
 *
 * @param   {mixed} value - value to return during execution time
 * @returns {function} function that executes the command
 */
function valueFactory(value)
{
  var command = function(cb){ cb(null, value); };
  command.commandDescription = partial(commandDescription, 'VALUE SETTER');
  return command;
}

/**
 * Provides command description, finds matching within state object
 * or uses provided one as is
 *
 * @private
 * @param   {string} desc - command's description or property
 *                        to fetch command from current state
 * @param   {object} state - current state
 * @returns {string} - command's description
 */
function commandDescription(desc, state)
{
  desc = state[desc] || desc;
  return desc.join ? '[' + desc.join(', ') + ']' : desc.toString();
}

/**
 * Runs provided command with each of the combinations
 *
 * @private
 * @param   {array} [accumulator] – accumulates commands output
 * @param   {array|string} combos – list of combinations
 * @param   {string|array} cmd - command to run
 * @param   {function} callback - invoked after commands finished executing
 * @returns {void}
 */
function iterate(accumulator, combos, cmd, callback)
{
  var params;

  // initial call might not have accumulator
  if (arguments.length == 3)
  {
    callback    = cmd;
    cmd         = combos;
    combos      = accumulator;
    accumulator = [];
  }

  // resolve params from combo reference
  if (typeof combos == 'string')
  {
    // only work with arrays and object this way
    params = null;

    // get elements one by one from the array
    // consider number of elements in `accumulator`
    // as number of processed from referenced array
    if (Array.isArray(this[combos]) && this[combos][accumulator.length])
    {
      params = {};
      params[combos] = this[combos][accumulator.length];
    }
    // if object gets referenced
    // create list of combinations out of it
    // and use array logic to resolve
    // current iteration params
    else if (isObject(this[combos]))
    {
      params = cartesian(clone(this[combos]))[accumulator.length];
    }
  }
  else
  {
    // get another combination
    params = combos.shift();
  }

  // when done with the combos
  // invoke callback
  if (!params)
  {
    // if it's a single element, return it as is
    callback(null, (accumulator && accumulator.length == 1) ? accumulator[0] : accumulator);
    return;
  }

  // if command name doesn't as state property
  // consider it as standalone command
  runCommand.call(this, params, this[cmd] || cmd, function(err, output)
  {
    accumulator.push(output);

    if (err)
    {
      callback(err, accumulator);
      return;
    }

    // rinse, repeat
    iterate.call(this, accumulator, combos, cmd, callback);
  }.bind(this));
}
