///////////////////////////////////
// IMPORT OUR DEPS
///////////////////////////////////
require("dotenv").config(); // load .env variables
const express = require("express"); // our web framework
const registerGlobalMiddleware = require("./utils/middleware");

//////////////////////////////////////////////////
// Express App Object
/////////////////////////////////////////////////
const app = express();

// Register Middleware
registerGlobalMiddleware(app);

/////////////////////////////////////////////////////
// Routes
/////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("your server is running... better catch it");
});

///////////////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});