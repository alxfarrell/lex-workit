// seed.js

require('dotenv').config(); // Load .env file if needed
const mongoose = require('mongoose');
const Workout = require('./models/workout');
const workouts = require('./workoutData');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Optional: Clear existing workouts
    await Workout.deleteMany();

    // Insert new workouts
    await Workout.insertMany(workouts);

    console.log("Workout data seeded!");
    process.exit(); // Exit the process
  })
  .catch(err => {
    console.error("Seeding error:", err);
    process.exit(1);
  });
