const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // 👈 add this
const workoutRoutes = require('./routes/workoutRoutes');
const authRoutes = require('./routes/authRoutes'); // 👈 you'll create this next

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // 👈 adjust to your frontend port
  credentials: true // 👈 allow cookies to be sent
}));
app.use(cookieParser()); // 👈 enable cookie parsing

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', authRoutes); // 👈 register your auth route

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Workout server running on port ${PORT}`));
