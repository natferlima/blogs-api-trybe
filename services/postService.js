const { findOne } = require('./userService');
const { BlogPost } = require('../models');
const { User } = require('../models');
const { Category } = require('../models');

require('dotenv').config();

const create = async (title, content, email) => {
  const { id } = await findOne(email); // encontra o id do usuário através do email
  const result = await BlogPost.create({
    title,
    content,
    userId: id,
    published: new Date(),
    updated: new Date(),
  });
  return result;
};

const findAll = async () => {
  const result = await BlogPost.findAll({ 
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ], 
  });
  return result;
};

module.exports = {
  create,
  findAll,

};