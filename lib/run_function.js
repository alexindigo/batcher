var isArrowFunction = require('is-arrow-function');

// Public API
module.exports = run;

/**
 * Runs provided command/function within state context
 *
 * @param   {object} params - extra execution-time parameters
 * @param   {string|array} command - command to run
 * @param   {function} callback - invoked after command finished executing
 * @returns {void}
 */
function run(params, command, callback)
{
  var terminator
    , requiresContext = isArrowFunction(command)
    ;

  // make sure callback is invoked in real async way
  callback = async(callback);

  // check provided function if it expected
  // to be run in async or sync way

  // expects no arguments, run it as sync function
  // unless it's function straight outta factory
  // has `.commandDescription` property
  //
  // Or it has one argument and requires context
  // must be arrow function with `context` argument
  if ((command.length === 0 || (command.length === 1 && requiresContext)) && !command.commandDescription)
  {
    runSync(this, command, callback);
  }
  else // or run it as async
  {
    // async function may return terminator function
    terminator = runAsync(this, command, callback);
  }

  // return provided terminator or empty function
  // if there is none
  return terminator || function() {};
}

/**
 * Wraps synchronous function with common interface
 *
 * @param   {object} context - context to invoke within
 * @param   {function} func - function to execute
 * @param   {Function} callback - invoke after function is finished executing
 * @returns {void}
 */
function runSync(context, func, callback)
{
  var result
    , requiresContext = isArrowFunction(func)
    ;

  try
  {
    if (requiresContext)
    {
      result = func.call(null, context);
    }
    else
    {
      result = func.call(context);
    }
  }
  catch (ex)
  {
    // pass error as error-first callback
    callback(ex);
    return;
  }

  // everything went well
  callback(null, result);
}

/**
 * Wraps asynchronous function with common interface
 *
 * @param   {object} context - context to invoke within
 * @param   {function} func - function to execute
 * @param   {Function} callback - invoke after function is finished executing
 * @returns {void}
 */
function runAsync(context, func, callback)
{
  var result
    , requiresContext = isArrowFunction(func)
    ;

  if (requiresContext)
  {
    result = func.call(null, context, callback);
  }
  else
  {
    result = func.call(context, callback);
  }

  return result;
}

/**
 * Makes sure provided function invoked in real async way
 *
 * @param   {function} func - function to invoke wrap
 * @returns {function} - async-supplemented callback function
 */
function async(func)
{
  function wrapper()
  {
    var context = this;
    var args    = arguments;
    process.nextTick(function()
    {
      func.apply(context, args);
    });
  }

  return wrapper;
}
