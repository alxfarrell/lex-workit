const express = require('express');
const router = express.Router();
const workout = require('../models/workoutSchema');  // Import the Workout model

// [PERSON 2 SPEAKING POINTS]
// CRUD Operations Implementation:
// 1. CREATE (POST /)
//    - Creates new workout with name, description, images, and youtubeLinks
//    - Returns 201 status on success
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

// 2. READ (GET /)
//    - Retrieves all workouts
//    - Returns array of workout objects
router.get('/', async (req, res) => {
  try {
    const workouts = await workout.find();  // Fetch all workouts from the database
    res.json(workouts);  // Respond with all workouts in JSON format
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. READ ONE (GET /:id)
//    - Retrieves single workout by ID
//    - Returns 404 if not found
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

// 4. UPDATE (PUT /:id)
//    - Updates workout by ID
//    - Returns updated workout object
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

// 5. DELETE (DELETE /:id)
//    - Deletes workout by ID
//    - Returns success message
router.delete('/:id', async (req, res) => {
  try {
    await workout.findByIdAndDelete(req.params.id);  // Delete the workout by ID
    res.json({ message: 'Workout deleted successfully' });  // Respond with a success message
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
