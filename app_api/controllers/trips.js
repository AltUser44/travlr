const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

/* GET: /api/trips - returns all trips */
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    if (!trips.length) {
      return res.status(404).json({ message: 'No trips found' });
    }
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json(err);
  }
};

/* GET: /api/trips/:tripCode - returns a single trip by code */
const tripsGetTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode }).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { tripsList, tripsGetTrip };
