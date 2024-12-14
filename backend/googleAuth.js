// import express from 'express';
// import passport from 'passport';
// import session from 'express-session';
// import mongoose from 'mongoose';
// import GoogleStrategy from 'passport-google-oauth20';
// import dotenv from 'dotenv';
// import User from './models/userModel.js';

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
// // const userSchema = new mongoose.Schema({
// //   googleId: { type: String, unique: true, sparse: true },
// //   name: String,
// //   username: { type: String, unique: true },
// //   email: { type: String, unique: true },
// //   password: String, // For local login (optional)
// //   mobile: String, // Optional
// //   files: [String],
// //   loginAttempts: { type: Number, default: 0 },
// //   isVerified: { type: Boolean, default: false },
// //   isAdmin: { type: Boolean, default: false },
// // }, { timestamps: true });

// // const User = mongoose.model('User', userSchema);

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
//   res.redirect('/home');
// });

// // Profile Route
// app.get('/home', (req, res) => {
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

// export default app;


import express from 'express';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import MongoStore from 'connect-mongo';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Initialize Express app
const app = express();

// MongoDB connection setup
mongoose.connect('mongodb+srv://navuaggarwal:navyaa274@cluster0.7noqj.mongodb.net/project?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));


// mongoose.connect(connectDB(), {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected...'))
//   .catch((err) => console.log(err));


// Passport Setup

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails[0].value });

    if (!user) {
      // Create a new user if not found
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        username: profile.displayName.replace(/\s+/g, '_'), // Generate a simple username
        isVerified: true, // Mark as verified
      });

      await user.save();
    }

    // Return the user object
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Serialize and Deserialize User to store and retrieve from session
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Middleware
app.use(session({
  secret: 'secret', // Use a more secure secret in production
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://navuaggarwal:navyaa274@cluster0.7noqj.mongodb.net/project?retryWrites=true&w=majority',
    collectionName: 'sessions', // Optional: Specify the session collection
  }),
  cookie: {
    sameSite: 'none', // Enable cross-origin cookies
    secure: false,    // Set to true if using HTTPS
  },
}));

import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:3001', // Allow the home service
  credentials: true,              // Enable cookies
}));


app.use(passport.initialize());
app.use(passport.session());

// Routes

// Home Route
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

// Google Auth Route
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Google Auth Callback Route
app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/profile');
});

// Profile Route
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`
      <h1>Welcome ${req.user.name}</h1>
      <p>Email: ${req.user.email}</p>
      <p>Username: ${req.user.username}</p>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.redirect('/');
  }
});

// Logout Route
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

export default app;