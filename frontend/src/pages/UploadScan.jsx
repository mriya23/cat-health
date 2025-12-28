import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Dashboard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { Upload, Image, X, Loader2 } from 'lucide-react';
import { scansAPI } from '../services/api';
import './UploadScan.css';

const UploadScan = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [catName, setCatName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleFile = (file) => {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }
    
    setFile(file);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', file);
      if (catName.trim()) {
        formData.append('cat_name', catName.trim());
      }

      const response = await scansAPI.create(formData);
      
      // Navigate to result page with the new scan ID
      navigate(`/result/${response.data.scan.id}`);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload and analyze image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader title="Upload & Scan" subtitle="Upload a photo of your cat for AI analysis" />
        <div className="dashboard-content">
          <div className="upload-container">
            <div className="upload-card-main">
              {error && (
                <div className="error-banner" style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                  {error}
                </div>
              )}
              
              <div 
                className={`upload-dropzone ${isDragging ? 'dragging' : ''} ${preview ? 'has-file' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !preview && fileInputRef.current?.click()}
              >
                {preview ? (
                  <div className="preview-container">
                    <img src={preview} alt="Preview" className="preview-image" />
                    <button className="remove-file-btn" onClick={(e) => { e.stopPropagation(); removeFile(); }}>
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="dropzone-content">
                    <div className="dropzone-icon">
                      <Upload size={48} />
                    </div>
                    <h3>Drag & drop Zone</h3>
                    <p>Drag your cat's photo here or click to browse</p>
                    <span className="file-types">Supports: JPG, PNG, WEBP (Max 10MB)</span>
                  </div>
                )}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/jpeg,image/png,image/jpg,image/webp" 
                  onChange={handleFileSelect}
                  className="file-input"
                />
              </div>

              {file && (
                <div className="file-info">
                  <Image size={20} />
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              )}

              {/* Cat Name Input */}
              <div className="cat-name-input" style={{ marginTop: '1rem' }}>
                <label htmlFor="catName" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                  Cat Name (Optional)
                </label>
                <input
                  type="text"
                  id="catName"
                  placeholder="Enter your cat's name"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                  }}
                />
              </div>

              <button 
                className={`btn btn-primary btn-lg submit-btn ${isUploading ? 'loading' : ''}`}
                onClick={handleSubmit}
                disabled={!file || isUploading}
                style={{ marginTop: '1.5rem' }}
              >
                {isUploading ? (
                  <>
                    <Loader2 size={20} className="spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Start Analysis
                  </>
                )}
              </button>
            </div>

            <div className="upload-tips">
              <h4>Tips for Best Results</h4>
              <ul>
                <li>Use good lighting</li>
                <li>Keep the cat in focus</li>
                <li>Include affected areas clearly</li>
                <li>Avoid blurry images</li>
                <li>Take multiple angles if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadScan;
