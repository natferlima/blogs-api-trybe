const jwt = require('jsonwebtoken');
const { User } = require('../models');

const create = async ({ displayName, email, password, image }) => {
  const result = await User.create({ displayName, email, password, image });
  const token = jwt.sign(result.dataValues, 'SEGREDO', {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
  return token;
};

const findOne = async (email) => {
  const result = await User.findOne({ where: { email } });
  return result;
};

module.exports = {
  create,
  findOne,
};
