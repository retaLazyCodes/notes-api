const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.createUser = async (request, response, next) => {
    const { body } = request
    const { username, name, password } = body

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        name,
        passwordHash
    })

    user.save()
        .then(savedUser => {
            response.json(savedUser)
        })
        .catch(err => next(err))
}
