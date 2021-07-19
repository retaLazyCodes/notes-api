const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


exports.authLogin = async (request, response, next) => {
    const { body } = request
    const { username, password } = body

    if (!username || !password) {
        return response.status(400).json({
            error: 'Some data is missing'
        })
    }

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!user || !passwordCorrect) {
        response.status(401).json({
            error: 'invalid user or password'
        })
    }

    const userForToken = {
        id: user._id,
        username: user.username
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        {
            expiresIn: 60 * 60 * 24 * 7
        }
    )

    response.send({
        name: user.name,
        username: user.username,
        token
    })
}