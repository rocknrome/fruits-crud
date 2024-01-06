const express = require("express");
require("dotenv").config()
const morgan = require("morgan");
const methodOverride = require("method-override");
const fruit = require("../models/fruits");
const Fruitrouter = require("../controllers/fruits");
const UserRouter = require("../controllers/user");
const session = require("express-session");
const MongoStore = require('connect-mongo');


function registerGlobalMiddleware (app) {

    ////////////////////////

app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically
app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
  saveUninitialized: true,
  resave: false,
}));
app.use("/fruits", Fruitrouter);
app.use("/user", UserRouter)

}

module.exports = registerGlobalMiddleware