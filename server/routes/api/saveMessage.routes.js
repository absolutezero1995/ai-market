const router = require('express').Router();
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { message, content } = req.body;
    console.log('vopros: ', message, 'otvet: ', content, " - eto save");
});

module.exports = router;