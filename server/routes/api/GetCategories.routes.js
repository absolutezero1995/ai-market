const router = require('express').Router();
const { Category } = require('../../db/models');
const verifyToken = require('../../middleware/verifyToken');


router.get('/', verifyToken, async (req, res) => {
    try {
        // console.log(req.user, 'req.token7');
        const authorizationHeader = req.headers.authorization;
        // console.log(authorizationHeader, 'authorizationHeader9');
        let token;
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1];
        }
        // console.log(token, 'token17')

        const categoryList = await Category.findAll();
        res.json(categoryList);
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;