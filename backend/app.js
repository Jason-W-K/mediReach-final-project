const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const patientRoutes = require('./routes/patients');
const appointmentRoutes = require('./routes/appointments');

app.use('/patients', patientRoutes);
app.use('/appointments', appointmentRoutes);

// Test route to confirm server is working
app.get('/', (req, res) => {
  res.send('API is working');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});