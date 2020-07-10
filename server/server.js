const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.port || 5000;

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })

const connection = mongoose.connection
connection.once('open', () => {
    console.log('connected')
})

app.use(cors())
app.use(express.json())

const usersRouter = require('./routes/users')
const boardsRouter = require('./routes/boards')

app.use('/users', usersRouter)
app.use('/boards', boardsRouter)

app.listen(port, () => {
    console.log('running' + port)
})