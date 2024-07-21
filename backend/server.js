require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comments'); // Ensure correct import

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

console.log('Routes registered'); // Ensure this line is here

const port = process.env.PORT || 5001;

app.get('/test', (req, res) => {
    res.send('Test route working');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
