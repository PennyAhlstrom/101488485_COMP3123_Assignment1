const Employee = require('../models/Employee'); // Import the model

function toEmployeeDTO(doc) { // Convert Mongodb document into data transfer object for consistent api responses
  return {
    employee_id: doc._id.toString(),
    first_name: doc.first_name,
    last_name: doc.last_name,
    email: doc.email,
    position: doc.position,
    salary: doc.salary,
    date_of_joining: doc.date_of_joining,
    department: doc.department
  };
}

// GET /api/v1/emp/employees  (code 200 - OK)
exports.listEmployees = async (req, res) => {
  try {
    const docs = await Employee.find().sort({ created_at: -1 }); // Get all empoyee records from the database and sort by creating date
    return res.status(200).json(docs.map(toEmployeeDTO)); // convert to dto for consistent json
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};

// POST /api/v1/emp/employees  (code 201 - Created)
exports.createEmployee = async (req, res) => { // Add a new employee to the list based on inputted data
  try {
    const doc = await Employee.create(req.body);
    return res.status(201).json({
      message: 'Employee created successfully.',
      employee_id: doc._id.toString()
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};

// GET /api/v1/emp/employees/:eid  (code 200)
exports.getEmployeeById = async (req, res) => {  // Find a specific employee
  try {
    const { emp_id } = req.params;
    const doc = await Employee.findById(emp_id);
    if (!doc) return res.status(404).json({ status: false, message: 'Employee not found' });
    return res.status(200).json(toEmployeeDTO(doc));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};

// PUT /api/v1/emp/employees/:eid (code 200)
exports.updateEmployeeById = async (req, res) => {
  try {
    const { emp_id } = req.params;
    const updated = await Employee.findByIdAndUpdate(emp_id, req.body, { new: true }); // Update the fields passed from client
    if (!updated) return res.status(404).json({ status: false, message: 'Employee not found' });

    // Spec wants only a message for 200
    return res.status(200).json({ message: 'Employee details updated successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};

// DELETE /api/v1/emp/employees/:emp_id (code 204 - no response body needed)
exports.deleteEmployeeById = async (req, res) => {
  try {
    const { emp_id } = req.params;
    const deleted = await Employee.findByIdAndDelete(emp_id);

    if (!deleted) {
      return res.status(404).json({ status: false, message: 'Employee not found' });
    }

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};
