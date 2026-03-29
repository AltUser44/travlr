const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');
const travelController = require('../controllers/travel');

// Home page route
router.get('/', mainController.index);

// Travel page route
router.get('/travel', travelController.list);

module.exports = router;
