import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav>
      <h2>MediReach</h2>
      <div>
        <Link to="/">Dashboard</Link> | <Link to="/appointments">Appointments</Link>
      </div>
    </nav>
  );
}