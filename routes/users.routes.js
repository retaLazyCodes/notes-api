const router = require('express').Router()

const usersController = require('../controllers/users.controllers')

// api/notes
router.post('/', usersController.createUser)

// api/notes/:noteID
// router.get('/:id', notesController.getNoteById)
// router.put('/:id', notesController.updateNote)
// router.delete('/:id', notesController.deleteNote)


module.exports = router