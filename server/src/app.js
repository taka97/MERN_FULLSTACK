const createError = require('http-errors');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const compression = require('compression');
const { urlencoded, json } = require('body-parser');

const configDB = require('./mongoose');
const apiRouter = require('./routes');

configDB();

const app = express();

app.use(helmet());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json({ limit: '1mb' }));
app.use(compression());

// api docs
app.use('/api', apiRouter);

// error handling
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
