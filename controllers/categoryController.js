const express = require('express');
const nameValidate = require('../middlewares/nameValidate');
const notExistsToken = require('../middlewares/notExistsToken');
const tokenValidate = require('../middlewares/tokenValidate');

const { create, findAll } = require('../services/categoryService');

const router = express.Router();

router
  .post('/', notExistsToken, tokenValidate, nameValidate, async (req, res) => {
    const { name } = req.body;
    const result = await create(name);
    res.status(201).json(result.dataValues);
  })
  .get('/', notExistsToken, tokenValidate, async (req, res) => {
    const result = await findAll();
    res.status(200).json(result);
  });

module.exports = router;