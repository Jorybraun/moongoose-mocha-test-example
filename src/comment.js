const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this is to illustrate how refs work in relationships
const CommentSchema = new Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: 'user' } 
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;