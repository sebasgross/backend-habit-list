const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require('../models/User');

//Authenticate User Middlewear
// returns true or false
function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: 'No User Logged in' });
  }
}

//login
router.post("/login", passport.authenticate("local",{ failureRedirect: "/login" }), (req, res, next) => {
    res.status(200).json(req.user);
    // res.redirect('/profile')
});

//log out
router.get("/logout",(req, res, next) => {

  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).clearCookie('connect.sid', {path: '/'}).json({message: "User is logged out"})
  });

})                

//signup
router.post("/signup", (req, res, next) => {
  const password = req.body.password

    User.register(req.body, password)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(e => console.log(e));
  });

router.get("/private", isAuth, (req, res, next) => {
  res.status(200).json({ message: "Access granted: Clearance 1", user: req.user, habitList: req.user.habitList});
})


module.exports = router;