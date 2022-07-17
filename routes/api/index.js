const router = require('express').Router();
const userRoutes = require('./user-routes');
const commentRouter = require('./thought-routes')

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;