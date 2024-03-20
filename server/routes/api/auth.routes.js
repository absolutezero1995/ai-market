const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

// --------------------------------------------------------
router.route('/register').post(async (req, res) => {
  console.log('**************req.body: ', req.body);
  const { email, password } = req.body;
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
      is_admin: false,
    });
    if (newUser.id) {
      req.session.userId = newUser.id;
      // req.session.user = { userId: newUser.id, email: newUser.email };
      return res.json({ text: 'OK' });
    }
    return res.status(500).json({ error: 'User cannot be created' });
  } catch (error) {
    console.log('api/auth.routes.js / .post (error):', error);
    return res.status(400).json({ error: error.message });
  }
});

// --------------------------------------------------------
router.route('/login').post(async (req, res) => {
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

router.route('/logout').get((req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ error: 'Log out Failed' });
    }
    return res.clearCookie('user_sid').redirect('/');
  });
});

module.exports = router;
