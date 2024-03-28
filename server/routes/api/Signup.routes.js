const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, 'SIGNUP 7')
    const hash = await bcrypt.hash(password, 10);

    try {
        const oldUser = await User.findOne({
            where: { email },
        });

        if (oldUser) {
            return res.status(401).json({ error: 'Email is already registered!' });
        }

        const newUser = await User.create({
            ...req.body,
            password: hash,
        });
        if (newUser.id) {
            req.session.userId = newUser.id;
            return res.status(200).json({ text: 'OK' });
        }
        return res.status(500).json({ error: 'User cannot be created' });
    } catch (error) {
        console.log('api/auth.routes.js / .post (error):', error);
        return res.status(400).json({ error: error.message });
    }
});


module.exports = router;