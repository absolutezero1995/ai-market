const express = require('express');
// const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const sessionConfig = require('./sessionConfig');
const errorHandler = require('../middleware/errorHandler');
const verifyToken = require('../middleware/verifyToken');

const corsOption = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};

const serverConfig = (app) => {
  app.use(cors(corsOption));
  app.use(cookieParser());
  // app.use(session(sessionConfig));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static('public'));
  app.use(verifyToken);
  app.use(errorHandler);
};

module.exports = serverConfig;
