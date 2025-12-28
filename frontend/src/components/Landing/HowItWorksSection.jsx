import { Upload, Brain, FileText, Stethoscope } from 'lucide-react';
import './HowItWorksSection.css';

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      icon: <Upload size={28} />,
      title: '1. Upload Foto',
      description: 'Unggah foto kucing yang jelas dan hindari blur.'
    },
    {
      number: 2,
      icon: <Brain size={28} />,
      title: '2. AI Menganalisis',
      description: 'AI kami akan menganalisis foto dan gejala yang terlihat.'
    },
    {
      number: 3,
      icon: <FileText size={28} />,
      title: '3. Hasil & Rekomendasi',
      description: 'Lihat hasil deteksi beserta rekomendasi perawatan.'
    },
    {
      number: 4,
      icon: <Stethoscope size={28} />,
      title: '4. Opsi Konsultasi Dokter Hewan',
      description: 'Konsultasi dengan dokter hewan untuk penangnan lanjutan Ina.'
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="how-it-works-container">
        <span className="how-label">HOW IT WORKS</span>
        <h2 className="section-title">Cara Kerja Deteksi AI</h2>
        
        <div className="steps-timeline">
          <div className="timeline-line"></div>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="step-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="step-icon-wrapper">
                  <div className="step-icon">{step.icon}</div>
                  <span className="step-number">{step.number}</span>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
