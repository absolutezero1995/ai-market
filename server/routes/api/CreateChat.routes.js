const router = require('express').Router();
const { Chat, ChatHistory } = require('../../db/models');
const verifyToken = require('../../middleware/verifyToken');


router.post('/', verifyToken, async (req, res) => {
    try {
        const { category_id, title } = req.body;
        const newChat = await Chat.create({ user_id: req.user.userId, category_id, title }); // Создание чата в базе данных
        const chat = await Chat.findAll({
            where: { id: newChat.id},
            include: [{ model: ChatHistory }],
        });
        res.status(200).send(chat); // Отправка данных нового чата в ответе
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;