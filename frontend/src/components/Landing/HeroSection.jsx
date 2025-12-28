import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section id="beranda" className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            "Deteksi <span className="text-highlight">Penyakit Kucing</span><br />
            dari Foto dalam Hitungan<br />
            Detik"
          </h1>
          <p className="hero-description">
            Platform ini mengunakan analisis AI untuk mendeteksi 
            kondisi, penyakit, dan masalah kesehatan kucing 
            secara akurat berdasarkan gambar dengan cepat 
            dan mudah, aman digunakan.
          </p>
          <div className="hero-actions">
            <Link to="/upload" className="btn-hero-primary">
              Upload Foto Sekarang
            </Link>
            <a href="#how-it-works" className="btn-hero-secondary">
              Lihat Cara Kerja
            </a>
          </div>
        </div>
        
        {/* Laptop Mockup */}
        <div className="hero-image">
          <div className="macbook">
            <div className="macbook-screen">
              <div className="macbook-camera"></div>
              <div className="macbook-display">
                
                {/* Simulated App Interface inside Screen */}
                <div className="app-interface">
                  <div className="app-header">
                    <div className="app-logo-small"></div>
                    <div className="app-search-bar"></div>
                  </div>
                  <div className="app-body">
                    <div className="app-main-card">
                      <div className="app-upload-zone">
                        <div className="upload-icon"></div>
                        <div className="upload-text-lines">
                          <span></span>
                          <span></span>
                        </div>
                        <div className="upload-btn-fake"></div>
                      </div>
                      <div className="app-result-preview">
                        <img 
                          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop" 
                          alt="Kucing" 
                          className="preview-cat-img"
                        />
                        <div className="preview-status-badge">Healthy</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="macbook-base"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
