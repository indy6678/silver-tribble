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
        console.log(dbUserData);
        res.json(dbUserData);
    })
    .catch((err) => {
    res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: User,
                attributes: ['email', 'username', 'id']
            },
        ],
    })
    .then((dbUserData) => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user was found with that id'})
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
    User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
})


module.exports = router;
