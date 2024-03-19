const session = require('express-session');
const FileStore = require('session-file-store')(session);

const FileStoreInstance = new FileStore();

const sessionConfig = {
  store: FileStoreInstance,
  name: 'user_sid',
  secret: process.env.SESSION_SECRET || 'test',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

module.exports = sessionConfig;
