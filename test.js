var assert          = require('assert')
  , partial         = require('lodash.partial')
  , intercept       = require('intercept-stdout')
  , batcher         = require('./')
  , defaultReporter = require('./default_reporter.js')
  , augmentCallback = require('./lib/augmenter.js')
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
  var test    = tests.shift()
    , subject = batcher
    , output  = ''
    , unintercept
    , unaugment
    , customCb
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

  // hook into reporter or batch callback
  customCb = function(result)
  {
    // stop intercepting output
    unintercept();

    // reset error exitCode
    // to prevent error testing from messing things up
    process.exitCode = 0;

    // compare results
    try
    {
      assert.equal(output, test.expected);
    }
    catch (e)
    {
      console.log('\n------- failed test -------');
      console.log(test);
      console.log('------- /failed test -------\n');

      console.log('\n------- output -------');
      console.log(output);
      console.log('------- /output -------\n');

      console.log('\n------- expected -------');
      console.log(test.expected);
      console.log('------- /expected -------\n');

      assert.fail(output, test.expected, undefined, '==');
    }

    // proceed to the next one
    runTests(tests);

    return result;
  };

  // add optional `callback` property if provided
  if (test.callback)
  {
    unaugment = augmentCallback(test, 'callback', customCb);
    subject = partial(subject, test.callback);
  }
  // augment custom reporter if provided
  else if (test.state && test.state.options && test.state.options.reporter)
  {
    unaugment = augmentCallback(test.state.options.reporter, 'done', customCb);
  }
  // or built-in done handler
  else
  {
    unaugment = augmentCallback(defaultReporter, 'done', customCb);
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
    // revert callback augmentation
    unaugment();

    // test doesn't expect exceptions
    // or it's not the one it's looking for
    if (typeof test.exception != 'function' || test.exception(e) !== true)
    {
      // re-throw
      throw e;
    }

    // proceed to the next one
    runTests(tests);
  }
}
