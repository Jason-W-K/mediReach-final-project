import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ServicesPage.css';

const services = [
  {
    title: "General Consultation",
    description: "Talk to a doctor about everyday health concerns like colds, infections, and fatigue."
  },
  {
    title: "Chronic Condition Management",
    description: "Get support for diabetes, hypertension, asthma, and other long-term conditions."
  },
  {
    title: "Mental Health Support",
    description: "Book therapy or counseling sessions with licensed professionals."
  },
  {
    title: "Prescription Refills",
    description: "Renew your medications without visiting a clinic."
  },
  {
    title: "Lab Test Booking",
    description: "Schedule blood tests, imaging referrals, and diagnostic services."
  },
  {
    title: "Pediatric Care",
    description: "Consult a doctor for your child’s health, growth, and vaccinations."
  },
  {
    title: "Women’s Health",
    description: "Get advice on menstrual issues, pregnancy, and menopause support."
  },
  {
    title: "Vaccination Appointments",
    description: "Book flu shots, travel vaccines, and routine immunizations."
  },
  {
    title: "Dermatology",
    description: "Treat skin conditions like acne, rashes, and eczema with expert care."
  },
  {
    title: "Nutrition & Dietetics",
    description: "Plan meals and manage weight with a certified nutritionist."
  }
];

const ServicesPage = () => {
  return (
    <div className="services-container">
      <h2>Our Services</h2>
      <p className="intro-text">
        MediReach connects you with trusted healthcare providers for a wide range of medical needs.
        Browse below and book the service that fits your health journey.
      </p>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <Link to="/register">
              <button className="book-button">Book Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;