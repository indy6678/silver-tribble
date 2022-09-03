const router = require("express").Router();
const { User, Site } = require("../models");

// const sequelize = require('../config/connection')

// test route for config validation
// router.get('/', (req, res) => {
//     res.json({message: 'here we are!'});
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


module.exports = router;