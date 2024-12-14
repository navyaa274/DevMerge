// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerOrLogin } = require('../controllers/authController');

router.post('/register', registerOrLogin);  // Use this for both registration and login

module.exports = router;