const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { verifyToken } = require('../middleware/auth');

// Create a comment
router.post('/', verifyToken, async (req, res) => {
  try {
    const newComment = new Comment({
      user: req.user.id,
      article: req.body.article,
      content: req.body.content,
    });
    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get comments for an article
router.get('/:articleId', async (req, res) => {
  try {
    const comments = await Comment.find({ article: req.params.articleId })
      .populate('user', 'username')  // Populate the user field with the username
      .populate({
        path: 'replies',
        populate: { path: 'user', select: 'username' },
      });
    res.json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a comment
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a comment
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json('Comment deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Like a comment
router.put('/like/:id', verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment.likes.includes(req.user.id)) {
      await comment.updateOne({ $push: { likes: req.user.id } });
      res.json('The comment has been liked');
    } else {
      res.json('You already liked this comment');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Reply to a comment
router.post('/reply/:id', verifyToken, async (req, res) => {
  try {
    const newComment = new Comment({
      user: req.user.id,
      article: req.body.article,
      content: req.body.content,
      replies: [],
    });
    const savedComment = await newComment.save();
    await Comment.findByIdAndUpdate(req.params.id, {
      $push: { replies: savedComment._id },
    });
    res.json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
