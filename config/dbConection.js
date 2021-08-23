const mongoose = require('mongoose')

const {
  NODE_ENV,
  MONGO_DB_URI,
  MONGO_DB_URI_TEST,
  MONGO_DB_URI_DEV
} = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : (
    NODE_ENV === 'production'
      ? MONGO_DB_URI
      : MONGO_DB_URI_DEV
  )

// conexión a mongodb
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })

// process.on('uncaughtException', () => {
//   mongoose.connection.disconnect()
// })
