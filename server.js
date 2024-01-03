const express = require("express");
require("dotenv").config()
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Fruit = require("./models/fruits");

/////////////////////////
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

  // new route
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs")
});

// create route
app.post("/fruits", async (req, res) => {
    try {
      // check if the readyToEat property should be true or false
      req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
      // create the new fruit
      await Fruit.create(req.body);
      // redirect the user back to the main fruits page after fruit created
      res.redirect("/fruits");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

// edit route
app.get("/fruits/:id/edit", async (req, res) => {
    try {
      // get the id from params
      const id = req.params.id;
      // get the fruit from the database
      const fruit = await Fruit.findById(id);
      // render template and send it fruit
      res.render("fruits/edit.ejs", { fruit });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

//update route
app.put("/fruits/:id", async (req, res) => {
    try {
      // get the id from params
      const id = req.params.id;
      // check if the readyToEat property should be true or false
      req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
      // update the fruit
      await Fruit.findByIdAndUpdate(id, req.body, { new: true });
      // redirect user back to main page when fruit
      res.redirect("/fruits");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  //delete route
  app.delete("/fruits/:id", async (req, res) => {
    try {
      // get the id from params
      const id = req.params.id;
      // delete the fruit
      await Fruit.findByIdAndDelete(id);
      // redirect user back to index page
      res.redirect("/fruits");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });


// show route
app.get("/fruits/:id", async (req, res) => {
    try {
      // get the id from params
      const id = req.params.id;

      // find the particular fruit from the database
      const fruit = await Fruit.findById(id);

      // render the template with the data from the database
      res.render("fruits/show.ejs", { fruit });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`I am alive on port ${PORT}`))
