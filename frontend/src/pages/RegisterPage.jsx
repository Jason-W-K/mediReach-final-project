import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword, // ✅ this was missing
      });

      console.log('✅ Registration successful:', res.data);
      alert('Account created successfully!');
      navigate('/login'); // redirect to login page
    } catch (err) {
      console.error('❌ Registration error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Your MediReach Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      <p className="login-redirect">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;