const router = require('express').Router()

const usersController = require('../controllers/users.controllers')


router.get('/', usersController.getUsers)
router.post('/', usersController.createUser)


router.put('/:id', usersController.updateUser)


module.exports = router