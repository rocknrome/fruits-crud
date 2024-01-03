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

/////////////////////////

// destructure Schema and model into their own variables
const {Schema, model} = mongoose
// const Schema = mongoose.Schema
// const model = mongoose.model

// Schema - Shape of the Data
const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

// Model - object for interacting with the db
const Fruit = model("Fruit", fruitSchema)

const app = express();

////////////////////////

app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically


////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("your server is running... better catch it.")
})

////////////////////////////////////////////
app.get("/fruits/seed", async (req, res) => {

    try{
        // array of starter fruits
        const startFruits = [
          { name: "Orange", color: "orange", readyToEat: false },
          { name: "Grape", color: "purple", readyToEat: false },
          { name: "Banana", color: "orange", readyToEat: false },
          { name: "Strawberry", color: "red", readyToEat: false },
          { name: "Coconut", color: "brown", readyToEat: false },
          ]
       // Delete all fruits
       await Fruit.deleteMany({})
       // Seed Starter Fruits
       const fruits = await Fruit.create(startFruits)
       // send created fruits as response to confirm creation
       res.json(fruits);
    } catch(error) {
      console.log(error.message)
      res.status(400).send(error.message)
    }
});

// index route
app.get("/fruits", async (req, res) => {
    try {
      const fruits = await Fruit.find({});
      res.render("fruits/index.ejs", { fruits });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });



//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`I am alive on port ${PORT}`))
