const express = require('express');
const Conversation = require('./api/Conversation.routes'); // Указываем расширение .js для явного импорта файла

const SignInRoute = require('./api/Signin.routes');
const SignUpRoute = require('./api/Signup.routes');
const LogOutRoute = require('./api/Logout.routes');

const userRoutes = require('./api/user/user.routes');

const GetHistoryChatRoute = require('./api/GetHistoryChat.routes.js')
const GetCategories = require('./api/GetCategories.routes.js')
const GetChatsRoute = require('./api/Getchats.routes.js')
const saveMessage = require('./api/saveMessage.routes')
const deleteMessage = require('./api/deleteMessage.routes.js')

const router = express.Router();

router.use('/api/conversation', Conversation);

router.use('/api/signin', SignInRoute);
router.use('/api/signup', SignUpRoute);
router.use('/api/logout', LogOutRoute);

router.use('/api/users', userRoutes);

router.use('/api/getcategories', GetCategories)
router.use('/api/getchats', GetChatsRoute)
router.use('/api/saveMessage', saveMessage)
router.use('/api/deleteMessage', deleteMessage)
router.use('/api/gethistorychat', GetHistoryChatRoute)

module.exports = router;
