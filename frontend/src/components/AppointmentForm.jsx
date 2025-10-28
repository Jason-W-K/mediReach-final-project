import { useState } from 'react';
import api from '../services/api';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    patientId: '',
    date: '',
    reason: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/appointments', formData);
      alert('✅ Appointment created for patient ID: ' + res.data.patientId);
      setFormData({ patientId: '', date: '', reason: '' });
    } catch (err) {
      console.error(err);
      alert('❌ Error creating appointment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold">Create Appointment</h2>
      <input
        name="patientId"
        value={formData.patientId}
        onChange={handleChange}
        placeholder="Patient ID"
        className="w-full p-2 border rounded"
      />
      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="reason"
        value={formData.reason}
        onChange={handleChange}
        placeholder="Reason"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}