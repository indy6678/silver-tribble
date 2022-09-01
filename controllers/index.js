const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);


router.get('/', (req, res) => {
    res.json({message: 'here we are!'});
})

// catch all nonexistent routes
router.use((req, res) => {
    res.status(404).send("<h1>Route not found!</h1><h2>Go back and try again!</h2>").end();
});

module.exports = router;