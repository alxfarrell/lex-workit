require("dotenv").config();
console.log("MongoDB URI:", process.env.MONGO_URI);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workoutRoutes"); // Using workoutRoutes.js
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // 👈 adjust to your frontend port
  credentials: true // 👈 allow cookies to be sent
}));
app.use(cookieParser()); // 👈 enable cookie parsing

mongoose.connect("mongodb://localhost:27017/workout", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB: workout database"))
    .catch(err => console.error("MongoDB connection error:", err));
    
// Use the workout routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', authRoutes); // 👈 register your auth route

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Workout server running on port ${PORT}`));
