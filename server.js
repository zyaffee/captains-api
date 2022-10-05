// import dependencies
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const exp = require('constants')

// import model
const Captain = require('./models/captain')

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

// index route
app.get('/captains', (req, res) => {
    // use mongoose methods to GET data
    Captain.find({})
        .then(captains => {
            res.json({captains: captains})
        })
        .catch(err => console.log(err))
})

// show route
app.get('/captains/:id', (req, res) => {
    const id = req.params.id
    Captain.findById(id)
        .then(captain => {
            res.json({captain: captain})
        })
        .catch(err => console.log(err))
})

// create route
app.post('/captains', (req, res) => {
    // get request body
    Captain.create(req.body)
        .then(captain => {
            res.status(201).json({captain: captain.toObject()})
        })
        .catch(err => console.log(err))
})

// update route
app.put('/captains/:id', (req, res) => {
    const id = req.params.id
    Captain.findByIdAndUpdate(id, req.body, {new: true})
        .then(captain => {
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

// destroy route
app.delete('/captains/:id', (req, res) => {
    const id = req.params.id
    Captain.findByIdAndRemove(id)
        .then(captain => {
            res.sendStatus(204)
        })
        .catch(err => res.json(err))
})

// server listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`listening to ${PORT}`))

///////////////////////////////
// END END END END END END END
///////////////////////////////