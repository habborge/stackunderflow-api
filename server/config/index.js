require('dotenv').config('');

const config = {
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  pagination: {
    limit: 10,
    skip: 0,
    page: 1,
  },
  token: {
    secret: process.env.TOKEN_SECRET,
  },
  sort: {
    sortBy: {
      default: 'createdAt',
      fields: ['createdAt', 'updatedAt'],
    },
    direction: {
      default: 'desc',
      options: ['asc', 'desc'],
    },
  },
};

module.exports = config;
