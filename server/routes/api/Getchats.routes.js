const router = require('express').Router();
const { Chat } = require('../../db/models')


router.get('/', async (req, res) => {
    try {
        console.log(req.user, 'req.token7');
        const authorizationHeader = req.headers.authorization;
        console.log(authorizationHeader, 'authorizationHeader9');
        let token;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        }
        console.log(token, 'token17')
        const chatsList = await Chat.findAll({where: {user_id: req.user.userId}})
        res.json(chatsList)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;