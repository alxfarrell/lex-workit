const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
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