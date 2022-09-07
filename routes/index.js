const express = require('express');
const router  = express.Router();
const HabitList = require('../models/HabitList')

let habit = {
name: String,
done: [Number],
id: Number,
daysStarted: [Number]
}

//Create habit list
router.post('/create/habit-list', (req,res, next)=> {

    let list = req.body
    HabitList.create({
        list: list
    })
    .then((habitList) => {
        res.status(201).json(habitList)
    })
    .catch((e) => next(e))
})

//Update List everytime you click a habit
router.post('/update/habit-list', (req,res,next) => {
    // console.log(req.body)
    HabitList.findByIdAndUpdate(req.body._id, {
        list: req.body.list
    })
    .then((habitList) => {
        res.status(201).json(habitList)
    })
    .catch((e) => next(e))
})

//get a list by ID
router.get('/habit-list', (req,res,next) => {
    // console.log(req.body)
    HabitList.findById(req.body._id)
    .then((habitList) => {
        res.status(201).json(habitList)
    })
    .catch((e) => next(e))
})



module.exports = router;
