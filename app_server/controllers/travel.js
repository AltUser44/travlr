const fs = require('fs');
const path = require('path');

const tripsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/trips.json'), 'utf8')
);

/* GET travel list page */
const list = (req, res) => {
  res.render('travel', {
    title: 'Travlr Getaways - Travel',
    trips: tripsData
  });
};

module.exports = {
  list
};
