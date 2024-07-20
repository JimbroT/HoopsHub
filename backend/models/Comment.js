const mongoose = require('mongoose');

// Define the Comment schema
const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the User model
    ref: 'User',  // Refers to the User model
    required: true,
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the Article model
    ref: 'Article',  // Refers to the Article model
    required: true,
  },
  content: {
    type: String,
    required: true,  // The content of the comment
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,  // References to users who liked the comment
      ref: 'User',
    },
  ],
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,  // References to replies (which are also comments)
      ref: 'Comment',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,  // Timestamp for when the comment was created
  },
});

// Export the Comment model based on the schema
module.exports = mongoose.model('Comment', CommentSchema);
