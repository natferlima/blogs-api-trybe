require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    jwt.verify(authorization, process.env.JWT_SECRET);
  } catch (_e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};