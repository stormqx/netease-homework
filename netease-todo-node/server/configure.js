const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes');
const morgan = require('morgan');
const errorHandler = require('errorhandler');

module.exports = (app) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // append routes to app
  router(app);

  if('development' === app.get('env')) {
    app.use(errorHandler());
  }

  return app;
}