const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { api, getUsers } = require('./helpers')
const { server } = require('../index')

describe.only('Creating a new user', () => {
    beforeEach(async () => {
        await User.deleteMany()

        const passwordHash = await bcrypt.hash('pswd', 10)
        const user = new User({ username: 'miduroot', passwordHash })

        await user.save()
    })

    test('works as expected creating a fresh username', async () => {
        const usersAtStart = await getUsers()

        const newUser = {
            username: 'midudev',
            name: 'Miguel',
            password: 'twitch'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await getUsers()

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })


    afterAll(() => {
        mongoose.connection.close()
        server.close()
    })
})