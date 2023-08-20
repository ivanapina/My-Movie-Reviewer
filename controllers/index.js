const router = require('express').Router()
const movieRoutes = require('./api/movieRoutes') 
const userRoutes = require('./api/userRoutes')
const commentRoutes = require('./api/commentRoutes') 

router.use('/', movieRoutes, userRoutes, commentRoutes )
module.exports = router