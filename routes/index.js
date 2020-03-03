"use strict";

const express = require('express');
const router = express.Router();
const shortenerController = require(__dirname + '/../controllers/shortenerController.js');

router.get('/index',  shortenerController.index.bind(shortenerController));
router.post('/registerURL', shortenerController.registerUrl.bind(shortenerController));


module.exports = router;