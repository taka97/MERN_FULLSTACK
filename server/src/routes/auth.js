const { Router } = require('express');

const authController = require('../controllers/auth');

const router = Router();

/**
 * @route /api/auth/
 * @description Login
 * @access Public
 */
router.post('/', authController.post);

module.exports = router;
