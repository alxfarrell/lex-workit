const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// [PERSON 2 SPEAKING POINTS]
// 1. MongoDB Collection Structure:
//    - Using Mongoose Schema for structured data
//    - Collection name explicitly set to "newUserWorkouts"
// 2. Required Fields:
//    - name: String (required)
//    - description: String (required)
// 3. Array Fields:
//    - images: Array of strings for workout images
//    - youtubeLinks: Array of strings for workout videos
const workoutSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    youtubeLinks: [{ type: String }]
}, { collection: "newUserWorkouts" }); // Explicitly set collection name

const workout = mongoose.model("newUserWorkouts", workoutSchema);
module.exports = workout;