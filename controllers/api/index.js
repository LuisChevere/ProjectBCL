const router = require("express").Router();

const registerRoute = require('./registerRoutes')

router.use('/register', registerRoute)

module.exports = router;