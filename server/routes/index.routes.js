const express = require('express');
const Conversation = require('./api/Conversation.routes'); // Указываем расширение .js для явного импорта файла

const SignInRoute = require('./api/Signin.routes');
const SignUpRoute = require('./api/Signup.routes');
const LogOutRoute = require('./api/Logout.routes');

const router = express.Router();

router.use('/api/conversation', Conversation);

router.use('/api/signin', SignInRoute);
router.use('/api/signup', SignUpRoute);
router.use('/api/logout', LogOutRoute);

module.exports = router;
