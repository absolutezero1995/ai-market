const router = require('express').Router();

router.get('/', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).json({ error: 'Log out Failed' });
        }
        return res.clearCookie('user_sid');
    });
});

module.exports = router;