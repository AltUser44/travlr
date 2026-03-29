const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

require('./app_server/models/trips');
const Trip = mongoose.model('trips');

const trips = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'app_server/data/trips.json'), 'utf8')
);

mongoose.connect('mongodb://127.0.0.1:27017/travlr')
  .then(async () => {
    console.log('MongoDB connected');
    // Remove existing trips to avoid duplicates
    await Trip.deleteMany({});
    console.log('Cleared existing trips');
    // Insert all trips from JSON
    await Trip.insertMany(trips);
    console.log(`Inserted ${trips.length} trips`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
