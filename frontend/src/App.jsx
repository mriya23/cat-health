import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import UploadScan from './pages/UploadScan';
import AnalysisResult from './pages/AnalysisResult';
import ScanHistory from './pages/ScanHistory';
import Billing from './pages/Billing';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadScan />} />
        <Route path="/result/:id" element={<AnalysisResult />} />
        <Route path="/history" element={<ScanHistory />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
