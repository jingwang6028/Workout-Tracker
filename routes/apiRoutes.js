const db = require("../models/");
const mongoose = require("mongoose");
const router = require("express").Router();

// get all workouts
router.get("api/workouts", (req, res) => {
  db.Workout.find({})
    .sort({ day: -1 })
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// create a new workout
router.post("api/workouts", ({ body }, res) => {
  console.log(body);
  db.Workout.create(body)
    .then((dbData) => {
      console.log(dbData);
      res.json(dbData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//update exercise by id
router.put("api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: { exercises: req.body },
      $inc: { totalDuration: req.body.duration },
    },
    { new: true }
  )
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// get workouts in range
router.get("api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
