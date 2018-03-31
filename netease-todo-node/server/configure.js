const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
const express = require('express');
const compression = require('compression');
const router = require('./routes');
const connector = require('./db/connector');

module.exports = (app, options) => {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'app');

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Enable CORS from client-side
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());

  // Serving statics
  app.use(publicPath, express.static(outputPath));

  // append routes to app
  router(app);

  // entry point
  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));

  // connect db
  connector.connectDB();

  if('development' === app.get('env')) {
    app.use(errorHandler());
  }

  return app;
}