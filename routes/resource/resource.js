const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const { readJson } = require('../../util/index.js');

router.get('/code/:index', async(req, res, next) => {
  const jsStr = fs.readFileSync(path.resolve(__dirname, `../../res/code${req.params.index}.js`));
  res.json({code: 200, data: jsStr.toString()});
});

router.get('/json/:name', async(req, res) => {
  const menuData = await readJson(path.resolve(__dirname, `../../res/${req.params.name}.json`));
  res.json({code: 200, data: menuData});
});

module.exports = router;