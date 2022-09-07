const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require('../models/User');

//Authenticate User Middlewear
function isAuth(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({ message: "You are not logged in" });
    }
};

//login
router.post("/login", passport.authenticate("local",{ failureRedirect: "/login" }), (req, res, next) => {
    res.status(200).json(req.user);
    // res.redirect('/profile')
});

//signup
router.post("/signup", (req, res, next) => {
    User.register(req.body, req.body.password)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(e => console.log(e));
  });

router.get("/my-id", isAuth,(req, res, next) => {
    console.log(req.user);
    console.log("hola");

})

module.exports = router;