const express = require("express");
require("dotenv").config()
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

//////////////////////////

const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL)

mongoose.connection
.on("open", ()=> {
    console.log("Happily connected to Mongo")
})
.on("close", ()=> {
    console.log("Disconnected from Mongo")
})
.on("error", (error)=> {
    console.log("error")
})

