var assert          = require('assert')
  , partial         = require('lodash.partial')
  , intercept       = require('intercept-stdout')
  , batcher         = require('./')
  , defaultReporter = require('./default_reporter.js')
  , testCases
  ;


// require test cases
testCases =
[
  require('./tests/simple.js'),
  require('./tests/regular.js'),
  require('./tests/commands.js'),
  require('./tests/values.js'),
  require('./tests/async_parallel.js'),
  require('./tests/error_command.js'),
  require('./tests/error_combo.js'),
  require('./tests/error_task.js'),
  require('./tests/error_single_task.js'),
  require('./tests/error_state.js'),
  require('./tests/error_parallel.js'),
  require('./tests/error_async.js'),
  require('./tests/custom_reporter.js')
];

// run'em all
runTests(testCases);

/**
 * [runTests description]
 * @param   {[type]} tests [description]
 * @returns {void}
 */
function runTests(tests)
{
  var test = tests.shift()
    , subject = batcher
    , output  = ''
    , unintercept
    ;

  if (!test)
  {
    // DONE
    console.log('DONE with tests');
    return;
  }

  // prepare test subject
  unintercept = intercept(function(str)
  {
    // clean up stderr reporting difference
    // between linux and osx
    // it's a slippery slope, DO NOT DO THIS
    output += str
      .replace('"stderr": "/bin/sh: 1: ', '"stderr": "/bin/sh: ')
      .replace(': command not found', ': not found')
      ;
    // silent
    return '';
  }, function(){ /* do not intercept stderr */ });

  // add optional `state` object if provided
  if (test.state)
  {
    subject = partial(subject, test.state);
  }

  // add `batch` array, should be provided
  subject = partial(subject, test.batch);

  // add optional `callback` property if provided
  if (test.callback)
  {
    subject = partial(subject, augmentCallback(test.callback, function()
    {
      // stop intercepting output
      unintercept();

      // reset error exitCode
      // to prevent error testing from messing things up
      process.exitCode = 0;

      console.log('\n\n ------------------------- actual --------------------------');
      console.log(output);
      console.log('-------------------------------------------------- \n\n');

// console.log('\n\n ------------------------- expected -------------------------');
// console.log(test.expected);
// console.log('-------------------------------------------------- \n\n');

      // compare results
      assert.equal(output, test.expected);

      // proceed to the next one
      runTests(tests);
    }));
  }
  else if (test.state && test.state.options && test.state.options.reporter)
  {
    test.state.options.reporter.done = augmentCallback(test.state.options.reporter.done, function()
    {
      // stop intercepting output
      unintercept();

      // reset error exitCode
      // to prevent error testing from messing things up
      process.exitCode = 0;

      console.log('\n\n ------------------------- HERE actual --------------------------');
      console.log(output);
      console.log('-------------------------------------------------- \n\n');

// console.log('\n\n ------------------------- HERE expected -------------------------');
// console.log(test.expected);
// console.log('-------------------------------------------------- \n\n');

      // compare results
      assert.equal(output, test.expected);

      // return everything back to normal
      test.state.options.reporter.done = test.state.options.reporter.done._original;

      // proceed to the next one
      runTests(tests);
    });
  }
  else
  {
    // or augment built-in done handler
    defaultReporter.done = augmentCallback(defaultReporter.done, function()
    {
      // stop intercepting output
      unintercept();

      // reset error exitCode
      // to prevent error testing from messing things up
      process.exitCode = 0;

      console.log('\n\n ------------------------- actual --------------------------');
      console.log(output);
      console.log('-------------------------------------------------- \n\n');

// console.log('\n\n ------------------------- expected -------------------------');
// console.log(test.expected);
// console.log('-------------------------------------------------- \n\n');

      // compare results
      assert.equal(output, test.expected);

      // return everything back to normal
      defaultReporter.done = defaultReporter.done._original;

      // proceed to the next one
      runTests(tests);
    });
  }

  // execute test subject
  // catch sync errors
  try
  {
    subject();
  }
  catch (e)
  {
    // stop intercepting output
    unintercept();

    // test doesn't expect exceptions
    // or it's not the one it's looking for
    if (typeof test.exception != 'function' || test.exception(e) !== true)
    {
      // re-throw
      throw e;
    }

    // cleaning up leftovers
    if (defaultReporter.done._original)
    {
      defaultReporter.done = defaultReporter.done._original;
    }

    if (test.state && test.state.options && test.state.options.reporter && test.state.options.reporter.done._original)
    {
      test.state.options.reporter.done = test.state.options.reporter.done._original;
    }

    // proceed to the next one
    runTests(tests);
  }
}

/**
 * Augments provided callback
 * to invoke custom hook after
 * original callback invocation
 * but before passing control
 *
 * @param   {function} subjectCb - callback function to augment
 * @param   {function} hookCb - hook callback to add to the chain
 * @returns {function} - augmented callback function
 */
function augmentCallback(subjectCb, hookCb)
{
  var augmented = function()
  {
    var result = subjectCb.apply(this, arguments);

    hookCb.call(this, arguments);

    return result;
  };

  // store original version
  augmented._original = subjectCb;

  return augmented;
}
