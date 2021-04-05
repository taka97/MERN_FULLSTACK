const { BadRequest } = require('http-errors');

const Users = require('../models/Users');

const { hashPassword } = require('../lib/utils');
const { jwtSign } = require('../lib/auth.utils');

exports.post = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next({ code: 400, message: 'Missing username and/or password' });
  }

  try {
    // check for existing user
    const user = await Users.findOne({ username });
    if (user) {
      throw new BadRequest('"username" is already taken');
    }

    const hashPwd = await hashPassword(password);
    const newUser = new Users({
      username,
      password: hashPwd,
    });
    newUser.save();

    // eslint-disable-next-line no-underscore-dangle
    const accessToken = jwtSign({ userId: newUser._id });

    return res.json({
      message: 'User is created successfully',
      accessToken,
    });
  } catch (err) {
    return next(err);
  }
};

exports.get = (req, res) => res.send('Get user controller');

exports.put = (req, res) => res.send('Put user controller');

exports.delete = (req, res) => res.send('Delete user controller');
