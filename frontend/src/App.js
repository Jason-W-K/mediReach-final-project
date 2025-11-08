import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AppointmentsPage from './pages/AppointmentsPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;