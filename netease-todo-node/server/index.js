const express = require('express');
const config = require('./configure');

const app = express();

config(app);

const port =  process.env.PORT || 3000;
const host =  process.env.HOST || 'localhost';


app.listen(port, host, (err) => {
  if(err) {
    return console.error(err.message);
  }
  console.log('Server started ! http://' + host + ':' + port);
});