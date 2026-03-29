const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

/* GET /api/trips - list all trips */
router.get('/trips', tripsController.tripsList);

/* GET /api/trips/:tripCode - get a single trip */
router.get('/trips/:tripCode', tripsController.tripsGetTrip);

/* POST /api/trips - add a new trip */
router.post('/trips', tripsController.tripsAddTrip);

/* PUT /api/trips/:tripCode - update a trip */
router.put('/trips/:tripCode', tripsController.tripsUpdateTrip);

/* DELETE /api/trips/:tripCode - delete a trip */
router.delete('/trips/:tripCode', tripsController.tripsDeleteTrip);

module.exports = router;
