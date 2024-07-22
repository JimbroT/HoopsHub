const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const verifyToken = require('../authMiddleware'); // Ensure this path is correct

// Test route
router.get('/test', (req, res) => {
  res.send('Comments route working');
});

// Like a comment
router.put('/like/:id', verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    comment.likes.push(req.user.id);
    await comment.save();
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
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

// Get comments for an article
router.get('/:articleUrl', async (req, res) => {
  try {
    const encodedUrl = req.params.articleUrl;
    const decodedUrl = decodeURIComponent(encodedUrl); 
    console.log('Encoded URL:', encodedUrl);
    console.log('Decoded URL:', decodedUrl);

    const query = { articleUrl: decodedUrl };
    console.log('Query:', JSON.stringify(query, null, 2));

    const comments = await Comment.find(query).exec();
    console.log('Comments found:', JSON.stringify(comments, null, 2));
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
