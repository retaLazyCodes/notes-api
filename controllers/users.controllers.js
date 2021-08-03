const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.getUsers = async (request, response, next) => {
    const users = await User.find().populate('notes', {
        content: 1,
        date: 1
    })
    response.json(users)
}

exports.createUser = async (request, response, next) => {
    const { body } = request
    console.log(body)
    const { username, name, password } = body

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        name,
        passwordHash
    })

    user.save()
        .then(savedUser => {
            response.status(201).json(savedUser)
        })
        .catch(err => next(err))
}

exports.updateUser = async (request, response, next) => {
    const { id } = request.params
    const { body } = request
    const { username, name, password } = body

    const passwordHash = await bcrypt.hash(password, 10)
    const newUserInfo = {
        username,
        name,
        passwordHash
    }

    User.findByIdAndUpdate(id, newUserInfo, { new: true })
        .then(result => {
            if (result === null) return response.sendStatus(404)
            response.json(result)
        })
        .catch(err => {
            if (err.name === 'MongoError') {
                err = { ...err, name: err.codeName }
            }
            next(err)
        })
}