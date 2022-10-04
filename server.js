// import dependencies
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const exp = require('constants')

// import model
const Captain = require('./models/captain')

// database connection
const DATABASE_URL = process.env.DATABASE_URL

// DB config object
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// establish connection
mongoose.connect(DATABASE_URL, CONFIG)

// tell mongoose how to handle some events
mongoose.connection
    .on('open', () => console.log('connected to mongoose'))
    .on('close', () => console.log('disconnected from mongoose'))
    .on('error', (error) => console.log("error occurred:\n", error))

// create our express application object
const app = express()

// middleware
app.use(morgan('tiny')) // for request logging in short detail
app.use(express.urlencoded({ extended: true })) // parses encoded requests
app.use(express.static('public')) // serve files from public folder statically
app.use(express.json()) // parses requests with json



const captains = [
    {
        name: 'James T. Kirk',
        command: {
            name: 'USS Enterprise',
            shipClass: 'Constitution',
            registry: 'NCC-1701'
        },
        living: false
    },
    {
        name: 'Jean-Luc Picard',
        command: {
            name: 'USS Enterprise',
            shipClass: 'Galaxy',
            registry: 'NCC-1701-D'
        },
        living: true
    },
    {
        name: 'Benjamin Sisko',
        command: {
            name: 'USS Defiant',
            shipClass: 'Defiant',
            registry: 'NX-74205'
        },
        living: false
    },
    {
        name: 'Kathryn Janeway',
        command: {
            name: 'USS Voyager',
            shipClass: 'Intrepid',
            registry: 'NCC-74656'
        },
        living: true
    }
]

// beginning of routes
app.get('/', (req, res) => {
    res.send('Where no one has gone before...')
})

// seed
app.get('/captains/seed', (req, res) => {

    // clear the DB of junk
    Captain.deleteMany({})
        .then(() => {
            Captain.create(captains)
                .then(data => {
                    res.json(data)
                })
        })
})

// server listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`listening to ${PORT}`))

///////////////////////////////
// END END END END END END END
///////////////////////////////