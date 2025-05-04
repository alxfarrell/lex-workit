const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Fake user check — replace with real user DB check
const USERNAME = 'admin';
const PASSWORD = 'password';
const REFRESH_SECRET = 'myrefreshsecret'; // 👈 ideally store this in .env

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    const refreshToken = jwt.sign({ username }, REFRESH_SECRET, {
      expiresIn: '7d'
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // use HTTPS in prod
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.json({ message: 'Login successful!' });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
