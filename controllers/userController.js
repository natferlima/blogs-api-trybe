const express = require('express');
const alreadyExistsEmail = require('../middlewares/alreadyExistsEmail');
const displayNameValidate = require('../middlewares/displayNameValidate');
const emailValidate = require('../middlewares/emailValidate');
const passwordValidate = require('../middlewares/passwordValidate');
const { create } = require('../services/userService');

const router = express.Router();

router
  .post('/',
  displayNameValidate, 
  passwordValidate,
  emailValidate,
  alreadyExistsEmail, async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const token = await create({ displayName, email, password, image });
    res.status(201).json({ token });
  });

module.exports = router;