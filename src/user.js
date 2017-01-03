const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name should be longer than 2 characters',
    }
  },
  // embeded subdocuments example
  posts: [PostSchema],
  likes: Number,
  // association to document
  blogPosts: [{ type: Schema.Types.ObjectId, ref: 'blogPost' }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');
  // this === joe
  BlogPost.remove({ _id: { $in: this.blogPosts } })
  .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;