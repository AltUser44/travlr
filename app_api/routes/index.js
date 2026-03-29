const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const { authenticateJwt } = require('../middleware/authjwt');

/* POST /api/register - create a new admin account */
router.post('/register', authController.register);

/* POST /api/login - authenticate and receive a JWT */
router.post('/login', authController.login);

/* GET /api/trips - list all trips (public) */
router.get('/trips', tripsController.tripsList);

/* GET /api/trips/:tripCode - get a single trip (public) */
router.get('/trips/:tripCode', tripsController.tripsGetTrip);

/* POST /api/trips - add a new trip (protected) */
router.post('/trips', authenticateJwt, tripsController.tripsAddTrip);

/* PUT /api/trips/:tripCode - update a trip (protected) */
router.put('/trips/:tripCode', authenticateJwt, tripsController.tripsUpdateTrip);

/* DELETE /api/trips/:tripCode - delete a trip (protected) */
router.delete('/trips/:tripCode', authenticateJwt, tripsController.tripsDeleteTrip);

module.exports = router;
