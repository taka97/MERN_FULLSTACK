const { BadRequest } = require('http-errors');

const Users = require('../models/Users');
const { verifyPassword } = require('../lib/utils');
const { jwtSign } = require('../lib/auth.utils');

exports.post = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequest('Missing username or password');
  }

  try {
    const user = await Users.findOne({ username });
    if (!user) {
      throw new BadRequest('username/password is invalid');
    }

    const pwdValid = await verifyPassword(user.password, password);
    if (!pwdValid) {
      throw new BadRequest('username/password is invalid');
    }

    // eslint-disable-next-line no-underscore-dangle
    const accessToken = jwtSign({ userId: user._id });

    return res.send({
      accessToken,
    });
  } catch (err) {
    return next(err);
  }
};
