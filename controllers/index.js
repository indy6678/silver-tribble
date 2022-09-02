// collect packaged routes

const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);


// catch all requests for nonexistent enpoints
router.use((req, res) => {
    res.status(404).send("<h1>Route not found!</h1><h2>Go back and try again!</h2>").end();
});

module.exports = router;