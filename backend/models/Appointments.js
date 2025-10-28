const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  date: String,
  time: String,
  reason: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);