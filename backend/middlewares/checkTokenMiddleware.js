const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');
const TokenModel = require('../models/TokenModel');
module.exports = async (req, res, next) => {

  const token = req.get('token');

  if (!token) {
    return res.json({
      code: '1008',
      msg: 'token is missing',
      data: null
    })
  }

  const tokenInBlacklist = await TokenModel.findOne({ token: token });
  if (tokenInBlacklist) {
    return res.json({
      code: '1010',
      msg: 'Token has been blacklisted',
      data: null
    });
  }

  jwt.verify(token, secret, (err, data) => {

    if (err) {
      return res.json({
        code: '1009',
        msg: 'Token verification failed',
        data: null
      })
    }

    req.user = data;
    next();
  });

}