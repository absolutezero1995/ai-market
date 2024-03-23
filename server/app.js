const express = require('express');
const config = require('./config/serverConfig');
const IndexRoute = require('./routes/index.routes');

const runCleanupJob = require('./schedulers/tokenCleanup');

const app = express();

config(app);

const PORT = 3000;

app.use('/', IndexRoute);

runCleanupJob();

app.listen(PORT, () => {
  console.log('Сервер запущен на порту:', PORT);
});
