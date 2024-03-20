const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({
            where: { email },
        });

        if (oldUser.id) {
            const isSame = await bcrypt.compare(password, oldUser.password);
            if (isSame) {
                req.session.userId = oldUser.id;
                return res.status(200).json({ text: 'OK' });
            }
            return res.status(401).json({ error: 'Login Data is incorrect' });
        }
        return res.status(401).json({ error: 'Login Data is incorrect' });
    } catch (error) {
        console.log('api/auth.routes.js / .post (error):', error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;