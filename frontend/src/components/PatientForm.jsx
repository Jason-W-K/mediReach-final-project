import { useState } from 'react';
import api from '../services/api';

export default function PatientForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    contact: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/patients', formData);
      alert('✅ Patient created: ' + res.data.name);
      setFormData({ name: '', age: '', contact: '' }); // Clear form
    } catch (err) {
      console.error(err);
      alert('❌ Error creating patient');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold">Create Patient</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border rounded"
      />
      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        className="w-full p-2 border rounded"
      />
      <input
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        placeholder="Contact"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}