const http = require('http');

/* GET travel list page - fetches trips from the API */
const list = (req, res) => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/trips',
    method: 'GET'
  };

  const apiReq = http.request(options, (apiRes) => {
    let body = '';
    apiRes.on('data', (chunk) => { body += chunk; });
    apiRes.on('end', () => {
      const trips = JSON.parse(body);
      res.render('travel', {
        title: 'Travlr Getaways - Travel',
        trips
      });
    });
  });

  apiReq.on('error', (err) => {
    res.status(500).send(err.message);
  });

  apiReq.end();
};

module.exports = {
  list
};
