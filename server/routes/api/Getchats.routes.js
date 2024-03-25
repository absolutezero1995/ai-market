const router = require('express').Router();
const { Chat } = require('../../db/models')


router.get('/', async (req, res) => {
    try {
        const user_id = req.session.userId;
        console.log(user_id, '!!!!!!!!!!!!');
        const chatsList = await Chat.findAll({where: {user_id: 2}})
        res.json(chatsList)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;