const { Router } = require('express');

const userController = require('../controllers/user');

const router = Router();

/**
 * @route /api/users/
 * @description Register user
 * @access Public
 */
router.post('/', userController.post);

module.exports = router;
