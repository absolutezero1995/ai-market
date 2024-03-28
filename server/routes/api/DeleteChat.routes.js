const router = require('express').Router();
const { Chat } = require('../../db/models');
const verifyToken = require('../../middleware/verifyToken');


router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Chat.destroy({where: {id}});
        res.sendStatus(204);
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;