const express = require('express');
const alreadyExistsEmail = require('../middlewares/alreadyExistsEmail');
const displayNameValidate = require('../middlewares/displayNameValidate');
const emailValidate = require('../middlewares/emailValidate');
const notExistsToken = require('../middlewares/notExistsToken');
const passwordValidate = require('../middlewares/passwordValidate');
const tokenValidate = require('../middlewares/tokenValidate');
const { create, findAll } = require('../services/userService');

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
  })
  .get('/', notExistsToken, tokenValidate, async (req, res) => {
    const result = await findAll();
    console.log(result);
    res.status(200).json(result);
  });

module.exports = router;