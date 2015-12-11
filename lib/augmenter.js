// Public API
module.exports = augmenter;

/**
 * Augments provided callback to invoke custom hook after
 * original callback invocation but before passing control
 *
 * @param   {object} object - object to augment
 * @param   {string} subject - name of the callback property
 * @param   {function} hookCb - hook callback to add to the chain
 * @returns {function} - provide un-augment function
 */
function augmenter(object, subject, hookCb)
{
  var unaugment, originalCb = object[subject];

  unaugment = function()
  {
    // return everything back to normal
    object[subject] = originalCb;
  };

  object[subject] = function()
  {
    var args   = Array.prototype.slice.call(arguments)
      , result = originalCb.apply(this, args)
      ;

    // revert callback augmentation
    unaugment();

    // with everything out of the way
    // invoke custom hook
    return hookCb.call(this, [result].concat(args));
  };

  return unaugment;
}
