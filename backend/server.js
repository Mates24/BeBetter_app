const express = require('express');
const mysql = require('mysql');

const app = express();

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'BeBetter',
  port: 3306
});

// Middleware to parse JSON bodies
app.use(express.json());

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Je potrebné zadať email a heslo' });
  }

  // Perform database query
  pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length > 0) {
      // User found, login successful
      res.json({ success: true });
    } else {
      // User not found or incorrect password
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});