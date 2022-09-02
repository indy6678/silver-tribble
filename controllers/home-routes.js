const User = require('../models/user');

const router = require('express').Router();
// const sequelize = require('../config/connection')

// test route for config validation
// router.get('/', (req, res) => {
//     res.json({message: 'here we are!'});
// })

router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']},
    })
    .then((dbUserData) => {
        res.json(dbUserData);
    })
    .catch((err) => {
    res.status(500).json(err);
    });
});


module.exports = router;
