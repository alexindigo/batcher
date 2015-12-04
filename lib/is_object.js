// Public API
module.exports = isObject;

/**
 * Checks for true object
 *
 * @private
 * @param   {mixed} candidate - candidate in question
 * @returns {boolean} true is candidate is an object
 */
function isObject(candidate)
{
  return typeof candidate == 'object' && !Array.isArray(candidate);
}
