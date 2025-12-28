import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Dashboard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { Download, Share2, Calendar, CheckCircle, AlertTriangle, Info, Loader, ArrowLeft } from 'lucide-react';
import { scansAPI } from '../services/api';
import './AnalysisResult.css';

const AnalysisResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScan = async () => {
      try {
        setLoading(true);
        const response = await scansAPI.getOne(id);
        setResult(response.data.scan);
      } catch (err) {
        console.error('Error fetching scan:', err);
        setError('Failed to load scan result');
      } finally {
        setLoading(false);
      }
    };

    fetchScan();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status) => {
    if (status === 'Healthy' || status === 'Good') {
      return <CheckCircle size={20} />;
    }
    return <AlertTriangle size={20} />;
  };

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-main">
          <DashboardHeader title="Hasil Analisis" subtitle={`Scan ID: #${id}`} />
          <div className="dashboard-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <Loader size={48} className="spinning" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-main">
          <DashboardHeader title="Hasil Analisis" subtitle={`Scan ID: #${id}`} />
          <div className="dashboard-content">
            <div className="error-state" style={{ textAlign: 'center', padding: '3rem' }}>
              <AlertTriangle size={48} style={{ color: '#dc2626', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '1rem' }}>{error || 'Scan not found'}</h3>
              <Link to="/history" className="btn btn-primary">
                <ArrowLeft size={18} />
                Back to History
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Parse findings and recommendations (stored as JSON in DB)
  const findings = result.findings || [];
  const recommendations = result.recommendations || [];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader title="Hasil Analisis" subtitle={`Scan ID: #${id}`} />
        <div className="dashboard-content">
          <div className="result-container">
            <div className="result-main">
              <div className="result-card image-card">
                <div className="result-image-container">
                  <img 
                    src={result.image_path ? `http://localhost:8000/storage/${result.image_path}` : 'https://via.placeholder.com/400?text=Cat'} 
                    alt={result.cat_name} 
                    className="result-image" 
                  />
                </div>
                <div className="result-image-info">
                  <h3>{result.cat_name || 'My Cat'}</h3>
                  <p className="result-date">
                    <Calendar size={14} />
                    {formatDate(result.created_at)}
                  </p>
                </div>
              </div>

              <div className="result-card findings-card">
                <h3>Detailed Findings</h3>
                <div className="findings-list">
                  {findings.length > 0 ? (
                    findings.map((finding, index) => (
                      <div key={index} className={`finding-item ${finding.status?.toLowerCase() || 'good'}`}>
                        <div className="finding-icon">
                          {getStatusIcon(finding.status)}
                        </div>
                        <div className="finding-content">
                          <span className="finding-name">{finding.name}</span>
                          <span className="finding-desc">{finding.description}</span>
                        </div>
                        <span className={`finding-status badge badge-${finding.status === 'Good' ? 'success' : 'warning'}`}>
                          {finding.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#888' }}>No detailed findings available.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="result-sidebar">
              <div className="result-card status-card">
                <div className="status-header">
                  <h3>Prediction</h3>
                </div>
                <div className={`status-indicator ${result.status?.toLowerCase() || 'healthy'}`}>
                  {result.status === 'Healthy' ? (
                    <CheckCircle size={48} />
                  ) : (
                    <AlertTriangle size={48} />
                  )}
                  <span className="status-text">{result.status || 'Unknown'}</span>
                  <span className="confidence-text">{result.confidence || 0}% Confidence</span>
                </div>
              </div>

              <div className="result-card explanation-card">
                <div className="explanation-header">
                  <Info size={20} />
                  <h4>Explanation</h4>
                </div>
                <p>{result.explanation || 'No explanation available.'}</p>
              </div>

              <div className="result-card recommendations-card">
                <h4>Recommendations</h4>
                <ul className="recommendations-list">
                  {recommendations.length > 0 ? (
                    recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))
                  ) : (
                    <li>No recommendations available.</li>
                  )}
                </ul>
              </div>

              <div className="result-actions">
                <button className="btn btn-primary" onClick={() => window.print()}>
                  <Download size={18} />
                  Download Report
                </button>
                <button className="btn btn-outline" onClick={() => navigate('/history')}>
                  <ArrowLeft size={18} />
                  Back to History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
