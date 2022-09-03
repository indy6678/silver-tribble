const router = require("express").Router();
const { User, Site } = require("../models");

// const sequelize = require('../config/connection')

// test route for configuration validation
// router.get('/', (req, res) => {
//     res.send('<h1>Here we are!</h1>');
// })

// GET to show all websites
router.get("/", (req, res) => {
    Site.findAll({
      attributes: ["id", "website",],
      include:{
        model: User,
        attributes: ['username'],
      },
    })
      .then((dbSiteData) => {
        console.log(dbSiteData);
        // serialize the data
        const sites = dbSiteData.map(site=> site.get({ plain: true}));
        // passes a single site object into homepage template
        res.render('homepage', {
            sites,
        })
        // res.json(dbSiteData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  });

  // login route
  router.get('/login', (req, res) => {
    res.render('login');
  })

// GET to show an individual user by id
// router.get("/:id", (req, res) => {
//   User.findOne({
//     attributes: { exclude: ["password"] },
//     where: {
//       id: req.params.id,
//     },
//     attributes: ['id', 'email', 'username'],
//   })
//     .then((dbUserData) => {
//       if (!dbUserData) {
//         res.status(404).json({ message: "No user was found with that id" });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

//Post to create a new user
// router.post("/", (req, res) => {
//   User.create({
//     email: req.body.email,
//     username: req.body.username,
//     password: req.body.password,
//   })
//     .then((dbUserData) => res.json(dbUserData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

//DELETE to delete a selected user
// router.delete('/:id', (req, res) => {
//     User.destroy({
//         where: {
//             id: req.params.id,
//         },
//     })
//     .then((dbUserData) => {
//         if(!dbUserData) {
//             res.status(404).json({ message: "No user was found with that id"})
//             return;
//         }
//         res.json(dbUserData);
//     })
//     .catch((err)=> {
//         // console.log(err);
//         res.status(500).json(err);
//     })
// })

module.exports = router;
