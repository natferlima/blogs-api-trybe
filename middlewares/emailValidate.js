module.exports = async (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (!regexEmail.test(email)) {
    return res.status(400).json({ 
      message: '"email" must be a valid email' });
  }

  next();
};