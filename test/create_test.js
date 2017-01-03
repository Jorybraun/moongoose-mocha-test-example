const assert = require('assert');
const User = require('../src/user');


describe('Creating records', () => {

  it('saves a user ', (done) => {
    // create instance of user
    const joe = new User({ name: 'Joe' });
    // save user to database
    joe.save() // this returns a promise
      .then(() => {
        // Has been joe been savec successfully?
        assert(!joe.isNew);
        // tell mocha to continue
        done();
      });
    // assert that user exists inside of database
  });
});