import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Dashboard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { Upload, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { label: 'Total Scans', value: '24', icon: <Upload size={24} />, color: 'primary' },
    { label: 'Pending', value: '2', icon: <Clock size={24} />, color: 'warning' },
    { label: 'Healthy', value: '18', icon: <CheckCircle size={24} />, color: 'success' },
    { label: 'Needs Attention', value: '4', icon: <AlertCircle size={24} />, color: 'error' },
  ];

  const recentScans = [
    { id: 1, name: 'Whiskers', date: 'Nov 12, 2024', status: 'Healthy', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop' },
    { id: 2, name: 'Luna', date: 'Nov 10, 2024', status: 'Minor Issue', image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=100&h=100&fit=crop' },
    { id: 3, name: 'Mochi', date: 'Nov 8, 2024', status: 'Healthy', image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=100&h=100&fit=crop' },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader title="Dashboard" />
        <div className="dashboard-content">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card stat-${stat.color}`}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <span className="stat-value">{stat.value}</span>
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
                {recentScans.map((scan) => (
                  <Link to={`/result/${scan.id}`} key={scan.id} className="scan-item">
                    <img src={scan.image} alt={scan.name} className="scan-image" />
                    <div className="scan-info">
                      <span className="scan-name">{scan.name}</span>
                      <span className="scan-date">{scan.date}</span>
                    </div>
                    <span className={`scan-status status-${scan.status === 'Healthy' ? 'success' : 'warning'}`}>
                      {scan.status}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
