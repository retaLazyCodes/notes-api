require('jest-date')
const mongoose = require('mongoose')
const Note = require('../models/Note')
const { server } = require('../index')
const {
    initialNotes,
    api,
    getAllContentFromNotes
} = require('./helpers')


beforeEach(async () => {
    await Note.deleteMany({})

    for (const note of initialNotes) {
        const noteObject = new Note(note)
        await noteObject.save()
    }

})

describe('GET all notes', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are notes', async () => {
        const {
            response
        } = await getAllContentFromNotes()
        expect(response.body).toHaveLength(initialNotes.length)
    })

    test('the first note is about midudev', async () => {
        const {
            contents
        } = await getAllContentFromNotes()

        expect(contents).toContain('Aprendiendo FullStack JS con midudev')
    })
})

describe('create a note', () => {
    test('is possible with a valid note', async () => {
        const newNote = {
            content: 'Proximamente Async/Await',
            important: false,
            date: new Date()
        }

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const { contents, response } = await getAllContentFromNotes()

        expect(response.body).toHaveLength(initialNotes.length + 1)
        expect(contents).toContain(newNote.content)
    })

    test('is not possible with an invalid note', async () => {
        const newNote = {
            important: false,
            date: new Date()
        }

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)

        const response = await api.get('/api/notes')

        expect(response.body).toHaveLength(initialNotes.length)
    })
})

describe('delete a note', () => {
    test('a note can be deleted', async () => {
        const { response: firstResponse } = await getAllContentFromNotes()
        const { body: notes } = firstResponse
        const noteToDelete = notes[0]

        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)

        const { contents, response: secondResponse } = await getAllContentFromNotes()
        expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
        expect(contents).not.toContain(noteToDelete.content)
    })

    test('a note that has an invalid id cannot be deleted', async () => {
        await api
            .delete('/api/notes/1234')
            .expect(400)

        const { response } = await getAllContentFromNotes()

        expect(response.body).toHaveLength(initialNotes.length)
    })

    test('a note that has a valid id but do not exist cannot be deleted', async () => {
        const validObjectIdThatDoNotExist = '60451827152dc22ad768f442'
        await api
            .delete(`/api/notes/${validObjectIdThatDoNotExist}`)
            .expect(404)

        const { response } = await getAllContentFromNotes()

        expect(response.body).toHaveLength(initialNotes.length)
    })
})

describe('update a note', () => {
    test('a note can be updated', async () => {
        const { response: firstResponse } = await getAllContentFromNotes()
        const { body: notes } = firstResponse
        const noteToUpdate = notes[0]

        await api
            .put(`/api/notes/${noteToUpdate.id}`)
            .send(noteToUpdate)
            .expect(200)

        const secondResponse =
            await api
                .get(`/api/notes/${noteToUpdate.id}`)
                .expect(200)

        const { body: updatedNote } = secondResponse
        expect(new Date(updatedNote.date)).toBeAfter(new Date(noteToUpdate.date))
    })

    test('a note that has an invalid id cannot be updated', async () => {
        await api
            .put('/api/notes/1234')
            .expect(400)
    })

    test('a note that has a valid id but do not exist cannot be updated', async () => {
        const validObjectIdThatDoNotExist = '60451827152dc22ad768f442'
        await api
            .put(`/api/notes/${validObjectIdThatDoNotExist}`)
            .expect(404)
    })

})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})