const express = require('express');
const Conversation = require('./api/Conversation.routes'); // Указываем расширение .js для явного импорта файла

const userRoutes = require('./api/user/user.routes');

const router = express.Router();

router.use('/api/conversation', Conversation);

router.use('/api/users', userRoutes);

module.exports = router;
