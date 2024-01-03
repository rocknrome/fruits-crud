//////////////////////////////
// Import our Dependencies
//////////////////////////////
require("dotenv").config() // read our .env
const mongoose = require("mongoose")

///////////////////////////////
// Establish Connection
/////////////////////////////////
// Grab my url from my .env
const DATABASE_URL = process.env.DATABASE_URL

// establish connection
mongoose.connect(DATABASE_URL);

// Connection Events
mongoose.connection
.on("open", () => {console.log("Connected to Mongoose")})
.on("close", () => {console.log("Disconnected from Mongoose")})
.on("error", (error) => {console.log(error)})

////////////////////////////////////
// export connection
////////////////////////////////////
module.exports = mongoose