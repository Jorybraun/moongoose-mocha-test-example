const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe;

  beforeEach((done) => {
    // make a new user 
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(()=> done());
  });

  it('finds all the users with the name of joe', (done) => {
    User.find({ name: 'Joe'})
      .then((users)=> {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('finds a specific user by an id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      }) 
  });

});