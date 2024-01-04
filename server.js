const express = require("express");
require("dotenv").config()
const morgan = require("morgan");
const methodOverride = require("method-override");
const fruit = require("./models/fruits");
const Fruitrouter = require("./controllers/fruits");

/////////////////////////
const app = express();

////////////////////////

app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically
app.use("/fruits", Fruitrouter);


////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("your server is running... better catch it.")
})

////////////////////////////////////////////


//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`I am alive on port ${PORT}`))
