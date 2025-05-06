// Import required dependencies
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());  // Parse JSON bodies
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json()); // Parse JSON bodies for POST requests

// Environment variables
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'de!ta52C0y0te',
  database: 'contactDB',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Route to handle contact form submissions
app.post('/api/contacts', (req, res) => {
  console.log("input", req.body)
  const { name, email, message } = req.body;

  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      res.status(500).send('Database error');
    } else {
      res.status(200).send('Message saved!');
    }
  });
});

// In-memory users array for demo (You should use a real database in production)
const users = [];

// Sign-up route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: 'User created successfully' });
});

// Sign-in route with JWT
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Example protected route using JWT authentication
app.get('/protected', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    res.json({ message: `Welcome ${decoded.username}!` });
  });
});

// Login route using cookies for session token
app.post('/login', (req, res) => {
  // Simulating user login (Replace with real authentication logic)
  const user = { username: 'senauser' }; // Replace with real user data

  // Generate a session token (You could use a JWT token here)
  const sessionToken = 'your-session-token'; // This could be a JWT token

  // Set a secure, HttpOnly cookie with the session token
  res.cookie('sessionToken', sessionToken, {
    httpOnly: true,  // Cannot be accessed by client-side JavaScript
    secure: process.env.NODE_ENV === 'production',  // Only set Secure cookie in production (HTTPS)
    maxAge: 24 * 60 * 60 * 1000,  // 1 day expiration
    sameSite: 'Strict',  // Helps mitigate CSRF attacks
  });

  res.send('Login successful');
});

// Profile route that checks for session cookie
app.get('/profile', (req, res) => {
  const sessionToken = req.cookies.sessionToken;

  if (sessionToken) {
    // You should validate the session token here (e.g., decode and verify JWT)
    res.send('Profile page - User is logged in');
  } else {
    res.status(401).send('Unauthorized - No session token found');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
