const { findById } = require('../services/categoryService');

module.exports = async (req, res, next) => {
  const { categoryIds } = req.body;
  let categoryNotExist = false;
  await Promise.all(categoryIds.map(async (element) => {
    const category = await findById(element);
    if (!category) {
      categoryNotExist = true;
    }
  }));
  if (categoryNotExist) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  
  next();
};