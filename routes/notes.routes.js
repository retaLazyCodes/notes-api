const router = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const notesController = require('../controllers/notes.controllers')


// api/notes
router.get('/', notesController.getAllNotes)
router.post('/', userExtractor, notesController.createNote)

// api/notes/:noteID
router.get('/:id', notesController.getNoteById)
router.put('/:id', userExtractor, notesController.updateNote)
router.delete('/:id', userExtractor, notesController.deleteNote)


module.exports = router
