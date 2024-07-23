require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comments');
const articleRoutes = require('./routes/articles');

const app = express();
app.use(cors());
app.use(express.json());

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/comments', (req, res, next) => {
  console.log('Request to /api/comments received');
  next();
}, commentRoutes);
app.use('/api/articles', (req, res, next) => {
  console.log('Request to /api/articles received');
  next();
}, articleRoutes);

console.log('Routes registered');

const port = process.env.PORT || 5001;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/test', (req, res) => {
  res.send('Test route working');
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
