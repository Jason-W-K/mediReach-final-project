const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  availableSlots: {
    type: [String], // e.g., ["2025-11-13T10:00", "2025-11-13T14:30"]
    default: []
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);