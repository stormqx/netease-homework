const express = require('express');
const config = require('./configure');
const resolve = require('path').resolve;
const app = express();

config(app, {
  outputPath: resolve(process.cwd(), 'app'),
  publicPath: '/',
});

const port =  process.env.PORT || 8081;
const host =  process.env.HOST || 'localhost';

app.listen(port, host, (err) => {
  if(err) {
    return console.error(err.message);
  }
  console.log('Server started ! http://' + host + ':' + port);
});