const router = require('express').Router();
const { ChatHistory } = require('../../db/models')

router.get('/:id', async (req, res) => {
    try {
        const chatHistory = await ChatHistory.findAll({where: {chat_id: req.params.id}})
        res.send(chatHistory);
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;