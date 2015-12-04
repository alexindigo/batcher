var extend   = require('xtend/immutable')
  , isObject = require('./is_object.js')
  ;

// Public API
module.exports = clone;

/**
 * Clones (shallow copy) provided object or array
 *
 * @param   {mixed} candidate - object or array to clone
 * @returns {mixed} - shallow copy of the provided object or array
 */
function clone(candidate)
{
  var copy;

  if (Array.isArray(candidate))
  {
    copy = [].concat(candidate);
  }
  else if (isObject(candidate))
  {
    copy = extend(candidate);
  }
  else
  {
    copy = candidate;
  }

  return copy;
}
