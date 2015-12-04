module.exports =
{
  state: 'STATE!!!!',

  batch:
  [
    'never-gets-a-chance'
  ],

  exception: function(e)
  {
    // expect to catch only type error
    return e instanceof TypeError && e.message == 'Initial state should be an object';
  },

  expected: ''
};
