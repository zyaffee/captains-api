// import dependencies
const express = require('express')
const Captain = require('../models/captain')


// seed
app.get('/captains/seed', (req, res) => {

    // starting array of captains
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

    // clear the DB of junk
    Captain.deleteMany({})
        .then(deletedCaptains => {
            console.log('what was deleted: ', deletedCaptains)
            Captain.create(captains)
                .then(data => {
                    console.log('what was created: ', data)
                    db.close()
                })
                .catch(err => {
                    console.log(err)
                    db.close()
                })
        })
        .catch(err => {
            console.log(err)
            db.close()
        })
})
