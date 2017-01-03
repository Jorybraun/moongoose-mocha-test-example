const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');
const assert = require('assert');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe'});
    blogPost = new BlogPost({ title: 'JS is great', content: '... yep it is'});
    comment = new Comment({ content: 'Congrats on the baby' });

    joe.blogPosts = [...joe.blogPosts, blogPost];
    blogPost.comments = [...blogPost.comments, comment];
    comment.user = joe;
    // OOOH SHITT!!!
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      // populate takes a reference to the association
      .populate('blogPosts') // populate querys the relationship between the collection
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is great');
        done();
      });
  });

  it('saves a full relations graph', (done) => {
    User.findOne({name: 'Joe'})
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on the baby');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      })
  })

})
