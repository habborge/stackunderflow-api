const Model = require('./model');
const { signToken } = require('./../auth');

const { paginationParseParams } = require.main.require('./server/utils');

exports.id = (req, res, next, id) => {
  Model.findById(id)
    .exec()
    .then((doc) => {
      if (!doc) {
        const message = `${Model.modelName} not found`;

        next({
          message,
          statusCode: 404,
          type: 'warn',
        });
      } else {
        req.doc = doc;
        next();
      }
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.all = (req, res, next) => {
  const { query } = req;
  const { limit, skip, page } = paginationParseParams(query);

  const all = Model.find()
    .limit(limit)
    .skip(skip);
  const count = Model.countDocuments();

  Promise.all([all.exec(), count.exec()])
    .then((data) => {
      const [docs, total] = data;

      const pages = Math.ceil(total / limit);

      res.json({
        success: true,
        items: docs,
        meta: {
          limit,
          skip,
          total,
          page,
          pages,
        },
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.signup = (req, res, next) => {
  const { body = {} } = req;
  const document = new Model(body);

  document
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.signin = (req, res, next) => {
  const { body = {} } = req;
  const { email = '', password = '' } = body;

  let user = {};
  Model.findOne({ email })
    .exec()
    .then((doc) => {
      if (!doc) {
        const message = 'Email or password are invalid';

        next({
          success: false,
          message,
          statusCode: 200,
          type: 'info',
        });
      }
      user = doc;
      return doc.verifyPassword(password);
    })
    .then((verified) => {
      if (!verified) {
        const message = 'Email or password are invalid';

        next({
          success: false,
          message,
          statusCode: 200,
          type: 'info',
        });
      } else {
        const { _id } = user;
        const token = signToken({ _id });

        res.json({
          success: true,
          item: user,
          meta: {
            token,
          },
        });
      }
    })
    .catch((error) => {
      next(new Error(error));
    });
};

exports.read = (req, res, next) => {
  const { doc } = req;

  res.json(doc);
};

exports.update = (req, res, next) => {
  const { doc, body = {} } = req;

  Object.assign(doc, body);

  doc
    .save()
    .then((updated) => {
      res.json(updated);
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.delete = (req, res, next) => {
  const { doc } = req;

  doc
    .remove()
    .then((removed) => {
      res.json(removed);
    })
    .catch((err) => {
      next(new Error(err));
    });
};
