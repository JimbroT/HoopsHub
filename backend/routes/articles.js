const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const User = require('../models/User');
const { verifyToken } = require('../authMiddleware');

// Like an article
router.put('/like/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const articleId = req.params.id;

    const user = await User.findById(userId);
    if (!user.likedArticles.includes(articleId)) {
      await user.updateOne({ $push: { likedArticles: articleId } });
      res.json('Article has been liked');
    } else {
      res.json('You already liked this article');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Bookmark an article
router.put('/bookmark/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const articleId = req.params.id;

    const user = await User.findById(userId);
    if (!user.bookmarkedArticles.includes(articleId)) {
      await user.updateOne({ $push: { bookmarkedArticles: articleId } });
      res.json('Article has been bookmarked');
    } else {
      res.json('You already bookmarked this article');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get liked articles
router.get('/liked', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('likedArticles');
    res.json(user.likedArticles);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get bookmarked articles
router.get('/bookmarked', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('bookmarkedArticles');
    res.json(user.bookmarkedArticles);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
