import { Sidebar } from '../components/Dashboard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { Check, CreditCard, Calendar, ArrowRight } from 'lucide-react';
import './Billing.css';

const Billing = () => {
  const currentPlan = {
    name: 'Pro Plan',
    price: 'Rp 99.000',
    period: '/bulan',
    renewDate: 'Nov 12, 2024',
    status: 'Active',
  };

  const paymentMethod = {
    type: 'Visa',
    lastFour: '4242',
    expiry: '12/26',
  };

  const invoices = [
    { id: 1, date: 'Nov 12, 2024', amount: 'Rp 99.000', status: 'Paid' },
    { id: 2, date: 'Oct 12, 2024', amount: 'Rp 99.000', status: 'Paid' },
    { id: 3, date: 'Sep 12, 2024', amount: 'Rp 99.000', status: 'Paid' },
  ];

  const plans = [
    {
      name: 'Free Trial',
      price: 'Free',
      features: ['5 scans/month', 'Basic results', '7-day history'],
      current: false,
    },
    {
      name: 'Pro',
      price: 'Rp 99.000',
      period: '/bulan',
      features: ['Unlimited scans', 'Detailed analysis', 'Priority support', 'Export reports'],
      current: true,
    },
    {
      name: 'Clinic',
      price: 'Rp 499.000',
      period: '/bulan',
      features: ['All Pro features', 'Multi-user', 'Admin dashboard', 'API access'],
      current: false,
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader title="Billing/Subscription" subtitle="Manage your subscription and payment methods" />
        <div className="dashboard-content">
          <div className="billing-container">
            <div className="billing-main">
              <div className="billing-card plan-overview">
                <div className="plan-header">
                  <h3>Plan Overview</h3>
                  <span className="plan-badge active">Active</span>
                </div>
                <div className="plan-details">
                  <div className="plan-name-price">
                    <h4>{currentPlan.name}</h4>
                    <span className="plan-price">
                      {currentPlan.price}
                      <small>{currentPlan.period}</small>
                    </span>
                  </div>
                  <div className="plan-renew">
                    <Calendar size={16} />
                    <span>Renews on {currentPlan.renewDate}</span>
                  </div>
                </div>
                <button className="btn btn-outline change-plan-btn">
                  Change Plan
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="billing-card payment-method-card">
                <h3>Payment Method</h3>
                <div className="payment-method">
                  <div className="card-icon">
                    <CreditCard size={24} />
                  </div>
                  <div className="card-info">
                    <span className="card-type">{paymentMethod.type} •••• {paymentMethod.lastFour}</span>
                    <span className="card-expiry">Expires {paymentMethod.expiry}</span>
                  </div>
                  <button className="btn btn-sm btn-outline">Update</button>
                </div>
              </div>

              <div className="billing-card invoices-card">
                <h3>Invoices</h3>
                <div className="invoices-list">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="invoice-item">
                      <div className="invoice-date">
                        <Calendar size={14} />
                        {invoice.date}
                      </div>
                      <span className="invoice-amount">{invoice.amount}</span>
                      <span className="invoice-status paid">
                        <Check size={12} />
                        {invoice.status}
                      </span>
                      <button className="btn btn-sm btn-outline">Download</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="billing-sidebar">
              <div className="billing-card plans-compare">
                <h3>Available Plans</h3>
                <div className="plans-list">
                  {plans.map((plan, index) => (
                    <div key={index} className={`plan-item ${plan.current ? 'current' : ''}`}>
                      <div className="plan-item-header">
                        <span className="plan-item-name">{plan.name}</span>
                        {plan.current && <span className="current-badge">Current</span>}
                      </div>
                      <div className="plan-item-price">
                        {plan.price}
                        {plan.period && <small>{plan.period}</small>}
                      </div>
                      <ul className="plan-item-features">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex}>
                            <Check size={12} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {!plan.current && (
                        <button className="btn btn-sm btn-outline w-full">
                          {plan.price === 'Free' ? 'Downgrade' : 'Upgrade'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
