const router = require('express').Router()

const loginControllers = require('../controllers/login.controllers')


router.post('/', loginControllers.authLogin)


module.exports = router