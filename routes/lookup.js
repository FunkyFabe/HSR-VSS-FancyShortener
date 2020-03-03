"use strict";

const express = require('express');
const router = express.Router();
const lookupController = require(__dirname + '/../controllers/lookupController.js');

router.get('/',  lookupController.index.bind(lookupController));
router.get(RegExp("/.+"),  lookupController.lookupShortUrl.bind(lookupController));

module.exports = router;