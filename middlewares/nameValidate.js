module.exports = async (req, res, next) => {
  const { name } = req.body;
  console.log(name);
  if (name === undefined || name === '' || !name) {
    return res.status(400).json({ message: '"name" is required' });
  }
    
  next();
};