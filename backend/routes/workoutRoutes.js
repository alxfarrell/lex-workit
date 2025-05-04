const express = require('express');
const router = express.Router();
const workout = require('../models/workoutSchema');  // Import the Workout model

// CREATE a workout
router.post("/", async (req, res) => {
  console.log("Received workout data:", req.body); // Debugging step

  const { name, description, images, youtubeLinks } = req.body;
  const newWorkout = new workout({ name, description, images, youtubeLinks });

  try {
      const savedWorkout = await newWorkout.save();
      console.log("Workout saved successfully:", savedWorkout); // Debugging confirmation
      res.status(201).json(savedWorkout);
  } catch (err) {
      console.error("Error saving workout:", err);
      res.status(400).json({ message: err.message });
  }
});

// READ all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await workout.find();  // Fetch all workouts from the database
    res.json(workouts);  // Respond with all workouts in JSON format
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a single workout by ID
router.get('/:id', async (req, res) => {
  try {
    const workout = await workout.findById(req.params.id);  // Fetch a workout by ID
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);  // Respond with the specific workout
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a workout by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedWorkout = await workout.findByIdAndUpdate(
      req.params.id,  // Find the workout by ID
      req.body,  // Update with new data from the request body
      { new: true }  // Return the updated workout
    );
    res.json(updatedWorkout);  // Respond with the updated workout
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a workout by ID
router.delete('/:id', async (req, res) => {
  try {
    await workout.findByIdAndDelete(req.params.id);  // Delete the workout by ID
    res.json({ message: 'Workout deleted successfully' });  // Respond with a success message
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
