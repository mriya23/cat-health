import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Dashboard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Calendar,
  ChevronDown,
  Download,
  Eye,
  Loader
} from 'lucide-react';
import { adminAPI } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const [statsRes, usersRes, analyticsRes] = await Promise.all([
          adminAPI.getStats(),
          adminAPI.getUsers(),
          adminAPI.getAnalytics(),
        ]);

        setStats(statsRes.data);
        setRecentUsers(usersRes.data);
        setAnalytics(analyticsRes.data);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to load admin dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const getStatIcon = (label) => {
    switch(label) {
      case 'Total Users': return <Users size={24} />;
      case 'Total Scans': return <FileText size={24} />;
      case 'Revenue': return <TrendingUp size={24} />;
      case 'Active Subs': return <Calendar size={24} />;
      default: return <TrendingUp size={24} />;
    }
  };

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar isAdmin={true} />
        <div className="dashboard-main">
          <DashboardHeader title="Admin Dashboard" subtitle="Clinic Mode - Overview" />
          <div className="dashboard-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <Loader size={48} className="spinning" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar isAdmin={true} />
      <div className="dashboard-main">
        <DashboardHeader title="Admin Dashboard" subtitle="Clinic Mode - Overview" />
        <div className="dashboard-content">
          {error && (
            <div className="error-banner" style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          {stats && (
            <div className="admin-stats-grid">
              {Object.values(stats).map((stat, index) => (
                <div key={index} className="admin-stat-card">
                  <div className="stat-icon-admin">{getStatIcon(stat.label)}</div>
                  <div className="stat-content">
                    <span className="stat-value-admin">{stat.value}</span>
                    <span className="stat-label-admin">{stat.label}</span>
                  </div>
                  <span className="stat-change positive">{stat.change}</span>
                </div>
              ))}
            </div>
          )}

          <div className="admin-grid">
            <div className="admin-card analytics-card">
              <div className="card-header-admin">
                <h3>Analytics</h3>
                <select className="period-select">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="analytics-list">
                {analytics.map((item, index) => (
                  <div key={index} className="analytics-item">
                    <div className="analytics-info">
                      <span className="analytics-name">{item.name}</span>
                      <span className="analytics-desc">{item.description}</span>
                    </div>
                    <span className="analytics-value">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="chart-placeholder">
                <div className="chart-bars">
                  <div className="chart-bar" style={{ height: '60%' }}></div>
                  <div className="chart-bar" style={{ height: '80%' }}></div>
                  <div className="chart-bar" style={{ height: '45%' }}></div>
                  <div className="chart-bar" style={{ height: '90%' }}></div>
                  <div className="chart-bar" style={{ height: '70%' }}></div>
                  <div className="chart-bar" style={{ height: '85%' }}></div>
                  <div className="chart-bar" style={{ height: '75%' }}></div>
                </div>
              </div>
            </div>

            <div className="admin-card users-card">
              <div className="card-header-admin">
                <h3>Recent Users</h3>
                <button className="btn btn-sm btn-outline">
                  View All
                  <ChevronDown size={14} />
                </button>
              </div>
              <div className="users-table">
                <div className="table-header">
                  <span>User</span>
                  <span>Plan</span>
                  <span>Date</span>
                  <span>Actions</span>
                </div>
                {recentUsers.map((user) => (
                  <div key={user.id} className="table-row">
                    <div className="user-cell">
                      <div className="user-avatar-admin">{user.name.charAt(0).toUpperCase()}</div>
                      <div className="user-info-admin">
                        <span className="user-name-admin">{user.name}</span>
                        <span className="user-email">{user.email}</span>
                      </div>
                    </div>
                    <span className={`plan-badge-admin ${user.plan?.toLowerCase() || 'free'}`}>
                      {user.plan || 'Free'}
                    </span>
                    <span className="date-cell">{user.date}</span>
                    <div className="actions-cell">
                      <button className="action-btn"><Eye size={14} /></button>
                      <button className="action-btn"><Download size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="admin-card quick-actions">
            <h3>Manage for Profiles</h3>
            <p>Quickly access user management and profile settings</p>
            <div className="quick-actions-grid">
              <button className="quick-action-btn">
                <Users size={20} />
                <span>User Management</span>
              </button>
              <button className="quick-action-btn">
                <FileText size={20} />
                <span>Reports</span>
              </button>
              <button className="quick-action-btn">
                <TrendingUp size={20} />
                <span>Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
