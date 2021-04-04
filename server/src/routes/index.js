const { Router } = require('express');

const authRouter = require('./auth');


const router = Router();

router.use('/auth', authRouter);
// router.use('/users', );

module.exports = router;
