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

// GET all employees
router.get('/employees', listEmployees);

// Create employee
router.post('/employees', createEmployeeValidator, validate, createEmployee);

// Get specified employee (by id)
router.get('/employees/:emp_id', getEmployeeByIdValidator, validate, getEmployeeById);

// Update employee by id
router.put('/employees/:emp_id', updateEmployeeValidator, validate, updateEmployeeById);

// Delete by query param -> 204
router.delete('/employees', deleteEmployeeValidator, validate, deleteEmployeeById);

module.exports = router;