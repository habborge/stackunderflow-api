const mongoose = require('mongoose');

const config = require('./config');
const logger = require('./config/logger');

exports.connect = () => {
  const { database } = config;
  const url = `mongodb://${database.url}`;

  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
    },
  );

  mongoose.connection.on('open', () => {
    logger.info('Database connected');
  });

  mongoose.connection.on('close', () => {
    logger.info('Database disconnected');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`Database connection error: ${err}`);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Database connection disconnected through app termination');
      process.exit(0);
    });
  });
};
