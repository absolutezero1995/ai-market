const router = require('express').Router();
const bcrypt = require('bcrypt');

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id, ' - eto delete');
});

module.exports = router;