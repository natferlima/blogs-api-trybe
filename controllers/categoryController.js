const express = require('express');
const nameValidate = require('../middlewares/nameValidate');
const notExistsToken = require('../middlewares/notExistsToken');
const tokenValidate = require('../middlewares/tokenValidate');

const { create } = require('../services/categoryService');

const router = express.Router();

router
  .post('/', notExistsToken, tokenValidate, nameValidate, async (req, res) => {
    const { name } = req.body;
    const result = await create(name);
    console.log(result.dataValues);
    res.status(201).json(result.dataValues);
  });

module.exports = router;