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

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
});

// Routes
const appointmentRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('MediReach backend is running');
});

// Start server
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));