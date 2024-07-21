const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const verifyToken = require('../authMiddleware'); // Ensure correct import path

// Create a comment
router.post('/', verifyToken, async (req, res) => {
  try {
    console.log('Create comment request body:', req.body); // Log request body
    if (!req.body.articleUrl || !req.body.content) {
      return res.status(400).json({ message: 'Article URL and content are required.' });
    }
    const newComment = new Comment({
      user: req.user.id,
      articleUrl: req.body.articleUrl,
      content: req.body.content,
    });
    const savedComment = await newComment.save();
    console.log('Comment saved:', savedComment); // Log saved comment
    res.json(savedComment);
  } catch (err) {
    console.error('Error creating comment:', err); // Log error
    res.status(500).json(err);
  }
});

// Get comments for an article
router.get('/:articleUrl', async (req, res) => {
  try {
    const encodedUrl = req.params.articleUrl;
    const decodedUrl = decodeURIComponent(encodedUrl);
    console.log('Get comments for article URL:', encodedUrl); // Log encoded article URL
    console.log('Decoded URL:', decodedUrl); // Log decoded URL

    const query = { articleUrl: decodedUrl };
    console.log('Query:', JSON.stringify(query, null, 2)); // Log the query object

    const comments = await Comment.find(query).exec(); // Ensure query is executed
    console.log('Comments found:', JSON.stringify(comments, null, 2)); // Log found comments
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err); // Log error
    res.status(500).json(err);
  }
});

module.exports = router;
