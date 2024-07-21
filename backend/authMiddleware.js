const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  console.log('Authorization Header:', req.header('Authorization'));
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', verified);
    req.user = verified;
    next();
  } catch (err) {
    console.error('Token Verification Error:', err);
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = verifyToken;
