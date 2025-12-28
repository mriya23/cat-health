import { Sidebar } from '../components/Dashboard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Calendar,
  ChevronDown,
  Download,
  Eye
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: <Users size={24} /> },
    { label: 'Total Scans', value: '5,678', change: '+8%', icon: <FileText size={24} /> },
    { label: 'Revenue', value: 'Rp 45.6M', change: '+15%', icon: <TrendingUp size={24} /> },
    { label: 'Active Subs', value: '892', change: '+5%', icon: <Calendar size={24} /> },
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'Pro', date: 'Nov 12, 2024' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'Free', date: 'Nov 11, 2024' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', plan: 'Clinic', date: 'Nov 10, 2024' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', plan: 'Pro', date: 'Nov 9, 2024' },
  ];

  const analytics = [
    { name: 'User Profiles', value: '89%', description: 'Profile completion rate' },
    { name: 'Scan Ratio', value: '4.2', description: 'Average scans per user' },
    { name: 'Retention', value: '78%', description: 'Monthly retention rate' },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar isAdmin={true} />
      <div className="dashboard-main">
        <DashboardHeader title="Admin Dashboard" subtitle="Clinic Mode - Overview" />
        <div className="dashboard-content">
          <div className="admin-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="admin-stat-card">
                <div className="stat-icon-admin">{stat.icon}</div>
                <div className="stat-content">
                  <span className="stat-value-admin">{stat.value}</span>
                  <span className="stat-label-admin">{stat.label}</span>
                </div>
                <span className="stat-change positive">{stat.change}</span>
              </div>
            ))}
          </div>

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
                      <div className="user-avatar-admin">{user.name.charAt(0)}</div>
                      <div className="user-info-admin">
                        <span className="user-name-admin">{user.name}</span>
                        <span className="user-email">{user.email}</span>
                      </div>
                    </div>
                    <span className={`plan-badge-admin ${user.plan.toLowerCase()}`}>{user.plan}</span>
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
