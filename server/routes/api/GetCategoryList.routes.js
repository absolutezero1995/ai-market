const router = require('express').Router();
const { Chat } = require('../../db/models');
const verifyToken = require('../../middleware/verifyToken');


router.get('/:categoryId', verifyToken, async (req, res) => {
    try {
        const { categoryId } = req.params;
        // console.log(categoryId, 'category_id 9')
        const categoryList = await Chat.findAll({ where: { user_id: req.user.userId, category_id: categoryId } });
        // console.log(categoryList, '!!!!!!!!!!!!!!!!!');
        res.send(categoryList);
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;