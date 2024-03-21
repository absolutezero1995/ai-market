const router = require('express').Router();

router.post('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
    } catch (error) {
        res.json(error)
    }
});

module.exports = router;