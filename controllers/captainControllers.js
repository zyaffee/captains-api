// import dependencies
const express = require('express')
const Captain = require('../models/captain')
const Fruit = require('../models/captain')

// create router
const router = express.Router()

/////////////////////////////////////////////
// ROUTES ROUTES ROUTES ROUTES ROUTES ROUTES
/////////////////////////////////////////////

// INDEX request route
router.get('/', (req, res) => {
    // console.log('this is the request', req)
    // use mongoose methods to GET data
    Captain.find({})
        .then(captains => {
            res.json({captains: captains})
        })
        .catch(err => console.log(err))
})

// POST request route
router.post('/', (req, res) => {
    // get request body
    Captain.create(req.body)
        .then(captain => {
            res.status(201).json({captain: captain.toObject()})
        })
        .catch(err => console.log(err))
})

// PUT request update route
router.put('/:id', (req, res) => {
    // console.log('hit update route')
    const id = req.params.id

    Captain.findByIdAndUpdate(id, req.body, {new: true})
        .then(captain => {
            console.log('captain from update ',captain)
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

// DELETE request destroy route
router.delete('/:id', (req, res) => {
    // grab id from request
    const id = req.params.id

    // find and delete captain
    Captain.findByIdAndRemove(id)
        .then(captain => {
            res.sendStatus(204)
        })
        .catch(err => res.json(err))
})

// SHOW
router.get('/:id', (req, res) => {
    const id = req.params.id
    Captain.findById(id)
        .then(captain => {
            res.json({captain: captain})
        })
        .catch(err => console.log(err))
})

// export router
module.exports = router