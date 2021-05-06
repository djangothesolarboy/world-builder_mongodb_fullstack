const router = require('express').Router();

// import routes
const charRouter = require('./characters');
const userRouter = require('./users');

// route middleware
router.use('/characters', charRouter);
router.use('/users', userRouter);

module.exports = router;