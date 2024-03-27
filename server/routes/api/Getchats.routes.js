const router = require('express').Router();
const { Chat } = require('../../db/models');
const verifyToken = require('../../middleware/verifyToken');
const { ChatHistory } = require('../../db/models')


router.post('/', verifyToken, async (req, res) => {
    try {
        const {category_id} = req.body;
        // console.log(category_id);
        // console.log(req.user.userId);
        const chatsList = await Chat.findAll({
            where: { user_id: req.user.userId, category_id: category_id },
            include: [{ model: ChatHistory }],
        });
        console.log(chatsList)
        res.send(chatsList);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;