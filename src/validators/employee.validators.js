const { body, param, query } = require('express-validator');

const createEmployeeValidator = [
  body('first_name').trim().notEmpty().withMessage('Enter First Name'),
  body('last_name').trim().notEmpty().withMessage('Enter Last Name'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('position').trim().notEmpty().withMessage('Enter the position'),
  body('salary').isNumeric().withMessage('The salary must be a number'),
  body('date_of_joining').isISO8601().toDate().withMessage('Enter a valid date'),
  body('department').trim().notEmpty().withMessage('Enter the department')
];

const updateEmployeeValidator = [
  param('emp_id').isMongoId().withMessage('Employee ID must be a valid Mongo ID'),
  body('email').optional().isEmail().withMessage('The email address must be valid'),
  body('salary').optional().isNumeric().withMessage('The salary must be a number'),
  body('date_of_joining').optional().isISO8601().toDate().withMessage('Enter a valid date')
];

const getEmployeeByIdValidator = [
  param('emp_id').isMongoId().withMessage('Employee ID must be a valid Mongo ID')
];

const deleteEmployeeValidator = [
  query('emp_id').isMongoId().withMessage('Employee ID must be a valid Mongo ID')
];

module.exports = {
  createEmployeeValidator,
  updateEmployeeValidator,
  getEmployeeByIdValidator,
  deleteEmployeeValidator
};
