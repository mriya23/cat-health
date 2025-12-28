import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import UploadScan from './pages/UploadScan';
import AnalysisResult from './pages/AnalysisResult';
import ScanHistory from './pages/ScanHistory';
import Billing from './pages/Billing';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadScan />} />
          <Route path="/result/:id" element={<AnalysisResult />} />
          <Route path="/history" element={<ScanHistory />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
