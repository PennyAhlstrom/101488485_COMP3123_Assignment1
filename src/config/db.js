const mongoose = require('mongoose'); // Import mongoose package to connect to MongoDB db

async function connectDB(uri) {       // Pass in connection string - uri
  mongoose.set('strictQuery', true);  // True - queries must match defined schema fields
  await mongoose.connect(uri);          // Method to connect to db, pause here until success or failed
  console.log('✅ MongoDB connected');
}

module.exports = connectDB;     // Export to make connectDB function available to other project files