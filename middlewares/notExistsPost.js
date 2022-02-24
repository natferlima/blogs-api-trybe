const { findById } = require('../services/postService');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const result = await findById(id);
  if (!result) {
    return res.status(404).json({ message: 'Post does not exist' });
  } 

  next();
};