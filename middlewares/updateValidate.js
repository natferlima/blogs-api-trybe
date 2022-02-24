module.exports = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  console.log('categoyIds', categoryIds);
  console.log(' ');
  if (categoryIds) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  }
    
  next();
};