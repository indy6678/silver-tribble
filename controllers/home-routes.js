const router = require('express').Router();
// const sequelize = require('../config/connection')

router.get('/', (req, res) => {
    res.json({message: 'here we are!'});
})

router.post('/', (req, res) => {
    
})

module.exports = router;
