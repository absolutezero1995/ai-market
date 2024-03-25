const router = require('express').Router();
const bcrypt = require('bcrypt');
const { ChatHistory } = require('../../db/models');

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id, ' - eto delete')
        const deleteChatItem = await ChatHistory.destroy({where: {id}})
        console.log(deleteChatItem, '!!!!');
    } catch (error) {
        console.log(error);
    }
;   
});

module.exports = router;