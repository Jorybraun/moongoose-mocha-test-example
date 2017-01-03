const assert = require('assert');
const User = require('../src/user');


describe('Subdocuments', ()=>{
  
  function assertPosts(action, done){
    action
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitles');
        done();
      });
  }

  it('can create a subdocument', (done)=>{
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'PostTitles'}]
    });
    assertPosts(joe.save(), done);
  });

  it('can add a post subdocument', (done) => {
    const joe = new User({ 
      name: 'Joe',
      posts: []
    });
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        const { posts } = user;
        user.posts = [...posts, { title: 'PostTitles' }];
        assertPosts(user.save(), done);
      });
  });

  it('can remove an existing post subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'PostTitles'}]
    });

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        const post = user.posts[0];
        user.posts.remove(post);
        return user.save();
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });

})