import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './components/Layout';

import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import AppointmentsPage from './pages/AppointmentsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DoctorAppointmentPage from './pages/DoctorAppointmentPage';
import DoctorsPage from './pages/DoctorsPage';
import ServicesPage from './pages/ServicesPage';

import './styles/App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              localStorage.getItem('token') ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/book-appointment" element={<DoctorAppointmentPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;