const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// GET all appointments
router.get('/', async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

// POST new appointment
router.post('/', async (req, res) => {
  const newAppt = new Appointment(req.body);
  const saved = await newAppt.save();

  const io = req.app.get('socketio');
  io.emit('appointmentAdded', saved);

  res.status(201).json(saved);
});

// PATCH cancel appointment
router.patch('/:id/cancel', async (req, res) => {
  const updated = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: 'Cancelled' },
    { new: true }
  );

  const io = req.app.get('socketio');
  io.emit('appointmentCancelled', updated);

  res.json(updated);
});

module.exports = router;