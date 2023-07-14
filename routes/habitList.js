const express = require('express');
const router  = express.Router();
const HabitList = require('../models/HabitList')

//Authenticate User Middlewear
// returns true or false
function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({ message: 'No User Logged in' });
    }
}

//Create habit list
router.post('/create', isAuth, (req,res, next)=> {
    let list = req.body
    HabitList.create({
        list: list,
        user: req.user._id,
        // id
        // createdAt already has these
    })
    .then((habitList) => {
        res.status(201).json(habitList)
    })
    .catch((e) => next(e))
})

//Update List everytime you click a habit
router.post('/update', (req,res,next) => {

    // console.log("API: /update ", req.body.id, " \n")

    HabitList.findByIdAndUpdate(req.body.id, {
        list: req.body.list
    })
    .then((habitList) => {
        res.status(201).json(habitList)
    })
    .catch((e) => next(e))
})

//Update List everytime you DELETE a habit
router.post('/update/del', (req,res,next) => {

    // console.log("API: /update ", req.body.id, " \n")

    HabitList.findByIdAndUpdate(req.body.id, {
        list: req.body.list
    })
    .then((habitList) => {
        res.status(201).json(habitList)
    })
    .catch((e) => next(e))
})

//get a list by ID
router.get('/get', (req,res,next) => {
    // console.log(req.body)
    HabitList.find({user: req.user._id})
    .then((habitList) => {
        res.status(201).json(habitList)
    })
    .catch((e) => next(e))
})

module.exports = router;