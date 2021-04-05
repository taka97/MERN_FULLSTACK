const { Unauthorized, Forbidden } = require('http-errors');
const { jwtVerify } = require('../lib/auth.utils');

const verifyToken = (req, res, next) => {
  try {
    const { authorization: authHeader } = req.headers;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new Unauthorized('accessToken is not found');
    }

    try {
      const { userId } = jwtVerify(token);
      req.userId = userId;
      return next();
    } catch (err) {
      throw new Forbidden('Token is malformation');
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = verifyToken;
