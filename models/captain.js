const mongoose = require('mongoose')
const {Schema, model} = mongoose

const captainSchema = new Schema({
    name: String,
    command: Object,
    living: Boolean
})

const Captain = model('Captain', captainSchema)

module.exports = Captain