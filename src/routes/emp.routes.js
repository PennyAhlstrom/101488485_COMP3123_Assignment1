const express = require('express');
const router = express.Router();
const {
  listEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById
} = require('../controllers/emp.controller');

// GET all employees
router.get('/employees', listEmployees);

// Create employee
router.post('/employees', createEmployee);

// Get specified employee (by id)
router.get('/employees/:eid', getEmployeeById);

// Update employee by id
router.put('/employees/:eid', updateEmployeeById);

// Delete by query param -> 204
router.delete('/employees', deleteEmployeeById);

module.exports = router;