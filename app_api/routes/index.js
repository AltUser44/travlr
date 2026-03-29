const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

/* GET /api/trips - list all trips */
router.get('/trips', tripsController.tripsList);

/* GET /api/trips/:tripCode - get a single trip */
router.get('/trips/:tripCode', tripsController.tripsGetTrip);

module.exports = router;
