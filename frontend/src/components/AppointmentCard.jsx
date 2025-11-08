import '../styles/AppointmentCard.css';

export default function AppointmentCard({ patient, date, time, status, onCancel }) {
  const statusColor = {
    Confirmed: '#28a745',
    Pending: '#ffc107',
    Completed: '#6c757d',
    Cancelled: '#dc3545',
  }[status] || '#0077cc';

  return (
    <div className="appointment-card">
      <h3>{patient}</h3>
      <p>{date} at {time}</p>
      <p>
        <strong>Status:</strong>{' '}
        <span style={{ color: statusColor }}>{status}</span>
      </p>
      <div className="card-actions">
        <button>Reschedule</button>
        <button className="danger" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}