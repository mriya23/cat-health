import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Dashboard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { Calendar, CheckCircle, AlertTriangle, Eye, Download } from 'lucide-react';
import './ScanHistory.css';

const ScanHistory = () => {
  const scans = [
    {
      id: 1,
      catName: 'Whiskers',
      date: 'Nov 12, 2024',
      time: '14:30',
      status: 'Healthy',
      confidence: 95,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      catName: 'Luna',
      date: 'Nov 10, 2024',
      time: '09:15',
      status: 'Minor Issue',
      confidence: 87,
      image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      catName: 'Mochi',
      date: 'Nov 8, 2024',
      time: '16:45',
      status: 'Healthy',
      confidence: 92,
      image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=100&h=100&fit=crop',
    },
    {
      id: 4,
      catName: 'Tiger',
      date: 'Nov 5, 2024',
      time: '11:20',
      status: 'Healthy',
      confidence: 94,
      image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=100&h=100&fit=crop',
    },
    {
      id: 5,
      catName: 'Bella',
      date: 'Nov 3, 2024',
      time: '13:00',
      status: 'Attention',
      confidence: 78,
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=100&h=100&fit=crop',
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader title="Riwayat Scan" subtitle="View all your previous cat health scans" />
        <div className="dashboard-content">
          <div className="history-container">
            <div className="history-header">
              <h2>All Scans</h2>
              <div className="history-filters">
                <select className="filter-select">
                  <option value="all">All Status</option>
                  <option value="healthy">Healthy</option>
                  <option value="attention">Needs Attention</option>
                </select>
                <select className="filter-select">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            <div className="history-list">
              {scans.map((scan) => (
                <div key={scan.id} className="history-item">
                  <img src={scan.image} alt={scan.catName} className="history-image" />
                  <div className="history-info">
                    <h4 className="history-name">{scan.catName}</h4>
                    <p className="history-date">
                      <Calendar size={14} />
                      {scan.date} at {scan.time}
                    </p>
                  </div>
                  <div className="history-status">
                    <span className={`status-badge ${scan.status === 'Healthy' ? 'success' : 'warning'}`}>
                      {scan.status === 'Healthy' ? (
                        <CheckCircle size={14} />
                      ) : (
                        <AlertTriangle size={14} />
                      )}
                      {scan.status}
                    </span>
                    <span className="confidence">{scan.confidence}% confidence</span>
                  </div>
                  <div className="history-actions">
                    <Link to={`/result/${scan.id}`} className="btn btn-sm btn-primary">
                      <Eye size={14} />
                      View
                    </Link>
                    <button className="btn btn-sm btn-outline">
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="history-pagination">
              <button className="btn btn-outline btn-sm">Previous</button>
              <div className="page-numbers">
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
              </div>
              <button className="btn btn-outline btn-sm">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanHistory;
