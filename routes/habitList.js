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
  console.log(req.body)
  console.log(req.user._id)
  HabitList.create({
    list: list,
    user: req.user._id
  }, { timestamps: true })
    .then((response) => {
        res.status(200).json(response)
    })
    .catch((e) => next(e));
});

/*
/ Update List everytime you mark, mark off or add a habit
/ Uses habit list id 
*/
router.post("/update", (req, res, next) => {
  HabitList.findByIdAndUpdate(req.body.habitList._id, {
    list: req.body.habitList.list,
  })
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((e) => next(e));
});

// Get latest habit list using User ID
router.get("/get", (req, res, next) => {
  HabitList.find({ user: req.user._id })
  .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .then((response) => {
        console.log(response);
        res.status(201).json(response[0]);
    })
    .catch((e) => next(e));
});

// Get specific habit list using ID
router.get("/get/id", (req, res, next) => {
  console.log(req.body)
  HabitList.findById(req.body.id)
    .then((response) => {
        console.log(response);
        res.status(201).json(response[0]);
    })
    .catch((e) => next(e));
});

// Get all lists
router.get("/get/all", (req, res, next) => {
  HabitList.find({ user: req.user._id })
  .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((e) => next(e));
});

/*
/ Refresh a habit
/ Make a copy using the ID and clear done[] and off[]
*/
router.post("/refresh", (req, res, next) => {
  HabitList.find({ user: req.user._id }) // Sort this [0] = last one
  .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .then((response) => {
      if (response) {
        // Make a copy
      console.log('Habit list found: Make a copy')
        const newList = []
        response[0].list.forEach(element => {
          element.done = []
          element.off = []
          newList.push(element)
        });
        HabitList.create({
          user: req.user._id,
          list: newList,
        })
          .then((response) => {
            res.status(201).json(response)
          })
          .catch((e) => console.log(e))
      } else {
      console.log('No habit list: Create Habit List')
      HabitList.create({
        list: [],
        user: req.user._id
      }, { timestamps: true })
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((e) => next(e));
      }
    })
    .catch((e) => next(e));
});

module.exports = router;
