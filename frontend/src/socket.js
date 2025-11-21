import { io } from 'socket.io-client';

// Use environment variable for flexibility
const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');

export default socket;