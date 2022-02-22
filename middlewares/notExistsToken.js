require('dotenv').config();

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === undefined || authorization === '' || !authorization) {
   return res.status(401).json({ message: 'Token not found' });
  }
  next();
};