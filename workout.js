const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: { 
    type: String,
    required: true },  // Name of the workout
  description: {
    type: String,
    required: true },  // Description of the workout
  images: [{
    type: String }],  // Array of image URLs for the workout
  youtubeLinks: [{
    type: String }]  // Array of YouTube video URLs
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
