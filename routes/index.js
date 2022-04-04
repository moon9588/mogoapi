const router = require('express').Router();
const { Model } = require('sequelize/types');
const apiRoutes = require('./api');
router.use('/api, apiRoutes');
router.use((reg, res)=>{
    res.status(404).send('<h1> 404 Error </h1>')
});

module.exports = router;