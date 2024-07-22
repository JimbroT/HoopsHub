const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const User = require('../models/User');
const verifyToken = require('../authMiddleware');

// Bookmark an article
router.put('/bookmark/:url', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const articleUrl = decodeURIComponent(req.params.url);

    let article = await Article.findOne({ url: articleUrl });

    if (!article) {
      article = new Article({
        url: articleUrl,
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        source: req.body.source,
        bookmarkedBy: [] // Initialize as an empty array
      });
      await article.save();
      console.log('New article saved:', article);
    } else {
      console.log('Article already exists:', article);
    }

    const user = await User.findById(userId);

    if (!user.bookmarkedArticles) {
      user.bookmarkedArticles = [];
    }

    const isBookmarkedByUser = article.bookmarkedBy.includes(userId);

    if (isBookmarkedByUser) {
      await user.updateOne({ $pull: { bookmarkedArticles: article._id } });
      await article.updateOne({ $pull: { bookmarkedBy: userId } });
      res.json('Article has been unbookmarked');
    } else {
      await user.updateOne({ $push: { bookmarkedArticles: article._id } });
      await article.updateOne({ $push: { bookmarkedBy: userId } });
      res.json('Article has been bookmarked');
    }
  } catch (err) {
    console.error('Error processing bookmark:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// Get bookmarked articles for a user
router.get('/bookmarked', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('bookmarkedArticles');
    res.json(user.bookmarkedArticles);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
