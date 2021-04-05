const { BadRequest } = require('http-errors');

const Posts = require('../models/Posts');

exports.post = async (req, res, next) => {
  try {
    const {
      title, description, url, status,
    } = req.body;
    const { userId } = req;

    // simple verify, it should verify in middleware
    if (!title) {
      throw new BadRequest('"Title is required');
    }

    const newPost = new Posts({
      title,
      description,
      url,
      status: status || 'To learn',
      user: userId,
    });

    newPost.save();

    return res.send({
      newPost,
    });
  } catch (err) {
    return next(err);
  }
};
