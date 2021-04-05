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

/**
 * @route GET /api/post/
 * @description Create a new post
 * @access private
 */
router.get('/', verifyToken, postController.get);

/**
 * @route PUT /api/post/
 * @description Create a new post
 * @access private
 */
router.put('/:id', verifyToken, postController.put);

/**
 * @route DELETE /api/post/
 * @description Create a new post
 * @access private
 */
router.delete('/:id', verifyToken, postController.delete);

module.exports = router;
