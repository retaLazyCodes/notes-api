const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')
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

const getUserToken = async () => {
    const user = {
        username: "reta730",
        password: "123"
    }
    const result = await api
        .post('/api/login')
        .send(user)

    const { token } = result.body
    return token
}

const getAllContentFromNotes = async () => {
    const response = await api.get('/api/notes')
    return {
        contents: response.body.map(note => note.content),
        response
    }
}

const getUsers = async () => {
    const usersDB = await User.find()
    return usersDB.map(user => user.toJSON())
}

module.exports = {
    initialNotes,
    api,
    getAllContentFromNotes,
    getUsers,
    getUserToken
}