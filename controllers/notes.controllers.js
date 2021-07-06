const Note = require('../models/Note')


exports.getAllNotes = (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
}

exports.getNoteById = (request, response, next) => {
    const { id } = request.params

    Note.findById(id)
        .then(note => {
            if (note) return response.json(note)
            response.status(404).end()
        })
        .catch(err => next(err))
}

exports.updateNote = (request, response, next) => {
    const { id } = request.params
    const note = request.body

    const newNoteInfo = {
        content: note.content,
        important: note.important,
        date: new Date()
    }

    Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
        .then(result => {
            if (result === null) return response.sendStatus(404)
            response.json(result)
        })
        .catch(next)
}

exports.deleteNote = async (request, response, next) => {
    const { id } = request.params

    Note.findByIdAndRemove(id)
        .then(result => {
            if (result === null) return response.sendStatus(404)
            response.status(204).end()
        })
        .catch(next)
}

exports.createNote = (request, response, next) => {
    const note = request.body

    if (!note.content) {
        return response.status(400).json({
            error: 'required "content" field is missing'
        })
    }

    const newNote = new Note({
        content: note.content,
        date: new Date(),
        important: note.important || false
    })

    newNote.save().then(savedNote => {
        response.json(savedNote)
    }).catch(err => next(err))
}