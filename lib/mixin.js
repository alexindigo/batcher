// Public API
module.exports = mixin;

/**
 * Mixes objects via prototypes
 *
 * @private
 * @param   {...object} from - object(s) to mix in with
 * @returns {object} mixed result object
 */
function mixin()
{
  var output = {}
    , args   = Array.prototype.slice.call(arguments)
    , i      = args.length
    ;

  while (i--)
  {
    mixinConstructor.prototype = output;
    output = new mixinConstructor(args[i]);
  }

  return output;
}

/**
 * Populates instance with provided properties
 *
 * @private
 * @param   {object} initial - source object to copy properties from
 * @returns {void}
 */
function mixinConstructor(initial)
{
  var keys = Object.keys(initial)
    , i    = keys.length
    ;

  while (i--) {
    this[keys[i]] = initial[keys[i]];
  }
}
