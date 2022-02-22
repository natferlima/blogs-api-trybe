require('dotenv').config();
const jwt = require('jsonwebtoken');

const login = async (email, password) => {
  const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
  return token;
};

module.exports = {
  login,
};
