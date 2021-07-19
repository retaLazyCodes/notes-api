require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const logger = require("morgan");
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')
const notesRouter = require('./routes/notes.routes')
const usersRouter = require('./routes/users.routes')
const loginRouter = require('./routes/login.routes')

// initializate app
const app = express()

// middlewares
app.use(logger("dev"));
app.use(cors())
app.use(express.json())
app.use('/images', express.static('images'))

// routes
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// custom middlewares
app.use(notFound)
app.use(handleErrors)

module.exports = app
