const express = require('express');

const router = express.Router();

const userController = require('./user.controller');
const { registerUserDto, loginUserDto } = require('./user.request.dto');

router.post('/register', registerUserDto, userController.register);
router.post('/login', loginUserDto, userController.login);
router.post('/refresh-token', userController.refreshToken);
router.get('/activate/:link', userController.activate);

module.exports = router;