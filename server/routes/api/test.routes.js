const router = require('express').Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
    //     const selectedCategory= await Category.findOne({id})
    //     const selectedChat = await Chat.findOne({selectedCategory})
        const chats = [{chat: "0"}, {chat: "1"}, {chat: "2"}, {chat: "3"}]
        console.log(id);
        res.send(chats)
    } catch (error) {
        res.json({error})
    }
});


module.exports = router;