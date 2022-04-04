const router = require('express').Router();
const userRoutes = require('./user.routes');
const thoughtsRoutes = require('./thought-routes');
const { default: ModelManager } = require('sequelize/types/model-manager');
router.use('/users', userRoutes);
router.use('/thoughts', thoughtsRoutes);
module.exports = router;