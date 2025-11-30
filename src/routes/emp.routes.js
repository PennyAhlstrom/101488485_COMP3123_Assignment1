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

// Route added for Assignment 2
// SEARCH employees by department or position
router.get('/search', async (req, res) => {
  try {
    const { department, position } = req.query;

    const query = {};

    if (department) {
      query.department = { $regex: department, $options: "i" }; // case-insensitive
    }

    if (position) {
      query.position = { $regex: position, $options: "i" };
    }

    const employees = await Employee.find(query);

    return res.status(200).json({
      success: true,
      count: employees.length,
      employees
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


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