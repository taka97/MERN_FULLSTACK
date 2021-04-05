const jwt = require('jsonwebtoken');
const config = require('config');

exports.jwtSign = (data) => jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, config.jwt);

exports.jwtVerify = (token) => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, config.jwt);
