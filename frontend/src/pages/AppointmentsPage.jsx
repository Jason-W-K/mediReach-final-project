import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import AppointmentCard from '../components/AppointmentCard';
import NewAppointmentForm from '../components/NewAppointmentForm';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Load appointments from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/appointments')
      .then(res => setAppointments(res.data))
      .catch(err => console.error('Fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  // Listen for real-time updates
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('appointmentAdded', (newAppt) => {
      setAppointments(prev => [...prev, newAppt]);
    });

    socket.on('appointmentCancelled', (updatedAppt) => {
      setAppointments(prev =>
        prev.map(appt => appt._id === updatedAppt._id ? updatedAppt : appt)
      );
    });

    return () => socket.disconnect();
  }, []);

  const addAppointment = (newAppt) => {
    axios.post('http://localhost:5000/api/appointments', newAppt)
      .then(res => setAppointments(prev => [...prev, res.data]))
      .catch(err => console.error('Add error:', err));
  };

  const cancelAppointment = (id) => {
    axios.patch(`http://localhost:5000/api/appointments/${id}/cancel`)
      .then(res => {
        setAppointments(prev =>
          prev.map(appt => appt._id === id ? res.data : appt)
        );
      })
      .catch(err => console.error('Cancel error:', err));
  };

  const filteredAppointments = appointments
    .filter(appt =>
      (filter === 'All' || appt.status === filter) &&
      appt.patient.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });

  return (
    <div>
      <h2>Appointments</h2>
      <NewAppointmentForm onAdd={addAppointment} />

      <div style={{ marginBottom: '1rem' }}>
        <label>Search by patient name: </label>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="e.g. Jane Doe"
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Filter by status: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option>All</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      {loading ? (
        <p>Loading appointments...</p>
      ) : filteredAppointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        filteredAppointments.map(appt => (
          <AppointmentCard
            key={appt._id}
            patient={appt.patient}
            date={appt.date}
            time={appt.time}
            status={appt.status}
            onCancel={() => cancelAppointment(appt._id)}
          />
        ))
      )}
    </div>
  );
}