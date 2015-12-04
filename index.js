'use strict';

var extend      = require('xtend/immutable')
  , partial     = require('lodash.partial')
  , once        = require('once')
  , clone       = require('./lib/clone.js')
  , cmdFactory  = require('./lib/command_factory.js')
  , isObject    = require('./lib/is_object.js')
  , mixin       = require('./lib/mixin.js')
  , report      = require('./lib/report.js')
  , runCommand  = require('./lib/run_command.js')
  , stateMethods
  ;

// methods available for the functions invoked
// within state context
stateMethods =
{
  run      : partial(runCommand, {}),
  clone    : clone,
  extend   : extend
};

// Public API
module.exports         = batcher;
module.exports.command = cmdFactory.command;
module.exports.forEach = cmdFactory.forEach;
module.exports.value   = cmdFactory.value;

// --- Public functions

/**
 * Initiates batch processing of the provided tasks
 *
 * @param   {object} [state] - initial state
 * @param   {array} tasks - list of tasks to process
 * @param   {function} callback - invoked after all the tasks have been processed
 * @returns {void}
 */
function batcher(state, tasks, callback)
{
  // `state` is optional
  // if first arguments is Array
  // consider it as list of jobs
  if (Array.isArray(state))
  {
    callback = tasks;
    tasks    = state;
    state    = {};
  }

  // make sure state is an object
  if (!isObject(state))
  {
    throw new TypeError('Initial state should be an object');
  }

  // decouple things
  state = mixin(state, stateMethods);
  tasks = tasks.slice();

  // add hidden current task reference
  Object.defineProperty(state, '_currentTask', {
    enumerable: false,
    writable: true
  });

  report('init', clone(state));

  // process tasks one by one
  // use provided callback or default to the reporting
  iterator(state, tasks, function(error, finalState)
  {
    // if no final state provided use original reference
    finalState = finalState || state;

    if (error)
    {
      // set exitCode to error value
      // don't anticipate error with code 0
      process.exitCode = error.code || 1;
    }

    // pass it to the reporter or callback
    callback ? callback(error, finalState) : report('done', finalState, error);
  });
}

/**
 * Iterates over batch tasks with provided state object
 *
 * @private
 * @param   {object} state - current state
 * @param   {array} tasks - list of tasks to execute
 * @param   {function} callback - invoked after all tasks have been processed
 * @returns {void}
 */
function iterator(state, tasks, callback)
{
  var keys
    , tasksLeft = tasks.length
    , task      = tasks.shift()
    ;

  if (tasksLeft === 0)
  {
    return callback(null, state);
  }

  // init current task reference
  state._currentTask = {waiters: {}};

  if (isObject(task))
  {
    // update state with new options
    // to make it available for all the subcommands
    if (isObject(task.options))
    {
      state.options = extend(state.options, task.options);
      // no need to process it further
      delete task.options;
    }

    // generate list of properties to update
    keys = Object.keys(task);
  }

  // convert non-array and non-object elements
  // into single element arrays
  if (typeof task != 'object')
  {
    task = [ task ];
  }

  execute(state, task, keys, function(err, modifiedState)
  {
    // reset current task
    // if it's error and modified state
    // isn't provided, use context
    (modifiedState || state)._currentTask = undefined;

    if (err) return callback(err);

    // proceed to the next element
    iterator(modifiedState, tasks, callback);
  });
}

/**
 * Executes provided task with state object context
 *
 * @private
 * @param   {object} state - current state
 * @param   {array} task - list of commands to execute
 * @param   {array|undefined} keys - list of task names
 * @param   {function} callback - invoked after all commands have been executed
 * @returns {void}
 */
