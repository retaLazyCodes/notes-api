const router = require('express').Router()

const notesController = require('../controllers/notes.controllers')
// const userController = require('../controllers/user.controller')

// api/notes
router.get('/api/notes/', notesController.getAllNotes)
router.post('/api/notes/', notesController.createNote)

// api/notes/:noteID
router.get('/api/notes/:id', notesController.getNoteById)
router.put('/api/notes/:id', notesController.updateNote)
router.delete('/api/notes/:id', notesController.deleteNote)

// api/user
// router.post('/api/user/login')

module.exports = router
