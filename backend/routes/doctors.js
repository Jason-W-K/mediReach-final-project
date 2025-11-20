const express = require('express');
const Doctor = require('../models/Doctor');

const router = express.Router();

// POST /api/doctors — Add a new doctor
router.post('/', async (req, res) => {
  const { name, specialty, bio, availableSlots } = req.body;

  try {
    const newDoctor = new Doctor({ name, specialty, bio, availableSlots });
    await newDoctor.save();
    res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
  } catch (err) {
    console.error('Doctor creation error:', err);
    res.status(500).json({ message: 'Server error while adding doctor' });
  }
});

// GET /api/doctors — Fetch all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find(); // fetch all doctors
    res.status(200).json(doctors);       // send them as JSON
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ message: 'Server error while fetching doctors' });
  }
});

module.exports = router;