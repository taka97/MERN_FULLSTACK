const { Router } = require('express');

const verifyToken = require('../middlewares/auth');
const postController = require('../controllers/post');

const router = Router();

/**
 * @route POST /api/post/
 * @description Create a new post
 * @access private
 */
router.post('/', verifyToken, postController.post);

module.exports = router;
