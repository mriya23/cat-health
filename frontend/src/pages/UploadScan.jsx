import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Dashboard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { Upload, Image, X, Loader2 } from 'lucide-react';
import './UploadScan.css';

const UploadScan = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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
    setFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    
    setIsUploading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    
    // Navigate to result page
    navigate('/result/1');
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader title="Upload & Scan" subtitle="Upload a photo of your cat for AI analysis" />
        <div className="dashboard-content">
          <div className="upload-container">
            <div className="upload-card-main">
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
                  accept="image/*" 
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

              <button 
                className={`btn btn-primary btn-lg submit-btn ${isUploading ? 'loading' : ''}`}
                onClick={handleSubmit}
                disabled={!file || isUploading}
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
