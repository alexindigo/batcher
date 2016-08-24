var executioner = require('executioner')
  , partial     = require('lodash.partial')
  , extend      = require('mixly/immutable')
  , typeOf      = require('precise-typeof')
  , clone       = require('./clone.js')
  ;

// Public API
module.exports = run;

/**
 * Runs provided command within state context
 *
 * @param   {object} params - extra execution-time parameters
 * @param   {string|array} command - command to run
 * @param   {function} callback - invoked after command finished executing
 * @returns {void}
 */
function run(params, command, callback)
{
  var job;

  // decouple commands
  command = clone(command);

  // start command execution and get job reference
  job = executioner(command, stringify(extend(this, params)), this.options || {}, callback);

  // make ready to call task termination function
  return partial(executioner.terminate, job);
}

/**
 * Decouples and "stringifies" provided object
 * to use with `executioner` shell runner
 *
 * @param   {object} origin - params object
 * @returns {object} - new object with stringified properties
 */
function stringify(origin)
{
  var i, keys, prepared = {};

  keys = Object.keys(origin);
  i = keys.length;

  while (i--) {

    // skip un-stringable things
    if (typeOf(origin[keys[i]]) == 'function'
      || typeOf(origin[keys[i]]) == 'object')
    {
      continue;
    }

    // export it
    prepared[keys[i]] = origin[keys[i]];

    // make it shell ready
    if (typeOf(prepared[keys[i]]) == 'boolean')
    {
      prepared[keys[i]] = prepared[keys[i]] ? '1' : '';
    }

    if (typeOf(prepared[keys[i]]) == 'undefined' || typeOf(prepared[keys[i]]) == 'null')
    {
      prepared[keys[i]] = '';
    }

    // convert everything else to string
    prepared[keys[i]] = prepared[keys[i]].toString();
  }

  return prepared;
}
