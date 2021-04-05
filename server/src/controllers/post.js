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
      post: newPost,
    });
  } catch (err) {
    return next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const posts = await Posts.find({ user: req.userId })
      .populate('user', ['username']);
    return res.send(posts);
  } catch (err) {
    return next(err);
  }
};

exports.put = async (req, res, next) => {
  try {
    const {
      userId,
      body: {
        title, description, url, status,
      },
      params: { id: postId },
    } = req;

    // simple verify, it should verify in middleware
    if (!title) {
      throw new BadRequest('"Title is required');
    }

    const postUpdateCondition = { _id: postId, user: userId };

    const post = await Posts.findOne(postUpdateCondition);

    const updateData = {
      title,
      description,
      url,
      status: status || 'To learn',
    };

    const updatedPost = await Posts.findOneAndUpdate(
      postUpdateCondition,
      updateData,
      { new: true },
    );

    if (!post) {
      throw new BadRequest('Post is not found or user is not authorized');
    }

    return res.send({
      post: updatedPost,
    });
  } catch (err) {
    return next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { params: { id: postId }, userId } = req;
    const deleteCondition = { _id: postId, user: userId };

    const deletedPost = await Posts.findOneAndDelete(deleteCondition);

    if (!deletedPost) {
      throw new BadRequest('Post is not found or user is not authorized');
    }
    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
};
