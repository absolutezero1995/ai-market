// const router = require('express').Router();

// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     console.log(id, ' - eto delete');
// });

// module.exports = router;

const router = require('express').Router();
const { ChatHistory } = require('../../db/models');

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id, ' - eto delete!!!!!!!!!!!!')
        await ChatHistory.destroy({where: {id}})
        // console.log(deleteChatItem, '!!!!');
    } catch (error) {
        console.log(error);
    }
;   
});

module.exports = router;