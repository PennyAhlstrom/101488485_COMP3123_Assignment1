const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/user.controller');
const validate = require('../middleware/validate');
const { signupValidator, loginValidator } = require('../validators/user.validators');

// /api/v1/user

router.use((req, res, next) => {                // Added for postman debugging
  console.log('[BODY RECEIVED]', req.body);
  next();
});

router.post('/signup',  signupValidator, validate, signup); // 201 - created
router.post('/login',  loginValidator, validate, login);  // 200 - ok

module.exports = router;
