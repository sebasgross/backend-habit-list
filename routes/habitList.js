const express = require("express");
const router = express.Router();
const HabitList = require("../models/HabitList");
const User = require("../models/User");

//Authenticate User Middlewear
// returns true or false
function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "No User Logged in" });
  }
}

//Create habit list
router.post("/create", isAuth, (req, res, next) => {
  let list = req.body.habitList;

  console.log(list);
  HabitList.create({
    list: list,
  })
    .then((habitList) => {
      User.findByIdAndUpdate(req.user._id, { habitList: habitList._id })
        .then(() => {
          res.status(201).json(habitList);
        })
        .catch((e) => next(e));
    })
    .catch((e) => next(e));
});

//Update List everytime you click a habit
router.post("/update", (req, res, next) => {
  HabitList.findByIdAndUpdate(req.body.habitList._id, {
    list: req.body.habitList.list,
  })
    .then((habitList) => {
      res.status(201).json(habitList);
    })
    .catch((e) => next(e));
});

//Update List everytime you DELETE a habit
router.post("/update/del", (req, res, next) => {
  HabitList.findByIdAndUpdate(req.body.id, {
    list: req.body.list,
  })
    .then((habitList) => {
      res.status(201).json(habitList);
    })
    .catch((e) => next(e));
});

//get a list by ID
router.get("/get", (req, res, next) => {
  HabitList.find({ user: req.user._id })
    .then((response) => {
      console.log(response);
      res.status(201).json(response[0]);
    })
    .catch((e) => next(e));
});

module.exports = router;
