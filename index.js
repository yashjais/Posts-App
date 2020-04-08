const express = require('express')
const setUpDB = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')

const port = 3020
const app = express()

// Public folder
app.use(express.static('./public'))

setUpDB() 

app.use(cors())
app.use(express.json())

app.use('/', router)

app.listen(port, () => {
    console.log('listening on the port', port)
})