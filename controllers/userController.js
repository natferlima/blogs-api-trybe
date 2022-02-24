require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const alreadyExistsEmail = require('../middlewares/alreadyExistsEmail');
const displayNameValidate = require('../middlewares/displayNameValidate');
const emailValidate = require('../middlewares/emailValidate');
const notExistsToken = require('../middlewares/notExistsToken');
const passwordValidate = require('../middlewares/passwordValidate');
const tokenValidate = require('../middlewares/tokenValidate');
const { create, findAll, findById, findOne, remove } = require('../services/userService');

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
    res.status(200).json(result);
  })
  .get('/:id', notExistsToken, tokenValidate, async (req, res) => {
    const { id } = req.params;
    const result = await findById(id);
    if (!result) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(result);
  })
  .delete('/me', notExistsToken, tokenValidate, async (req, res) => {
    const { authorization } = req.headers;
    const { email } = jwt.verify(authorization, process.env.JWT_SECRET);
    const { id } = await findOne(email);
    await remove(id);
    res.status(204).end();
  });

module.exports = router;