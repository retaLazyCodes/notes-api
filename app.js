require('dotenv').config()
require('./config/dbConection')

const express = require('express')
const cors = require('cors')
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')

// initializate app
const app = express()

const swaggerDocs = require('./config/swagger')
// setup swagger
app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
)

// middlewares
app.use(logger("dev"));
app.use(cors())
app.use(express.json())
app.use('/images', express.static('images'))

// Router Middlewares
app.use('/api/notes', require('./routes/notes.routes'))
app.use('/api/users', require('./routes/users.routes'))
app.use('/api/auth', require('./routes/auth.routes'))

// custom middlewares
app.use(notFound)
app.use(handleErrors)

module.exports = app
