// import dependencies
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

// create router
const router = express.Router()


/////////////////////////////////////////////
// ROUTES ROUTES ROUTES ROUTES ROUTES ROUTES
/////////////////////////////////////////////

// sign up route
router.post('/signup', async (req, res) => {
    // receive request body
    console.log('initial req.body: ', req.body)
    // encrypt password
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    console.log('after hash: ', req.body)
    // create new user
    User.create(req.body)
        .then(user => {
            console.log(user)
            res.status(201).json({username: user.username})
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// log in route
router.post('/login', async (req, res) => {
    // get our data from req body saved as separate variables
    const {username, password} = req.body
    // search db for user with those creds
    User.findOne({username})
        .then(async (user) => {
            // check if extant
            if (user) {
                // compare password
                const result = await bcrypt.compare(password, user.password)
                if (result) {
                    // use session object that lives in our req
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id

                    console.log('this is req session: ', req.session)

                    res.status(201).json({user: user.toObject()})
                } else {
                    res.json({error: 'username or password incorrect'})
                }
            } else {
                // send error message
                res.json({error: 'user does not exist'})
            }
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// log out route
router.delete('/logout', (req, res) => {
    // destroy the session and eventually redirect
    req.session.destroy(err => {
        console.log('err on logout: ', err)
        res.sendStatus(204)
    })
})

// export router
module.exports = router