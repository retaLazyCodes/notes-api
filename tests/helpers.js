const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialNotes = [
    {
        content: "Aprendiendo FullStack JS con midudev",
        important: true,
        date: new Date()
    },
    {
        content: "midudev Bootcamp is amazing",
        important: true,
        date: new Date()
    },
    {
        content: 'Gracias al chat por vuestra ayuda! :D',
        important: true,
        date: new Date()
    }
]

const getAllContentFromNotes = async () => {
    const response = await api.get('/api/notes')
    return {
        contents: response.body.map(note => note.content),
        response
    }
}

module.exports = {
    initialNotes,
    api,
    getAllContentFromNotes
}