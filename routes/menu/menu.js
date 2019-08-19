const path = require('path');
const express = require('express');
const router = express.Router();
const { readJson } = require('../../util/index.js');

router.get('/getMenuData', async(req, res, next) => {
  const menuData = await readJson(path.join(__dirname, '../../res/menuData.json'));
  res.json({code: 200, data: menuData});
});

module.exports = router;