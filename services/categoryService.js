const { Category } = require('../models');

const create = async (name) => {
  const result = await Category.create({ name });
  return result;
};

const findAll = async () => {
  const result = await Category.findAll();
  return result;
};

const findById = async (id) => {
  const result = await Category.findByPk(id);
  return result;
};

module.exports = {
  create,
  findAll,
  findById,
};
