const router = require('express').Router();
const verifyToken = require('../../middleware/verifyToken');
const { Chat, ChatSetting } = require('../../db/models');

router.post('/', verifyToken, async (req, res) => {
    try {
        const {selectedCategory, chatData} = req.body;
        const user_id = req.user.userId;

        const chat = await Chat.create({user_id, category_id: selectedCategory, title: chatData.title});
        console.log(chat);
        if(chat){
            await ChatSetting.create({chat_id: chat.id, role: chatData.role, version: chatData.version, temperature: Number(chatData.temperature)})
        }
    } catch (error) {
        console.log(error);
    }
;   
});

module.exports = router;