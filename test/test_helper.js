const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

// a hook is a function that gets executed before any function gets executed inside of our test suite
// mocha uses done 
beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});