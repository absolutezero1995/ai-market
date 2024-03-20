const express = require("express");
const Conversation = require("./api/Conversation.routes.js"); // Указываем расширение .js для явного импорта файла

const router = express.Router();

router.use('/api/conversation', Conversation);

module.exports = router;