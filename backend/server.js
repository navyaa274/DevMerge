import app from './app.js'
import connectDB from './config/db.js';
// import chatBot from "./chatBot.js";

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

import chatbot from './chatBot.js';
import http from 'http';
import dotenv from 'dotenv';

// dotenv.config();

const PORT = 5000;

const server = http.createServer(chatbot);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

import pay from './razorPay.js'
// import http from 'http';
// import Razorpay from 'razorpay';
const port = 7000;
const serverpay = http.createServer(pay);
// Start the server on the desired port
serverpay.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

import google from './googleAuth.js'

google.listen(3000, () => {
    console.log('Server is running at port 3000');
  });




// import express from 'express';
// import cors from 'cors';
// import fetch from 'node-fetch';
// import dotenv from 'dotenv';

// dotenv.config();

// // Create express app
// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Language map for JDoodle API
// const languagesMap = {
//   cpp: ["cpp14", "3"],
//   c: ["c", "3"],
//   java: ["java", "1"],
//   python: ["python3", "3"],
// };

// // Post request to create submission
// app.post('/api/submission', async (req, res) => {
//   try {
//     const { language, code, input } = req.body;
//     const [languageCode, versionIndex] = languagesMap[language];

//     const inputParams = {
//       script: code, // User's code
//       language: languageCode, // Language code (e.g., python3)
//       versionIndex, // Version of the language
//       clientId: process.env.JDOODLE_CLIENT_ID,
//       clientSecret: process.env.JDOODLE_CLIENT_SECRET,
//       stdin: input, // The user input
//     };

//     // Make request to JDoodle API
//     const response = await fetch('https://api.jdoodle.com/v1/execute', {
//       method: 'POST',
//       body: JSON.stringify(inputParams),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     const data = await response.json();

//     // Return the response to the frontend
//     res.status(200).json(data);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Start server
// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server started at port ${port}`));







// import express from 'express';
// import cors from 'cors';
// import fetch from 'node-fetch';
// import dotenv from 'dotenv';

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());


// const languagesMap = {
//   cpp: ["cpp14", "3"],
//   c: ["c", "3"],
//   java: ["java", "1"],
//   python: ["python3", "3"],
// };


// app.post('/api/submission', async (req, res) => {
//   try {
//     const { language, code, input } = req.body;
//     const [languageCode, versionIndex] = languagesMap[language];

//     const inputParams = {
//       script: code, // User's code
//       language: languageCode, // Language code (e.g., python3)
//       versionIndex, // Version of the language
//       clientId: process.env.JDOODLE_CLIENT_ID,
//       clientSecret: process.env.JDOODLE_CLIENT_SECRET,
//       stdin: input, // The user input
//     };

//     // Make request to JDoodle API
//     const response = await fetch('https://api.jdoodle.com/v1/execute', {
//       method: 'POST',
//       body: JSON.stringify(inputParams),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     const data = await response.json();

//     // Return the response to the frontend
//     res.status(200).json(data);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Start server
// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server started at port ${port}`));



// import express from 'express';
// import passport from 'passport';
// import session from 'express-session';
// import mongoose from 'mongoose';
// import GoogleStrategy from 'passport-google-oauth20';
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config({ path: "./config/config.env" });

// // Initialize Express app
// const app = express();

// // MongoDB connection setup
// mongoose.connect('mongodb+srv://navuaggarwal:navyaa274@cluster0.7noqj.mongodb.net/project?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected...'))
//   .catch((err) => console.log(err));

// // Define the User Schema
// const userSchema = new mongoose.Schema({
//   googleId: { type: String, unique: true, sparse: true },
//   name: String,
//   username: { type: String, unique: true },
//   email: { type: String, unique: true },
//   password: String, // For local login (optional)
//   mobile: String, // Optional
//   files: [String],
//   loginAttempts: { type: Number, default: 0 },
//   isVerified: { type: Boolean, default: false },
//   isAdmin: { type: Boolean, default: false },
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);

// // Passport Setup

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:3000/auth/google/callback',
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     let user = await User.findOne({ email: profile.emails[0].value });

//     if (!user) {
//       // Create a new user if not found
//       user = new User({
//         googleId: profile.id,
//         name: profile.displayName,
//         email: profile.emails[0].value,
//         username: profile.displayName.replace(/\s+/g, '_'), // Generate a simple username
//         isVerified: true, // Mark as verified
//       });

//       await user.save();
//     }

//     // Return the user object
//     return done(null, user);
//   } catch (err) {
//     return done(err);
//   }
// }));

// // Serialize and Deserialize User to store and retrieve from session
// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// // Middleware
// app.use(session({
//   secret: 'secret', // Use a more secure secret in production
//   resave: false,
//   saveUninitialized: true,
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// // Routes

// // Home Route
// app.get('/', (req, res) => {
//   res.send('<a href="/auth/google">Login with Google</a>');
// });

// // Google Auth Route
// app.get('/auth/google', passport.authenticate('google', {
//   scope: ['profile', 'email'],
// }));

// // Google Auth Callback Route
// app.get('/auth/google/callback', passport.authenticate('google', {
//   failureRedirect: '/',
// }), (req, res) => {
//   res.redirect('/profile');
// });

// // Profile Route
// app.get('/profile', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send(`
//       <h1>Welcome ${req.user.name}</h1>
//       <p>Email: ${req.user.email}</p>
//       <p>Username: ${req.user.username}</p>
//       <a href="/logout">Logout</a>
//     `);
//   } else {
//     res.redirect('/');
//   }
// });

// // Logout Route
// app.get('/logout', (req, res) => {
//   req.logout(() => {
//     res.redirect('/');
//   });
// });

// // export default app;

// app.listen(3000, () => {
//   console.log('Server is running at port 3000');
// });