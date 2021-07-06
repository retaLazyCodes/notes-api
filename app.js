require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')
const notesRoutes = require('./routes/notes.routes')

// initializate app
const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use('/images', express.static('images'))

// routes
app.use(notesRoutes)

// custom middlewares
app.use(notFound)
app.use(handleErrors)

module.exports = app
