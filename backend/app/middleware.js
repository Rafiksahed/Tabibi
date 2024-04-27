// middleware.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

module.exports = app;
