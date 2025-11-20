import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/doctors')
      .then(res => setDoctors(res.data))
      .catch(err => console.error('Error fetching doctors:', err));
  }, []);

  // Extract unique specialties
  const specialties = [...new Set(doctors.map(doc => doc.specialty))];

  // Filter doctors by selected specialty
  const filteredDoctors = selectedSpecialty
    ? doctors.filter(doc => doc.specialty === selectedSpecialty)
    : doctors;

  return (
    <div>
      <h2>Available Doctors</h2>

      {/* Dropdown filter */}
      <select
        value={selectedSpecialty}
        onChange={(e) => setSelectedSpecialty(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem' }}
      >
        <option value="">All Specialties</option>
        {specialties.map((spec, index) => (
          <option key={index} value={spec}>{spec}</option>
        ))}
      </select>

      {filteredDoctors.length === 0 ? (
        <p>No doctors found for this specialty.</p>
      ) : (
        <ul>
          {filteredDoctors.map(doc => (
            <li key={doc._id}>
              <strong>{doc.name}</strong> — {doc.specialty}
              <br />
              {doc.bio}
              <br />
              Slots: {doc.availableSlots.join(', ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorsPage;