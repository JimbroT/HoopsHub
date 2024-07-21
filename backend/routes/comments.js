const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const verifyToken = require('../authMiddleware'); // Ensure this path is correct

// Test route
router.get('/test', (req, res) => {
  res.send('Comments route working');
});

// Create a comment
router.post('/', verifyToken, async (req, res) => {
  console.log('POST /api/comments hit');
  try {
    console.log('Create comment request body:', req.body);
    if (!req.body.articleUrl || !req.body.content) {
      return res.status(400).json({ message: 'Article URL and content are required.' });
    }
    const newComment = new Comment({
      user: req.user.id,
      articleUrl: req.body.articleUrl,
      content: req.body.content,
    });
    const savedComment = await newComment.save();
    console.log('Comment saved:', savedComment);
    res.json(savedComment);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
