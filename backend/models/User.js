const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  bookmarkedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
});

module.exports = mongoose.model('User', UserSchema);
