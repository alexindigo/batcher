module.exports =
{
  state: 'STATE!!!!',

  batch:
  [
    'never-gets-a-chance'
  ],

  exception: function(ex)
  {
    // expect to catch only type error
    return ex instanceof TypeError && ex.message == 'Initial state should be an object';
  },

  expected: ''
};
