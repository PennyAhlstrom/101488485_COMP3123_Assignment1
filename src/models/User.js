const mongoose = require('mongoose'); // Import mongoose library - define models and interact with db

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true }, // trim gets rid of spaces
    email:    { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } } // mongoose feature that automatically creates these fields
);

module.exports = mongoose.model('User', UserSchema); // Create the model User
