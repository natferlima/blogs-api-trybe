const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const categoryIdValidate = require('../middlewares/categoryIdValidate');
const notExistsToken = require('../middlewares/notExistsToken');
const postValidate = require('../middlewares/postValidate');
const tokenValidate = require('../middlewares/tokenValidate');

const { create, findAll } = require('../services/postService');

const router = express.Router();

router
  .post('/', 
    notExistsToken,
    tokenValidate,
    postValidate,
    categoryIdValidate, async (req, res) => {
    const { authorization } = req.headers;
    const { title, content } = req.body;
    const { email } = jwt.verify(authorization, process.env.JWT_SECRET);
    const result = await create(title, content, email);
    res.status(201).json(result);
  })
  .get('/', notExistsToken, tokenValidate, async (req, res) => {
    const result = await findAll();
    console.log(result);
    res.status(200).json(result);
  });

module.exports = router;