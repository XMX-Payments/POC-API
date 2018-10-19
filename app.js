const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const mapRoutes = require('express-routes-mapper');
const config = require('./config/index');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// allow cross-origin requests
app.use(cors());

app.use('/public', mapRoutes(config.publicRoutes, './controllers/'));
app.use('/private', mapRoutes(config.privateRoutes, './controllers/'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: 500})
});


module.exports = app;
