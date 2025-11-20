import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link
          to="/"
          className="logo-link"
          style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
        >
          <img src="/images/medicalicon.jpeg" alt="MediReach Icon" className="medireach-icon" />
          <div className="logo-text">
            <h2>MediReach</h2>
            <p className="motto">Your Health, Our Reach</p>
          </div>
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/appointments" className="nav-link" onClick={() => setMenuOpen(false)}>Appointments</Link>
          <Link to="/book-appointment" className="nav-link" onClick={() => setMenuOpen(false)}>Book Appointment</Link>
        </div>
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <span className="welcome-text">Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="nav-button logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">
              <button className="nav-button">Register</button>
            </Link>
            <Link to="/login">
              <button className="nav-button">Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}