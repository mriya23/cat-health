import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Dashboard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { Upload, Clock, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { scansAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_scans: 0,
    pending: 0,
    healthy: 0,
    attention: 0,
  });
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch statistics and recent scans in parallel
        const [statsResponse, scansResponse] = await Promise.all([
          scansAPI.getStatistics(),
          scansAPI.getAll(1), // Get first page of scans
        ]);

        setStats(statsResponse.data);
        
        // Get only the first 5 scans for recent scans display
        const scans = scansResponse.data.data || scansResponse.data;
        setRecentScans(Array.isArray(scans) ? scans.slice(0, 5) : []);
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsConfig = [
    { key: 'total_scans', label: 'Total Scans', icon: <Upload size={24} />, color: 'primary' },
    { key: 'pending', label: 'Pending', icon: <Clock size={24} />, color: 'warning' },
    { key: 'healthy', label: 'Healthy', icon: <CheckCircle size={24} />, color: 'success' },
    { key: 'attention', label: 'Needs Attention', icon: <AlertCircle size={24} />, color: 'error' },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getStatusClass = (status) => {
    if (status === 'Healthy') return 'success';
    if (status === 'Pending') return 'warning';
    return 'warning';
  };

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-main">
          <DashboardHeader title="Dashboard" />
          <div className="dashboard-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <Loader size={48} className="spinning" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader title="Dashboard" />
        <div className="dashboard-content">
          {error && (
            <div className="error-banner" style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          
          <div className="stats-grid">
            {statsConfig.map((stat) => (
              <div key={stat.key} className={`stat-card stat-${stat.color}`}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <span className="stat-value">{stats[stat.key] || 0}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card upload-card">
              <h3>Quick Scan</h3>
              <p>Upload a photo to start a new health scan for your cat</p>
              <Link to="/upload" className="btn btn-primary">
                <Upload size={18} />
                Start New Scan
              </Link>
            </div>

            <div className="dashboard-card recent-scans-card">
              <div className="card-header">
                <h3>Recent Scans</h3>
                <Link to="/history" className="view-all">View All</Link>
              </div>
              <div className="recent-scans-list">
                {recentScans.length === 0 ? (
                  <div className="empty-state" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                    <p>No scans yet. Start your first scan!</p>
                    <Link to="/upload" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                      <Upload size={18} />
                      Upload First Scan
                    </Link>
                  </div>
                ) : (
                  recentScans.map((scan) => (
                    <Link to={`/result/${scan.id}`} key={scan.id} className="scan-item">
                      <img 
                        src={scan.image_path ? `http://localhost:8000/storage/${scan.image_path}` : 'https://via.placeholder.com/100?text=Cat'} 
                        alt={scan.cat_name} 
                        className="scan-image" 
                      />
                      <div className="scan-info">
                        <span className="scan-name">{scan.cat_name || 'My Cat'}</span>
                        <span className="scan-date">{formatDate(scan.created_at)}</span>
                      </div>
                      <span className={`scan-status status-${getStatusClass(scan.status)}`}>
                        {scan.status}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
