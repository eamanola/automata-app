const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { middlewares, errors } = require('automata-utils');
const { router: users } = require('automata-user-management');

const { NODE_ENV } = require('../config');

const { errorHandler } = middlewares;

const appBuilder = ({ db, origin = ['http://localhost:3000'] }) => {
  const app = express();

  app.use(cors({ origin }));

  app.use(express.json());

  if (NODE_ENV !== 'test') { app.use(morgan('tiny')); }

  app.get('/health', (req, res) => { res.status(200).send('OK'); });

  app.use(users({ db }));

  app.use(errorHandler(errors, { defaultTo500: true }));

  return app;
};

module.exports = appBuilder;
