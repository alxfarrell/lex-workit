const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'mysql-db',
  user: 'root',
  password: 'de!ta52C0y0te',
  database: 'contactDB'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// route to handle contact form submissions
app.post('/api/contacts', (req, res) => {
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

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// In-memory user "database"
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

// Sign-in route
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Example protected route
app.get('/protected', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        res.json({ message: `Welcome ${decoded.username}!` });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
