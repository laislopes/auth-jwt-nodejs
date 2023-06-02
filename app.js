const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { authStrategies } = require('./src/users');

app.use(
  express.json(),
  bodyParser.urlencoded({
    extended: true
  })
);

module.exports = app;
