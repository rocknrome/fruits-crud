////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// The Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

router.post("/signup", async (req, res) => {
    try {
      // encrypt password
      req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
      );
      // create the new user
      await User.create(req.body);
      //redirect to login page
      res.redirect("/user/login");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });


// The login Routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
    try {
      // get the data from the request body
      const { username, password } = req.body;
      const user = User.findOne({ username });
      // checking if userexists
      if (!user) {
        throw new Error("User Error: User Doesn't Exist");
      }

      //compare passwords
      const result = bcrypt.compareSync(password, user.password);

      // check if the comparison was successful
      if (!result) {
        throw new Error("User Error: Password doesn't match");
      }

      // save login info in sessions for future requests
      req.session.username = username
      req.session.loggedIn = true

      // all checks out redirect to fruits page
      res.redirect("/fruits");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  router.get("/logout", (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
        res.redirect("/")
    })
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
