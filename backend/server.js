const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create Express app and HTTP server
const app = express();
const http = require('http').createServer(app);

// Setup Socket.IO
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH'],
  },
});

// Make io available in routes
app.set('socketio', io);

// Middleware
app.use(cors());
app.use(express.json());

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('🔌 Socket connected:', socket.id);

  // Appointment events
  socket.on('appointmentAdded', (appt) => {
    io.emit('appointmentAdded', appt);
  });

  socket.on('appointmentCancelled', (appt) => {
    io.emit('appointmentCancelled', appt);
  });

  // ✅ Chat events
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`🟢 ${socket.id} joined room ${roomId}`);
  });

  socket.on('sendMessage', ({ roomId, sender, message }) => {
    io.to(roomId).emit('receiveMessage', {
      sender,
      message,
      timestamp: Date.now(),
    });
  });
});

// Route imports
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const doctorRoutes = require('./routes/doctors');

// MongoDB connection and server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    // Mount routes after DB is ready
    app.use('/api', authRoutes);
    app.use('/api/appointments', appointmentRoutes);
    app.use('/api/doctors', doctorRoutes);

    // Root route
    app.get('/', (req, res) => {
      res.send('MediReach backend is running');
    });

    // Start server
    const PORT = process.env.PORT || 5000;
    http.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });