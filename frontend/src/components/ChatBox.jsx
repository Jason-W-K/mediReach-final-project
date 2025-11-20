import React, { useState, useEffect } from 'react';
import socket from '../socket'; // adjust path if needed
import '../styles/ChatBox.css'; // optional styling

export default function ChatBox({ roomId, sender }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Join the chat room
    socket.emit('joinRoom', roomId);

    // Listen for incoming messages
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup on unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, [roomId]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('sendMessage', {
        roomId,
        sender,
        message: input,
      });
      setInput('');
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}