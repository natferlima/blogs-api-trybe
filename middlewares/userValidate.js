require('dotenv').config();
const jwt = require('jsonwebtoken');
const { findById } = require('../services/postService');
const { findOne } = require('../services/userService');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const idPost = req.params.id;
  console.log('id do post', idPost);
  const { email } = jwt.verify(authorization, process.env.JWT_SECRET);
  console.log(email);
  const { id } = await findOne(email);
  console.log('id do usuario', id);
  const { userId } = await findById(idPost);
  console.log('userId', userId);
  if (id !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  
  next();
};