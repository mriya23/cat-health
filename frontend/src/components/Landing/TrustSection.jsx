import React from 'react';
import { ShieldCheck, UserCheck, HeartHandshake } from 'lucide-react';
import './TrustSection.css';

const TrustSection = () => {
  const trustItems = [
    {
      icon: <HeartHandshake size={28} />, 
      title: 'Dipercaya oleh',
      subtitle: 'Positif Review',
      color: 'blue'
    },
    {
      icon: <UserCheck size={28} />,
      title: '100,000+',
      subtitle: 'Analisis Foto',
      color: 'mint'
    },
    {
      icon: <ShieldCheck size={28} />,
      title: 'Akurasi Tinggi,',
      subtitle: 'Didukung dengan Dokter Hewan',
      color: 'orange'
    }
  ];

  return (
    <section className="trust-section">
      <div className="trust-container">
        <span className="trust-label">TRUST / SOCIAL PROOF</span>
        <div className="trust-grid">
          {trustItems.map((item, index) => (
            <div 
              key={index} 
              className={`trust-item trust-item-${item.color}`}
            >
              <div className={`trust-icon trust-icon-${item.color}`}>{item.icon}</div>
              <div className="trust-text">
                <h4 className="trust-title">{item.title}</h4>
                <p className="trust-subtitle">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
