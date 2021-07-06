const app = require('./app')
const port = process.env.PORT ? process.env.PORT : 3001

const server = app.listen(port, () => {
    console.log('Running server at port: ' + port)
})

module.exports = { app, server }