const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/travlr')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

require('./app_server/models/trips');

const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');

const app = express();
const port = 3000;

// Set up Handlebars as the view engine
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Enable CORS for the Angular SPA
app.use(cors());

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Register application routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

