const argon2 = require('argon2');

exports.hashPassword = (rawPassword) => argon2.hash(rawPassword);

exports.verifyPassword = (hashPwd, rawPwd) => argon2.verify(hashPwd, rawPwd);
