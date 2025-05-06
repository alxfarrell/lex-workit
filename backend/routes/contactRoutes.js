const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// Get all contacts (protected route)
router.get('/', verifyToken, (req, res) => {
    const db = req.app.locals.mysql;
    const sql = 'SELECT * FROM contacts';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching contacts:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Submit contact form
router.post('/', (req, res) => {
    const db = req.app.locals.mysql;
    const { name, email, message } = req.body;

    const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error saving contact:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Contact saved successfully' });
    });
});

module.exports = router; 