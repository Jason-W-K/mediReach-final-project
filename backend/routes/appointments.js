const express = require('express');
const router = express.Router();
const { createAppointment, getAllAppointments } = require('../controllers/appointmentController');

// Create a new appointment
router.post('/', createAppointment);

// Get all appointments
router.get('/', getAllAppointments);

module.exports = router;