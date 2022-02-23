const { findOne } = require('./userService');
const { BlogPost } = require('../models');

require('dotenv').config();

const create = async (title, content, email) => {
  const data = new Date();
  const { id } = await findOne(email); // encontra o id do usuário através do email
  const result = await BlogPost.create({
    title,
    content,
    userId: id,
    published: data.toString(),
    updated: data.toString(),
  });
  return result;
};

module.exports = {
  create,

};