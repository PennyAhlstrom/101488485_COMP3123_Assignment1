const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/user.controller');


router.post('/signup', signup); // 201 - created
router.post('/login',  login);  // 200 - ok

module.exports = router;
