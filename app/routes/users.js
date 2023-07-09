const {signup_controller, login_controller} = require('../controllers/users.js');
const express = require('express');
const router = express.Router();

//Sign up route
router.post('/signup', signup_controller);

//Login route
router.post('/login', login_controller);

module.exports = router;