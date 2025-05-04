const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    youtubeLinks: [{ type: String }]
}, { collection: "newUserWorkouts" }); // Explicitly set collection name

const workout = mongoose.model("newUserWorkouts", workoutSchema);
module.exports = workout;