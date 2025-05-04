require("dotenv").config();
console.log("MongoDB URI:", process.env.MONGO_URI);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workoutRoutes"); // Using workoutRoutes.js
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/workout", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB: workout database"))
    .catch(err => console.error("MongoDB connection error:", err));
    
// Use the workout routes
app.use('/api/workouts', workoutRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Workout server running on port ${PORT}`));