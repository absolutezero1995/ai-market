const express = require('express');
const Conversation = require('./api/Conversation.routes'); // Указываем расширение .js для явного импорта файла
const authAPIRouter = require('./api/auth.routes');

const router = express.Router();

router.use('/conversation', Conversation);
router.use('/api/auth', authAPIRouter);

module.exports = router;
