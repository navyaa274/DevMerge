// server/controllers/authController.js
const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv');
const User = require('../models/User'); // Assuming you have a User model
const mongoose = require('mongoose');

dotenv.config(); // Load environment variables
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);  // Use your client ID

// Register or login a user based on Google token
exports.registerOrLogin = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Ensure audience matches
    });

    const payload = ticket.getPayload(); // Extract user information from the payload
    const googleId = payload.sub;  // Google user ID
    const email = payload.email;
    const name = payload.name;
    const imageUrl = payload.picture;

    // Check if user already exists in the database
    let user = await User.findOne({ googleId });

    if (!user) {
      // If the user doesn't exist, register a new user
      user = new User({
        googleId,
        email,
        name,
        imageUrl,
      });
      await user.save(); // Save the new user to the database
    }

    // Return user data to the client
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
      },
    });
  } catch (err) {
    console.error('Error during Google token verification', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};