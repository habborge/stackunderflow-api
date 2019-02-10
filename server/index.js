const express = require('express');
const bodyParser = require('body-parser');
const addRequestId = require('express-request-id')();
const cors = require('cors');

const logger = require('./config/logger');
const api = require('./api/v1');
const database = require('./database');

// Connect to database
database.connect();

// Init Express app
const app = express();

// setup CORS
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  }),
);

// setup middleware
app.use(addRequestId);
app.use(logger.requests);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Setup router and routes
app.use('/api', api);
app.use('/api/v1', api);

// No route found handler
app.use((req, res, next) => {
  const message = 'Route not found';
  const statusCode = 404;

  next({
    message,
    statusCode,
    type: 'info',
  });
});

// Error handler
app.use((err, req, res, next) => {
  const { message, type = 'error' } = err;
  let { statusCode = 500 } = err;
  const log = `${logger.header(req)} ${statusCode} ${message}`;

  // Validation Errors
  if (err.message.startsWith('ValidationError')) {
    statusCode = 422;
  }

  logger[type](log);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
