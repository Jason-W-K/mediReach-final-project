const express = require('express');
const router = express.Router();
const { createPatient, getAllPatients } = require('../controllers/patientController');

// Test route to confirm patients router is working
router.get('/test', (req, res) => {
  res.send('Patients route is working');
});

// Create a new patient
router.post('/', createPatient);

// Get all patients
router.get('/', getAllPatients);

module.exports = router;