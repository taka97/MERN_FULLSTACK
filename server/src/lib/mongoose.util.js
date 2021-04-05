const { Types: { ObjectId } } = require('mongoose');

exports.toObjectId = (id) => ObjectId(id);
