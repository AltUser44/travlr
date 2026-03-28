const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');
const travelController = require('../controllers/travel');
const tripsController = require('../controllers/trips');

// Home page route
router.get('/', mainController.index);

// Travel page route
router.get('/travel', travelController.list);

// API route
router.get('/trips', tripsController.tripsList);

module.exports = router;
