const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
    let authorization
    if (request.get('authorization') != null) {
        authorization = request.get('authorization')
    }
    else {
        authorization = request.headers.token
    }
    let token = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substr(7)
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const { id: userId } = decodedToken
    request.userId = userId

    next()
}