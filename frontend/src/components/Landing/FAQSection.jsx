import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQSection.css';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Seberapa akurat deteksi AI?',
      answer: 'Sistem AI kami memiliki akurasi hingga 95% untuk mendeteksi penyakit kucing umum. Namun, kami selalu menyarankan untuk berkonsultasi dengan dokter hewan untuk diagnosis pasti dan pengobatan yang tepat.'
    },
    {
      question: 'Kondisi apa saja yang bisa dideteksi?',
      answer: 'Sistem kami dapat mendeteksi berbagai kondisi seperti penyakit kulit, infeksi mata, masalah telinga, kondisi bulu yang tidak sehat, dan beberapa penyakit umum lainnya yang dapat terlihat secara visual.'
    },
    {
      question: 'Bagaimana dengan privasi data?',
      answer: 'Kami sangat menjaga privasi data Anda. Semua foto dan data yang Anda kirimkan dienkripsi dan disimpan secara aman. Anda dapat menghapus data Anda kapan saja dari sistem kami.'
    },
    {
      question: 'Kapan saya harus ke dokter hewan?',
      answer: 'Meskipun sistem kami dapat memberikan indikasi awal, kami menyarankan untuk segera berkonsultasi dengan dokter hewan jika kucing Anda menunjukkan gejala yang parah, tidak mau makan, lesu, atau jika hasil analisis menunjukkan kondisi yang memerlukan perhatian medis.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <span className="faq-label">FAQ</span>
        <h2 className="section-title">Pertanyaan yang Sering Diajukan</h2>
        <p className="section-subtitle">
          Beberapa pertanyaan yang sering ditanyakan oleh pengguna kami. Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan lain.
        </p>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
