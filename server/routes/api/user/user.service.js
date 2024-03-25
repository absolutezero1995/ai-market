const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { verify, sign } = require('jsonwebtoken');
const { User, RefreshToken } = require('../../../db/models');

const {
    USER_NOT_FOUND,
    INVALID_PASSWORD,
    EMAIL_ALREADY_EXIST,
} = require('./user.constants');

exports.createUser = async ({ email, password, name }) => {
    const hashedPassword = await bcrypt.hash(password, 8);
    const activationLink = uuid.v4();

    const oldUser = await User.findOne({
        where: {
            email,
        },
    });

    if (oldUser) {
        throw new Error(EMAIL_ALREADY_EXIST);
    }

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        is_activated: false,
        activation_link: activationLink,
    });
    return newUser;
};

exports.authenticateUser = async ({ email, password }) => {
    const user = await User.findOne({
        where: { email },
    });

    if (!user) {
        throw new Error(USER_NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error(INVALID_PASSWORD);
    }

    return user;
};

exports.verifyAndDeleteRefreshToken = async (refreshToken) => {
    const decoded = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // console.log('******************decoded: ', decoded); //!!!

    const storedToken = await RefreshToken.findOne({
        where: { token: refreshToken },
    });
    // console.log('******************storedToken: ', storedToken); //!!!

    if (!storedToken || storedToken.expiryDate < new Date()) {
        throw new Error('Invalid or expired refresh token');
    }

    await RefreshToken.destroy({
        where: {
            token: refreshToken,
        },
    });

    return decoded.userId;
};

exports.createRefreshToken = async (userId) => {
    const refreshToken = sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });
    const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 дней
    // console.log('createRefreshToken**************userId: ', userId); // !!!
    // console.log('createRefreshToken**************refreshToken: ', refreshToken);

    await RefreshToken.create({
        token: refreshToken,
        user_id: userId,
        expiryDate,
    });

    return refreshToken;
};

exports.deleteRefreshToken = async (token) => {
    await RefreshToken.destroy({
        where: { token },
    });
};

exports.verifyRefreshToken = async (token) => {
    const refreshToken = await RefreshToken.findOne({
        where: { token },
    });

    if (!refreshToken || refreshToken.expiryDate < new Date()) {
        throw new Error('Invalid or expired refresh token');
    }

    return verify(token, process.env.REFRESH_TOKEN_SECRET);
};

exports.generateTokens = async (userId) => {
    const accessToken = sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });
    // Создание и сохранение refresh токена
    const refreshToken = await this.createRefreshToken(userId);
    return { accessToken, refreshToken };
};

exports.activate = async (activationLink) => {
    try {
        const user = await User.findOne({
            where: {
                activation_link: activationLink,
            },
        });

        if (!user) {
            throw new Error('Неккоректная ссылка активации');
        }
        user.is_activated = true;
        user.activation_link = '';
        await user.save();
    } catch (error) {
        console.log(error);
    }
};