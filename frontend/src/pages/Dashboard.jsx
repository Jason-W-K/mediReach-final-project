import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../socket'; // adjust path if needed
import ChatBox from '../components/ChatBox'; // make sure this exists
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();

    socket.on('appointmentAdded', (appt) => {
      alert(`📅 Reminder: ${appt.patientName}, your appointment is booked for ${appt.slot}`);
      fetchAppointments();
    });

    socket.on('appointmentCancelled', (appt) => {
      alert(`❌ Appointment cancelled for ${appt.patientName}`);
      fetchAppointments();
    });

    return () => {
      socket.off('appointmentAdded');
      socket.off('appointmentCancelled');
    };
  }, []);

  const fetchAppointments = () => {
    axios
      .get('http://localhost:5000/api/appointments')
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error('Error fetching appointments:', err));
  };

  const cancelAppointment = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/appointments/${id}/cancel`);
      fetchAppointments();
    } catch (err) {
      console.error('Cancel error:', err);
      alert('Failed to cancel appointment.');
    }
  };

  const getCountdown = (slot) => {
    const now = new Date();
    const apptDate = new Date(slot);
    const diffMs = apptDate - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `Your appointment is in ${diffDays} day(s)` : `Your appointment is today`;
  };

  const upcoming = appointments.find((appt) => appt.status !== 'Cancelled');

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>This is your central hub for appointments, reminders, and patient insights.</p>

      {/* ✅ Patient Profile Snapshot */}
      <div className="dashboard-section patient-profile">
        <h3>Patient Profile</h3>
        <div className="profile-grid">
          <div><strong>👤 Name:</strong> Jason Wamwea Kamau</div>
          <div><strong>🎂 Age:</strong> 29</div>
          <div><strong>🏥 Insurance:</strong> NHIF - Kenya</div>
          <div><strong>📞 Emergency Contact:</strong> +254 712 345678</div>
        </div>
      </div>

      {/* ✅ Upcoming Appointment Preview */}
      {upcoming && (
        <div className="dashboard-section upcoming-appointment">
          <h3>Upcoming Appointment</h3>
          <div className="appointment-card">
            <p><strong>Doctor ID:</strong> {upcoming.doctorId || 'N/A'}</p>
            <p><strong>Patient:</strong> {upcoming.patientName}</p>
            <p><strong>Slot:</strong> {new Date(upcoming.slot).toLocaleString()}</p>
            <p className="countdown">{getCountdown(upcoming.slot)}</p>
            <div className="appointment-actions">
              <button className="reschedule">Reschedule</button>
              <button className="cancel" onClick={() => cancelAppointment(upcoming._id)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Smart Reminders Section */}
      <div className="dashboard-section smart-reminders">
        <h3>Smart Reminders</h3>
        <ul className="reminder-list">
          <li>💊 Take your blood pressure medication at 8:00 PM</li>
          <li>📅 Schedule a follow-up for your diabetes checkup</li>
          <li>💉 Flu vaccine due this month — book now</li>
        </ul>
      </div>

      {/* ✅ Health Summary Cards */}
      <div className="dashboard-section health-summary">
        <h3>Health Summary</h3>
        <div className="summary-grid">
          <div className="summary-card">
            <h4>🩺 Blood Pressure</h4>
            <p>120/80 mmHg</p>
          </div>
          <div className="summary-card">
            <h4>🍬 Glucose Level</h4>
            <p>95 mg/dL</p>
          </div>
          <div className="summary-card">
            <h4>⚖️ Weight</h4>
            <p>68 kg</p>
          </div>
        </div>
      </div>

      {/* ✅ Quick Access Shortcuts */}
      <div className="dashboard-section quick-actions">
        <h3>Quick Access</h3>
        <div className="action-grid">
          <button onClick={() => window.location.href = '/book-appointment'}>📅 Book Appointment</button>
          <button onClick={() => alert('Prescriptions feature coming soon!')}>💊 View Prescriptions</button>
          <button onClick={() => alert('Support team will be available shortly.')}>📞 Contact Support</button>
        </div>
      </div>

      {/* ✅ Notifications & Messages */}
      <div className="dashboard-section notifications">
        <h3>Notifications & Messages</h3>
        <ul className="notification-list">
          <li>📨 Your lab results are ready — view in your records</li>
          <li>📣 Dr. Amina Otieno sent you a message: “Please confirm your availability for next week.”</li>
          <li>⚠️ Appointment rescheduled to Friday at 2:00 PM</li>
        </ul>
      </div>

      {/* ✅ Live Support Chat */}
      <div className="dashboard-section live-chat">
        <h3>Live Support Chat</h3>
        <ChatBox roomId="support" sender="Jason" />
      </div>

      {/* ✅ Full Appointment List */}
      <h3>Booked Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id} style={{ marginBottom: '1rem' }}>
              <strong>Doctor ID:</strong> {appt.doctorId || 'N/A'}
              <br />
              <strong>Patient:</strong> {appt.patientName}
              <br />
              <strong>Slot:</strong> {new Date(appt.slot).toLocaleString()}
              <br />
              <strong>Status:</strong> {appt.status || 'Confirmed'}
              <br />
              {appt.status !== 'Cancelled' && (
                <button onClick={() => cancelAppointment(appt._id)}>Cancel Appointment</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}