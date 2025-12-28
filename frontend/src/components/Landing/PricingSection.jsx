import { useState } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PricingSection.css';

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Free Trial',
      subtitle: 'Limited',
      price: { monthly: 'Free', annual: 'Free' },
      period: null,
      features: [
        '5 scan per bulan',
        'Hasil dasar',
        'Riwayat 7 hari',
        'Email support'
      ],
      buttonText: 'Free Trial',
      buttonVariant: 'outline',
      popular: false
    },
    {
      name: 'Pro',
      subtitle: null,
      price: { monthly: 'Rp 99.000', annual: 'Rp 990.000' },
      period: '/bulan',
      features: [
        'Unlimited scan',
        'Detailed Analisis',
        'Riwayat unlimited',
        'Scheduled Checkup',
        'Priority support',
        'Consultation Feature',
        'Export Reports',
        'API Access'
      ],
      buttonText: 'Upgrade to Pro',
      buttonVariant: 'primary',
      popular: true
    },
    {
      name: 'Clinic',
      subtitle: 'For businesses',
      price: { monthly: 'Rp 499.000', annual: 'Rp 4.990.000' },
      period: '/bulan',
      features: [
        'Semua fitur Pro',
        'Multi-user access',
        'Admin dashboard',
        'Analytics & Reports',
        'White-label option',
        'Dedicated support',
        'Custom integration',
        'SLA guarantee'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline',
      popular: false
    }
  ];

  return (
    <section id="harga" className="pricing-section">
      <div className="pricing-container">
        <span className="pricing-label">PRICING</span>
        <h2 className="section-title">Pilih Paket Sesuai Kebutuhan Anda</h2>
        
        <div className="billing-toggle">
          <button 
            className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
            onClick={() => setBillingCycle('annual')}
          >
            Annual
          </button>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && <span className="popular-badge">Most Popular</span>}
              <div className="pricing-header">
                <h3 className="plan-name">{plan.name}</h3>
                {plan.subtitle && <span className="plan-subtitle">{plan.subtitle}</span>}
              </div>
              <div className="pricing-price">
                <span className="price-amount">
                  {plan.price[billingCycle]}
                </span>
                {plan.period && <span className="price-period">{plan.period}</span>}
              </div>
              <ul className="pricing-features">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <Check size={16} className="feature-check" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link 
                to="/register" 
                className={`btn ${plan.buttonVariant === 'primary' ? 'btn-primary' : 'btn-outline'} pricing-btn`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
