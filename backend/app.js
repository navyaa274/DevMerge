import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import pay from './razorPay.js';
import fetch from 'node-fetch';
import session from 'express-session';
import MongoStore from 'connect-mongo';


dotenv.config({ path: "./config/config.env" });

const app = express()

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

// import express from 'express';

// Initialize Express app
// const app = express();

// Session Setup
app.use(session({
  secret: 'secret', // Must match the secret on the login server
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://navuaggarwal:navyaa274@cluster0.7noqj.mongodb.net/project?retryWrites=true&w=majority',
    collectionName: 'sessions',
  }),
  cookie: {
    sameSite: 'none',
    secure: false, // Set to true if using HTTPS
  },
}));

// Your routes go here...


app.use(cors({
    // origin: ["http://localhost:3000"],
    origin: [process.env.LOCAL_URL, process.env.WEB_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}))

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
    res.send("Hello from the server!");
});

app.use(cors());
app.use(express.json());

// Language map for JDoodle API
const languagesMap = {
  cpp: ["cpp14", "3"],
  c: ["c", "3"],
  java: ["java", "1"],
  python: ["python3", "3"],
};

// Post request to create submission
app.post('/api/submission', async (req, res) => {
  try {
    const { language, code, input } = req.body;
    const [languageCode, versionIndex] = languagesMap[language];

    const inputParams = {
      script: code, // User's code
      language: languageCode, // Language code (e.g., python3)
      versionIndex, // Version of the language
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      stdin: input, // The user input
    };

    // Make request to JDoodle API
    const response = await fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      body: JSON.stringify(inputParams),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    // Return the response to the frontend
    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

////////////

// // import dotenv from "dotenv";
// // import express from "express";
// import passport from "passport";
// import session from "express-session";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// dotenv.config();

// // const app = express(); // Uncomment and define the app

// // Session configuration
// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// // Initialize Passport.js middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Passport.js Google OAuth strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID, // Ensure .env file contains these values
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:6005/auth/google/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // Handle user data from Google
//       return done(null, profile);
//     }
//   )
// );

// // Serialize user to session
// passport.serializeUser((user, done) => {
//   done(null, user); // Save the user object to the session
// });

// // Deserialize user from session
// passport.deserializeUser((user, done) => {
//   done(null, user); // Retrieve the user object from the session
// });

// // Routes
// app.get("/", (req, res) => {
//   res.send('<a href="/auth/google">Login with Google</a>');
// });

// // Google authentication route
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // Google callback route
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     // Successful authentication
//     res.redirect("/profile");
//   }
// );

// // Profile route (protected)
// app.get("/profile", (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect("/");
//   }
//   res.send(`Welcome ${req.user.displayName}`);
// });

// // Logout route
// app.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       console.error(err);
//       return res.redirect("/"); // Redirect even if logout fails
//     }
//     res.redirect("/");
//   });
// });

// // Start the server
// // const PORT = 6005;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on http://localhost:${PORT}`);
// // });

export default app;