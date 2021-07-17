const router = require('express').Router()

const usersController = require('../controllers/users.controllers')

// api/users
router.get('/', usersController.getUsers)
router.post('/', usersController.createUser)

// api/users/:userID
// router.get('/:id', notesController.getNoteById)
router.put('/:id', usersController.updateUser)
// router.delete('/:id', notesController.deleteNote)


module.exports = router