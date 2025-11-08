const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);