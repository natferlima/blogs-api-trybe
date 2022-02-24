const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const categoryIdValidate = require('../middlewares/categoryIdValidate');
const notExistsPost = require('../middlewares/notExistsPost');
const notExistsToken = require('../middlewares/notExistsToken');
const postValidate = require('../middlewares/postValidate');
const tokenValidate = require('../middlewares/tokenValidate');
const updateValidate = require('../middlewares/updateValidate');
const userValidate = require('../middlewares/userValidate');

const { create, findAll, findById, update, remove } = require('../services/postService');

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
    res.status(200).json(result);
  })
  .get('/:id', notExistsToken, tokenValidate, notExistsPost, async (req, res) => {
    const { id } = req.params;
    const result = await findById(id);
    return res.status(200).json(result);
  })
  .put('/:id', notExistsToken, tokenValidate, updateValidate, userValidate, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await update(id, title, content);
    res.status(200).json(result);
  })
  .delete('/:id', notExistsToken, tokenValidate, notExistsPost, userValidate, async (req, res) => {
    const { id } = req.params;
    await remove(id);
    res.status(204).end();
  });

module.exports = router;