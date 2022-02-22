const express = require('express');
const emailValidate = require('../middlewares/emailValidate');
const notExistsEmail = require('../middlewares/notExistsEmail');
const passwordValidate = require('../middlewares/passwordValidate');
const { login } = require('../services/loginServices');

const router = express.Router();

router
  .post('/', emailValidate,
    passwordValidate,
    notExistsEmail, async (req, res) => {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.status(200).json({ token });
  });

module.exports = router;