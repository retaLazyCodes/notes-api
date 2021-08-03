const Note = require('../models/Note')
const User = require('../models/User')

exports.getAllNotes = async (request, response) => {
    const notes = await Note.find().populate('user', {
        username: 1,
        name: 1
    })
    response.json(notes)
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

exports.deleteNote = (request, response, next) => {
    const { id } = request.params

    Note.findByIdAndRemove(id)
        .then(result => {
            if (result === null) return response.sendStatus(404)
            response.status(204).end()
        })
        .catch(next)
}

exports.createNote = async (request, response, next) => {
    const {
        content,
        important = false
    } = request.body

    if (!content) {
        return response.status(400).json({
            error: 'required "content" field is missing'
        })
    }

    const { userId } = request
    const user = await User.findById(userId)

    const newNote = new Note({
        content,
        date: new Date(),
        important,
        user: user._id
    })

    try {
        const savedNote = await newNote.save()
        user.notes = user.notes.concat(savedNote._id)
        await User.findByIdAndUpdate(userId, user, { new: true })

        response.status(201).json(savedNote)
    } catch (error) {
        next(error)
    }
}