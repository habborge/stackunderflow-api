const { sign, verify } = require('jsonwebtoken');

const config = require.main.require('./server/config');

const signToken = (payload, expiresIn = '1h') => sign(payload, config.token.secret, {
  algorithm: 'HS256',
  expiresIn,
});

const auth = (req, res, next) => {
  const token = req.headers.authorization || req.query.token || req.body.token;
  if (!token) {
    const message = 'Unauthorized';

    next({
      success: false,
      message,
      statusCode: 401,
      type: 'info',
    });
  } else {
    verify(token, config.token.secret, (err, decoded) => {
      if (err) {
        const message = 'Unauthorized';

        next({
          success: false,
          message,
          statusCode: 401,
          type: 'info',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = {
  signToken,
  auth,
};
