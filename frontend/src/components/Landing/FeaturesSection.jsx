import { Camera, Lightbulb, ClipboardList, FileDown } from 'lucide-react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Camera size={38} />,
      title: 'Deteksi Serba Guna',
      description: 'Deteksi penyakit, infeksi, kondis klut, mata, teling, dan masalah umum lanaya.',
      color: 'blue'
    },
    {
      icon: <ClipboardList size={38} />,
      title: 'Panduan Penanganan',
      description: 'Panduan lengkap untuk penangaman awal, can kapan harus ke dokter.',
      color: 'orange'
    },
    {
      icon: <Lightbulb size={38} />,
      title: 'Rekomendasi Perawatan',
      description: 'Rekomendasi perawatan yang ssebo secara berdasarkan deteksi AI.',
      color: 'mint'
    },
    {
      icon: <FileDown size={38} />,
      title: 'Ekspor & Bagikan Laporan',
      description: 'Unduh laporan hasil analisis attur bagikan kepada dokter hewan.',
      color: 'blue'
    }
  ];

  return (
    <section id="fitur" className="features-section">
      <div className="features-container">
        <span className="features-label">FEATURES</span>
        <h2 className="section-title">Fitur Utama Kami</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card feature-card-${feature.color}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
