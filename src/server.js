require('dotenv').config(); // use information in .env file

// core dependencies
const express = require('express'); // Web framework, server core
const cors = require('cors');       // Cross-origin resource sharing (front-end react can call from a different domain)
const connectDB = require('./config/db'); // database connection
const morgan = require('morgan');    // HTTP request logger middleware  

// importning routes
const userRoutes = require('./routes/user.routes');
const empRoutes = require('./routes/emp.routes');

const app = express(); // create the app (represents entire web server)

// middleware
app.use(cors()); // allows request from frontend (other origins)
app.use(express.json()); // parses JSON to access req.body
app.use(morgan('dev')); // logs incoming request to console


// routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', empRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ status: false, message: 'Not found' });
});

// start server (after DB connects)
const PORT = process.env.PORT || 8080; // PORT is specified in .env - default 8080
connectDB(process.env.MONGODB_URI) // attemps connection to mondodb
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Mongo connection failed:', err);
    process.exit(1);
  });
