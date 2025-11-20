import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorAppointmentPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+254');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/doctors')
      .then(res => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching doctors:', err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctorId || !date || !time || !patientName || !email || !phone) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/appointments', {
        doctorId: selectedDoctorId,
        patientName,
        email,
        phone: `${countryCode}${phone}`,
        slot: `${date}T${time}`,
        reason: symptoms
      });

      alert('Appointment booked successfully!');
      setSelectedDoctorId('');
      setDate('');
      setTime('');
      setSymptoms('');
      setPatientName('');
      setEmail('');
      setPhone('');
      setCountryCode('+254');
    } catch (err) {
      console.error('Booking error:', err);
      alert('Failed to book appointment.');
    }
  };

  return (
    <div className="appointment-page">
      <h2>Book a Doctor Appointment</h2>

      <form onSubmit={handleSubmit}>
        <label>Choose Doctor:</label>
        <select value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)}>
          <option value="">Select a doctor</option>
          {loading ? (
            <option disabled>Loading doctors...</option>
          ) : (
            doctors.map(doc => (
              <option key={doc._id} value={doc._id}>
                {doc.name} — {doc.specialty}
              </option>
            ))
          )}
        </select>

        <label>Your Name:</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Enter your name"
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label>Phone Number:</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
            <option value="+254">🇰🇪 +254</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+91">🇮🇳 +91</option>
          </select>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>

        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

        <label>Reason for Visit:</label>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms or reason..."
        />

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default DoctorAppointmentPage;