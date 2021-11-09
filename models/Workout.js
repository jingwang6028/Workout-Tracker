const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// workout schema
const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: () => new Date(),
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Please enter exercise type",
        },
        name: {
          type: String,
          trim: true,
          required: "Please enter exercise name",
        },
        duration: {
          type: Number,
          required: "Please enter exercise duration in minutes",
        },
        weight: {
          type: Number,
          default: 0,
        },
        reps: {
          type: Number,
          default: 0,
        },
        sets: {
          type: Number,
          default: 0,
        },
        distance: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// create a virtual property to compute duration
WorkoutSchema.virtual("totalDuration").get(function () {
  let totalDuration = 0;
  this.exercise.forEach((exe) => {
    totalDuration += exe.duration;
  });
  return totalDuration;
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
