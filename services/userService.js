require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const create = async ({ displayName, email, password, image }) => {
  const result = await User.create({ displayName, email, password, image });
  const token = jwt.sign(result.dataValues, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
  return token;
};

const findOne = async (email) => {
  const result = await User.findOne({ where: { email } });
  return result;
};

const findAll = async () => {
  const result = await User.findAll();
  return result;
};

const findById = async (id) => {
  const result = await User.findByPk(id);
  return result;
};

const remove = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  create,
  findOne,
  findAll,
  findById,
  remove,
};
