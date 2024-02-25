import express from 'express';
import { PocketBase, AsyncAuthStore } from 'pocketbase';
import { save, initial } from './authStorage'; // Importing save and initial functions from authStorage.js

const app = express();
const port = 3000;

// Initialize Auth Store for PocketBase using AsyncStorage
const store = new AsyncAuthStore({
  save: save,
  initial: initial,
});

// Initialize PocketBase instance
const pb = new PocketBase('https://mathiasdb.em1t.xyz/', store);

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle user signup
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await pb.collection('users').findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user in PocketBase
    const newUser = await pb.collection('users').create({
      username,
      email,
      password,
    });

    // Return success response
    res.status(200).json({ message: 'Signup successful', user: newUser });
  } catch (error) {
    console.error('Error signing up:', error);
    // Return error response
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
});

// Route to handle user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username and password
    const user = await pb.collection('users').findOne({ username, password });

    if (user) {
      // Return success response
      res.status(200).json({ message: 'Login successful', user });
    } else {
      // Return error response if user not found or invalid credentials
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    // Return error response
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
