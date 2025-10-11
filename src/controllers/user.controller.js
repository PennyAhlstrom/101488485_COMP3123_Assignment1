const User = require('../models/User'); // Import Model
const bcrypt = require('bcryptjs');   // Needed to hash passwords for securiy
const jwt = require('jsonwebtoken');  // Library to create and verify JSON webtokens (used to authenticate users after login)


function okDTO(user) {                      // DTO (data object transfer) helper - to send only essential data to client
  return { user_id: user._id.toString() };  // returns user string instead of mongodb object
}

// POST /api/v1/user/signup  (201 code)
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body; // user data from client

    // check that no duplicate exist already
    const exists = await User.findOne({ $or: [{ username }, { email }] }); //$or - if either is true return true
    if (exists) {
      return res.status(400).json({
        status: false,
        message: 'Username or email already exists'
      });
    }

    const hash = await bcrypt.hash(password, 10); // 10 - number of salt rounds - salt is random string added before hashing
                                                  // Each round double computation time - 10 is common default
    const user = await User.create({ username, email, password: hash });
    return res.status(201).json({
      message: 'User created successfully.',
      user_id: user._id.toString()              // Only user id is returned - avoid sending passwords back
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};

// POST /api/v1/user/login  (200 code) 
exports.login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const user = await User.findOne(      // Sign in with either username or email
      email ? { email } : { username }
    );
    if (!user) {
      return res.status(401).json({ status: false, message: 'Invalid Username and password' });
    }

    const match = await bcrypt.compare(password, user.password);  // compare plain password from request with hashed password stored
    if (!match) {
      return res.status(401).json({ status: false, message: 'Invalid Username and password' });
    }

    // Generate JWT web token - used for stateless authentication (instead of storing sessions on server)
    const token = jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login successful.',
      jwt_token: token // can be stored in front end for protected routes
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};
