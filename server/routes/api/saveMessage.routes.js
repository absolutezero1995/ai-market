const router = require('express').Router();
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { id, request } = req.body;
    console.log(id, request);
});

module.exports = router;