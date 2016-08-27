var extend = require('mixly/immutable')
  , typeOf = require('precise-typeof')
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

  if (typeOf(candidate) == 'array')
  {
    copy = [].concat(candidate);
  }
  else if (typeOf(candidate) == 'object')
  {
    copy = extend(candidate);
  }
  else
  {
    copy = candidate;
  }

  return copy;
}
