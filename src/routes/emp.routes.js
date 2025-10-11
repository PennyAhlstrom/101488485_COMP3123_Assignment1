const express = require('express');
const router = express.Router();
const {
  listEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById
} = require('../controllers/emp.controller');

const validate = require('../middleware/validate');
const {
  createEmployeeValidator,
  updateEmployeeValidator,
  getEmployeeByIdValidator,
  deleteEmployeeValidator
} = require('../validators/employee.validators');


const auth = require('../middleware/auth');

// Get requests doesnt require authentification but create, update and delete does
// /api/v1/emp

// GET all employees
router.get('/employees', listEmployees);

// Create employee
router.post('/employees', auth, createEmployeeValidator, validate, createEmployee);

// Get specified employee (by id)
router.get('/employees/:emp_id', getEmployeeByIdValidator, validate, getEmployeeById);

// Update employee by id
router.put('/employees/:emp_id', auth, updateEmployeeValidator, validate, updateEmployeeById);

// Delete - 204
router.delete('/employees/:emp_id', auth, deleteEmployeeValidator, validate, deleteEmployeeById);

// to make all employee routes protected use: router.use(auth);

module.exports = router;