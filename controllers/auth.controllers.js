const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


exports.authMe = async (request, response, next) => {
    request.method = "NONE";
    const userId = request.user.id
    try {
        const user = await User.findById(userId);
        response.status(200).json(user);
    } catch (e) {
        console.error(e.message);
        response.status(400).send({ Error: e.message });
    }
}

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
        role: user.role
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        {
            expiresIn: "7 days"
        }
    )

    response.status(200).json({
        role: user.role,
        token: `Bearer ${token}`
    })
}