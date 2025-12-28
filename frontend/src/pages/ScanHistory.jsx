import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Dashboard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { Calendar, CheckCircle, AlertTriangle, Eye, Download, Loader, Upload, Trash2 } from 'lucide-react';
import { scansAPI } from '../services/api';
import './ScanHistory.css';

const ScanHistory = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
  });
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  const fetchScans = async (page = 1) => {
    try {
      setLoading(true);
      const response = await scansAPI.getAll(page);
      
      // Handle paginated response
      if (response.data.data) {
        setScans(response.data.data);
        setPagination({
          currentPage: response.data.current_page,
          lastPage: response.data.last_page,
          total: response.data.total,
        });
      } else {
        setScans(response.data);
      }
    } catch (err) {
      console.error('Error fetching scans:', err);
      setError('Failed to load scan history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScans();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.lastPage) {
      fetchScans(page);
    }
  };

  const handleDelete = async (scanId) => {
    if (!window.confirm('Are you sure you want to delete this scan?')) return;
    
    try {
      await scansAPI.delete(scanId);
      // Remove from local state
      setScans(scans.filter(scan => scan.id !== scanId));
    } catch (err) {
      alert('Failed to delete scan');
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
    const timeStr = date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return { date: dateStr, time: timeStr };
  };

  const getStatusClass = (status) => {
    if (status === 'Healthy') return 'success';
    return 'warning';
  };

  // Filter and sort scans
  const filteredScans = scans
    .filter(scan => {
      if (filter === 'all') return true;
      if (filter === 'healthy') return scan.status === 'Healthy';
      if (filter === 'attention') return scan.status !== 'Healthy';
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else {
        return new Date(a.created_at) - new Date(b.created_at);
      }
    });

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-main">
          <DashboardHeader title="Riwayat Scan" subtitle="View all your previous cat health scans" />
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
        <DashboardHeader title="Riwayat Scan" subtitle="View all your previous cat health scans" />
        <div className="dashboard-content">
          <div className="history-container">
            {error && (
              <div className="error-banner" style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                {error}
              </div>
            )}
            
            <div className="history-header">
              <h2>All Scans ({pagination.total})</h2>
              <div className="history-filters">
                <select 
                  className="filter-select" 
                  value={filter} 
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="healthy">Healthy</option>
                  <option value="attention">Needs Attention</option>
                </select>
                <select 
                  className="filter-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            <div className="history-list">
              {filteredScans.length === 0 ? (
                <div className="empty-state" style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                  <Upload size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                  <p style={{ marginBottom: '1rem' }}>No scans found. Start by uploading your first cat photo!</p>
                  <Link to="/upload" className="btn btn-primary">
                    <Upload size={18} />
                    Upload First Scan
                  </Link>
                </div>
              ) : (
                filteredScans.map((scan) => {
                  const { date, time } = formatDateTime(scan.created_at);
                  return (
                    <div key={scan.id} className="history-item">
                      <img 
                        src={scan.image_path ? `http://localhost:8000/storage/${scan.image_path}` : 'https://via.placeholder.com/100?text=Cat'} 
                        alt={scan.cat_name} 
                        className="history-image" 
                      />
                      <div className="history-info">
                        <h4 className="history-name">{scan.cat_name || 'My Cat'}</h4>
                        <p className="history-date">
                          <Calendar size={14} />
                          {date} at {time}
                        </p>
                      </div>
                      <div className="history-status">
                        <span className={`status-badge ${getStatusClass(scan.status)}`}>
                          {scan.status === 'Healthy' ? (
                            <CheckCircle size={14} />
                          ) : (
                            <AlertTriangle size={14} />
                          )}
                          {scan.status}
                        </span>
                        <span className="confidence">{scan.confidence || 0}% confidence</span>
                      </div>
                      <div className="history-actions">
                        <Link to={`/result/${scan.id}`} className="btn btn-sm btn-primary">
                          <Eye size={14} />
                          View
                        </Link>
                        <button 
                          className="btn btn-sm btn-outline btn-danger"
                          onClick={() => handleDelete(scan.id)}
                          title="Delete scan"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {pagination.lastPage > 1 && (
              <div className="history-pagination">
                <button 
                  className="btn btn-outline btn-sm"
                  disabled={pagination.currentPage === 1}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                >
                  Previous
                </button>
                <div className="page-numbers">
                  {[...Array(pagination.lastPage)].map((_, i) => (
                    <button 
                      key={i + 1}
                      className={`page-btn ${pagination.currentPage === i + 1 ? 'active' : ''}`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  className="btn btn-outline btn-sm"
                  disabled={pagination.currentPage === pagination.lastPage}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanHistory;
