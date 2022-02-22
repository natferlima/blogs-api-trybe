const { findOne } = require('../services/userService');

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const alreadyExistsEmail = await findOne(email);
  if (!alreadyExistsEmail) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  next();
};