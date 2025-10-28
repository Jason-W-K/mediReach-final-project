const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  contact: String
});

module.exports = mongoose.model('Patient', patientSchema);