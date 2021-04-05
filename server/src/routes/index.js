const { Router } = require('express');

const authRouter = require('./auth');
const userRouter = require('./user');
const postRouter = require('./post');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);

module.exports = router;
