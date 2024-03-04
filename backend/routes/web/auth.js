var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel');
const bcrypt = require('bcrypt');

router.post('/reg', async (req, res) => {
  const {password, email } = req.body;

  if (!email.endsWith('@alumnos.upm.es') && !email.endsWith('@upm.es')) {
    return res.json({
      code: '1001',
      msg: 'Email must end with @alumnos.upm.es or @upm.es',
      data: null
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({...req.body, password:hashedPassword});

    res.json({
      code: '0000',
      msg: 'Registration success',
      data: user
    });
  } catch (err) {
    res.json({
      code: '1002',
      msg: 'Registration failed, please try again later',
      data: null
    });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res.json({
        code: '1003',
        msg: 'Incorrect username or password',
        data: null
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({
        code: '1003',
        msg: 'Incorrect username or password',
        data: null
      });
    }

    req.session.username = user.username;
    req.session._id = user._id;

    res.json({
      code: '0000',
      msg: 'login successful',
      data: user
    });

  } catch (err) {
    res.json({
      code: '1004',
      msg: 'Database read failed',
      data: null
    });
  }
});

router.post('/logout', (req, res) => {

  req.session.destroy(() => {
    res.json({
      code: '0000',
      msg: 'login successful',
      data: null
    });
  })
});

module.exports = router;