function execute(state, task, keys, callback)
{
  var key
    , control
    , assignment   = 'ASSIGNMENT'
      // get list of commands left for this iteration
    , commandsLeft = (keys || task).length
    , command      = (keys || task).shift()
      // job id within given task
    , jobId        = commandsLeft
    ;

  // we're done here
  // wait for all the commands
  if (commandsLeft === 0)
  {
    // if it's last one proceed to callback
    if (Object.keys(state._currentTask.waiters).length === 0)
    {
      callback(null, state);
    }

    return;
  }

  if (keys)
  {
    key     = command;
    command = task[command];

    // consider anything but strings, functions and arrays as direct state modifiers
    // there is no one right way to merge arrays, so leave it for custom functions
    if (['string', 'function'].indexOf(typeof command) == -1 && !Array.isArray(command))
    {
      report('start', state, assignment);
      // do shallow merge, until we needed otherwise
      state[key] = isObject(command) ? extend(state[key], command) : command;
      report('store', state, assignment, key);
      report('output', state, assignment, command);
      execute(state, task, keys, callback);
      return;
    }
  }

  report('start', state, command);

  // run the command and get terminator reference
  // if it'd need to be stopped
  control = run(clone(command), state, function(err, data)
  {
    // clean up waiters
    delete state._currentTask.waiters[jobId];

    if (err)
    {
      report('error', state, command, err);
      cleanWaiters(state);
      return callback(err);
    }

    // modify state if requested
    if (key)
    {
      state[key] = data;
      report('store', state, command, key);
    }

    report('output', state, command, data);

    // if it's last one proceed to callback
    if (Object.keys(state._currentTask.waiters).length === 0)
    {
      callback(null, state);
    }
  });

  // if no control object returned
  // means run task was prematurely terminated
  // do not proceed
  if (!control)
  {
    return;
  }

  // keep reference to command related elements
  state._currentTask.waiters[jobId] =
  {
    command    : command,
    callback   : control.callback,
    terminator : control.terminator
  };

  // proceed to the next command within task
  execute(state, task, keys, callback);
}

/**
 * Runs single command, accepts functions, strings or arrays (and objects)
 * runs provided functions within state context
 * and passes rest to `executioner` with `state` object as parameters
 *
 * @private
 * @param   {mixed} command - command to run
 * @param   {object} state - current state
 * @param   {function} callback - invoked after finished executing
 * @returns {object} - invoke ready terminator function and
 *                     callback reference to prevent undesired calls
 */
function run(command, state, callback)
{
  var error = new Error()
    , cb
    , runner
    , terminator
    , terminatorKey
    , control
    ;

  // handle different kinds of commands
  switch (typeof command)
  {
    case 'function':
      runner     = command.bind(state);
      // make it as function proxy
      // (to keep code saner)
      // function to call with a function returned by the command
      terminator = Function.prototype.call.bind(Function.prototype.call);
      break;

    case 'string':
    case 'object':
      runner     = runCommand.bind(state, {}, command);
      terminator = runCommand.terminate;
      break;

    default:
      // TODO: make it a callback
      error.message = 'Unsupported command type: [' + (typeof command) + '] ' + command;
      callback(error);
      return;
  }

  // make sure it called only once
  cb = once(asyncCallback(callback));

  // runner would return terminator key
  // - in case of `executioner` it will be job object
  // supplied to the `executioner.terminate` will terminate
  // ongoing job.
  // - in case of custom function it will be termination function
  // returned by the custom function or not, invoked it will
  // signal ongoing custom function to stop what it's doing.
  terminatorKey = runner(cb);

  control =
  {
    callback  : cb,
    terminator: partial(terminator, terminatorKey || function(){})
  };

  return control;
}

/**
 * Cleans leftover jobs provided by the list
 *
 * @param   {object} state - current state
 * @returns {void}
 */
function cleanWaiters(state)
{
  var list = state._currentTask.waiters;

  Object.keys(list).forEach(function(job)
  {
    // prevent callback from execution
    // by modifying up `once`'s `called` property
    list[job].callback.called = true;
    // if called it will return false
    list[job].callback.value = false;

    // send termination signal to the job
    list[job].terminator();

    // report termination
    report('killed', state, list[job].command);

    delete list[job];
  });
}

/**
 * Makes sure provided callback
 * invoked in real async way
 *
 * @param   {function} callback - callback function to invoke
 * @returns {function} - async-supplemented callback function
 */
function asyncCallback(callback)
{
  var async = function()
  {
    var context = this;
    var args    = arguments;
    process.nextTick(function()
    {
      callback.apply(context, args);
    });
  };

  return async;
}
