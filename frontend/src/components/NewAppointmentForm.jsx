import { useState } from 'react';
import '../styles/NewAppointmentForm.css';

export default function NewAppointmentForm({ onAdd }) {
  const [form, setForm] = useState({
    patient: '',
    date: '',
    time: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patient || !form.date || !form.time) return;
    onAdd(form);
    setForm({ patient: '', date: '', time: '', status: 'Pending' });
  };

  return (
    <form className="new-appointment-form" onSubmit={handleSubmit}>
      <input name="patient" placeholder="Patient Name" value={form.patient} onChange={handleChange} />
      <input name="date" type="date" value={form.date} onChange={handleChange} />
      <input name="time" type="time" value={form.time} onChange={handleChange} />
      <button type="submit">Add Appointment</button>
    </form>
  );
}