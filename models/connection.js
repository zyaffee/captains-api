/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

require("dotenv").config()
const mongoose = require("mongoose")


/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////

// database connection
const DATABASE_URL = process.env.DATABASE_URL

// DB config object
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

// establish connection
mongoose.connect(DATABASE_URL, CONFIG)

// tell mongoose how to handle some events
mongoose.connection
    .on('open', () => console.log('connected to mongoose'))
    .on('close', () => console.log('disconnected from mongoose'))
    .on('error', (error) => console.log("error occurred:\n", error))


////////////////////////////////////////////////////
// Export the Connection
////////////////////////////////////////////////////

module.exports = mongoose