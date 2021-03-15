const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true,
    default: Date.now
  }

});

module.exports = mongoose.model('Login', loginSchema);