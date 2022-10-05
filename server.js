// import dependencies
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const exp = require('constants')
const CaptainRouter = require('./controllers/captainControllers')
const UserRouter = require("./controllers/userControllers")

// create our express application object
const app = express()

// middleware
app.use(morgan('tiny')) // for request logging in short detail
app.use(express.urlencoded({ extended: true })) // parses encoded requests
app.use(express.static('public')) // serve files from public folder statically
app.use(express.json()) // parses requests with json

// HOME ROUTE
app.get('/', (req, res) => {
    res.send('Where no one has gone before...')
})


// server listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`listening to ${PORT}`))

///////////////////////////////
// END END END END END END END
///////////////////////////////