const router = require('express').Router()

const notesController = require('../controllers/notes.controllers')


// api/notes
router.get('/', notesController.getAllNotes)
router.post('/', notesController.createNote)

// api/notes/:noteID
router.get('/:id', notesController.getNoteById)
router.put('/:id', notesController.updateNote)
router.delete('/:id', notesController.deleteNote)


module.exports = router
