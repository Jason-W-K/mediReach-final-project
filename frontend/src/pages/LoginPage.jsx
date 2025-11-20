import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to MediReach</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;