import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="hero-grid">
        <div className="hero-left">
          <h1>You Need It, We Find It</h1>
          <p>Book doctor appointments and get reminders for your health needs.</p>
          <p className="subtext">
            MediReach is a free, mission-driven platform that helps you find and book medical services.
            You can also submit your own requests for assistance.
          </p>
          <Link to="/services">
            <button className="cta-button red">View Services</button>
          </Link>
        </div>

        <div className="hero-right">
          <div className="image-box">
            <img src="/images/doctorandpatient.jpg" alt="Doctor and patient" />
            <div className="overlay-card">
              <h3>Have an infection?</h3>
              <p>Avoid long waits by booking a doctor appointment for common ailments.</p>
              <Link to="/services">
                <button className="cta-button red">Search</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>What is MediReach?</h2>
        <p>
          MediReach is a free, mission-driven platform that helps you book doctor appointments and receive real-time reminders.
          Whether you're managing a chronic condition or need a quick consultation, MediReach connects you with trusted healthcare providers — fast and securely.
        </p>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>🔍 Find</h3>
            <p>Browse available doctors and choose the right one for your needs.</p>
          </div>
          <div className="step">
            <h3>📅 Book</h3>
            <p>Schedule your appointment in seconds — no calls, no paperwork.</p>
          </div>
          <div className="step">
            <h3>⏰ Get Reminded</h3>
            <p>Receive real-time reminders so you never miss a visit again.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to take control of your health?</h2>
        <div className="cta-buttons">
          <Link to="/register"><button>Register</button></Link>
          <Link to="/services"><button>Book Appointment</button></Link>
          <Link to="/shop"><button>Visit Shop</button></Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;