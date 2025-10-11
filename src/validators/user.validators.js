const { body } = require('express-validator');

const signupValidator = [
  body('username').trim().notEmpty().withMessage('Enter a username'),
  body('email').trim().isEmail().withMessage('Enter a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('The password must be at least 6 characters')
];

const loginValidator = [
  // either email or username is allowed to login
  body('password').notEmpty().withMessage('Password is required'),
  body().custom((val) => {
    if (!val.email && !val.username) {
      throw new Error('Provide the email or username associated with the account');
    }
    return true;
  }),
  body('email').optional().isEmail().withMessage('A valid email address must be entered')
];

module.exports = { signupValidator, loginValidator };
