import { useParams, Link } from 'react-router-dom';
import { Sidebar } from '../components/Dashboard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { Download, Share2, Calendar, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import './AnalysisResult.css';

const AnalysisResult = () => {
  const { id } = useParams();

  // Mock data for the analysis result
  const result = {
    id: id,
    catName: 'Kucing Manja Kenali Day 2',
    date: 'Nov 12, 2024',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
    overallStatus: 'Healthy',
    confidence: 92,
    findings: [
      { name: 'Coat Condition', status: 'Good', description: 'Healthy and shiny coat' },
      { name: 'Eye Health', status: 'Good', description: 'Clear eyes, no discharge' },
      { name: 'Skin Condition', status: 'Attention', description: 'Minor dryness detected' },
      { name: 'Overall Health', status: 'Good', description: 'Cat appears healthy' },
    ],
    recommendations: [
      'Consider increasing omega-3 fatty acids in diet',
      'Monitor skin condition for any changes',
      'Regular grooming recommended',
      'Schedule annual vet checkup',
    ],
    explanation: 'Berdasarkan analisis AI, kucing Anda menunjukkan kondisi kesehatan yang baik secara keseluruhan. Terdapat sedikit kekeringan pada kulit yang perlu diperhatikan tetapi tidak memerlukan tindakan medis segera.',
  };

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
                  <img src={result.image} alt={result.catName} className="result-image" />
                </div>
                <div className="result-image-info">
                  <h3>{result.catName}</h3>
                  <p className="result-date">
                    <Calendar size={14} />
                    {result.date}
                  </p>
                </div>
              </div>

              <div className="result-card findings-card">
                <h3>Detailed Findings</h3>
                <div className="findings-list">
                  {result.findings.map((finding, index) => (
                    <div key={index} className={`finding-item ${finding.status.toLowerCase()}`}>
                      <div className="finding-icon">
                        {finding.status === 'Good' ? (
                          <CheckCircle size={20} />
                        ) : (
                          <AlertTriangle size={20} />
                        )}
                      </div>
                      <div className="finding-content">
                        <span className="finding-name">{finding.name}</span>
                        <span className="finding-desc">{finding.description}</span>
                      </div>
                      <span className={`finding-status badge badge-${finding.status === 'Good' ? 'success' : 'warning'}`}>
                        {finding.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="result-sidebar">
              <div className="result-card status-card">
                <div className="status-header">
                  <h3>Prediction</h3>
                </div>
                <div className={`status-indicator ${result.overallStatus.toLowerCase()}`}>
                  <CheckCircle size={48} />
                  <span className="status-text">{result.overallStatus}</span>
                  <span className="confidence-text">{result.confidence}% Confidence</span>
                </div>
              </div>

              <div className="result-card explanation-card">
                <div className="explanation-header">
                  <Info size={20} />
                  <h4>Explanation</h4>
                </div>
                <p>{result.explanation}</p>
              </div>

              <div className="result-card recommendations-card">
                <h4>Recommendations</h4>
                <ul className="recommendations-list">
                  {result.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>

              <div className="result-actions">
                <button className="btn btn-primary">
                  <Download size={18} />
                  Download Report
                </button>
                <button className="btn btn-outline">
                  <Share2 size={18} />
                  Share with Vet
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
