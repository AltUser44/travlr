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

/* POST: /api/trips - add a new trip */
const tripsAddTrip = async (req, res) => {
  try {
    const trip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });
    return res.status(201).json(trip);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/* PUT: /api/trips/:tripCode - update an existing trip */
const tripsUpdateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true }  // Return the updated document
    ).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    return res.status(200).json(trip);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/* DELETE: /api/trips/:tripCode - remove a trip */
const tripsDeleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ code: req.params.tripCode }).exec();
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    return res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { tripsList, tripsGetTrip, tripsAddTrip, tripsUpdateTrip, tripsDeleteTrip };
