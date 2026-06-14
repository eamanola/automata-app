const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { middlewares, errors } = require('automata-utils');
const { router: users } = require('automata-user-management');

const { NODE_ENV } = require('../config');

const { errorHandler } = middlewares;

const appBuilder = ({
  cache,
  db,
  EMAIL_VERIFICATION_SECRET,
  origin = ['http://localhost:3000'],
  SECRET,
  morganOpts = 'tiny',
}) => {
  const app = express();

  app.use(cors({ origin }));

  app.use(express.json());

  if (NODE_ENV !== 'test' && morganOpts) { app.use(morgan(morganOpts)); }

  app.get('/health', (req, res) => { res.status(200).send('OK'); });

  app.use(users({
    cache, db, EMAIL_VERIFICATION_SECRET, SECRET,
  }));

  app.use(errorHandler(errors, { defaultTo500: true }));

  return app;
};

module.exports = appBuilder;
