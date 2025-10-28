import PatientForm from './components/PatientForm';
import AppointmentForm from './components/AppointmentForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">MediReach Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PatientForm />
        <AppointmentForm />
      </div>
    </div>
  );
}

export default App;