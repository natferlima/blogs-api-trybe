require('dotenv').config();
const jwt = require('jsonwebtoken');
const { findById } = require('../services/postService');
const { findOne } = require('../services/userService');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const idPost = req.params.id;
  const { email } = jwt.verify(authorization, process.env.JWT_SECRET);
  const { id } = await findOne(email);
  const { userId } = await findById(idPost);
  if (id !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  
  next();
};