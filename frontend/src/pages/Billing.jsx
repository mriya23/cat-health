import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Dashboard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { Check, CreditCard, Calendar, ArrowRight, Loader, AlertTriangle } from 'lucide-react';
import { subscriptionAPI } from '../services/api';
import './Billing.css';

const Billing = () => {
  const [plans, setPlans] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      setLoading(true);
      const [plansRes, subRes] = await Promise.all([
        subscriptionAPI.getPlans(),
        subscriptionAPI.getCurrent()
      ]);

      setPlans(plansRes.data.plans);
      setCurrentSubscription(subRes.data.subscription);
    } catch (err) {
      console.error('Error fetching billing data:', err);
      setError('Failed to load billing information');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planSlug) => {
    if (!window.confirm(`Are you sure you want to subscribe to the ${planSlug} plan?`)) return;

    try {
      setActionLoading(true);
      setError(null);
      
      const response = await subscriptionAPI.subscribe(planSlug);
      setMessage(response.data.message);
      
      // Refresh data
      await fetchBillingData();
    } catch (err) {
      console.error('Subscription error:', err);
      setError(err.response?.data?.message || 'Failed to update subscription');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription? You will be downgraded to the Free plan.')) return;

    try {
      setActionLoading(true);
      setError(null);
      
      const response = await subscriptionAPI.cancel();
      setMessage(response.data.message);
      
      // Refresh data
      await fetchBillingData();
    } catch (err) {
      console.error('Cancellation error:', err);
      setError(err.response?.data?.message || 'Failed to cancel subscription');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatPrice = (price) => {
    if (price === 0) return 'Free';
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-main">
          <DashboardHeader title="Billing/Subscription" subtitle="Manage your subscription" />
          <div className="dashboard-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <Loader size={48} className="spinning" />
          </div>
        </div>
      </div>
    );
  }

  // Determine current plan slug
  const currentPlanSlug = currentSubscription ? currentSubscription.plan : 'free';

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader title="Billing/Subscription" subtitle="Manage your subscription and payment methods" />
        <div className="dashboard-content">
          <div className="billing-container">
            {error && (
              <div className="error-banner" style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <AlertTriangle size={20} style={{ display: 'inline', marginRight: '8px' }} />
                {error}
              </div>
            )}
            
            {message && (
              <div className="success-banner" style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <Check size={20} style={{ display: 'inline', marginRight: '8px' }} />
                {message}
              </div>
            )}

            <div className="billing-main">
              <div className="billing-card plan-overview">
                <div className="plan-header">
                  <h3>Current Plan</h3>
                  <span className={`plan-badge ${currentPlanSlug === 'free' ? '' : 'active'}`}>
                    {currentSubscription?.status || 'Active'}
                  </span>
                </div>
                <div className="plan-details">
                  <div className="plan-name-price">
                    <h4 style={{ textTransform: 'capitalize' }}>{currentPlanSlug} Plan</h4>
                    <span className="plan-price">
                      {currentSubscription ? formatPrice(currentSubscription.price) : 'Free'}
                      <small>/month</small>
                    </span>
                  </div>
                  {currentSubscription && currentSubscription.ends_at && (
                    <div className="plan-renew">
                      <Calendar size={16} />
                      <span>Expires on {formatDate(currentSubscription.ends_at)}</span>
                    </div>
                  )}
                </div>
                
                {currentPlanSlug !== 'free' && (
                  <button 
                    className="btn btn-outline btn-danger" 
                    onClick={handleCancel}
                    disabled={actionLoading}
                    style={{ marginTop: '1rem' }}
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>

              <div className="billing-card payment-method-card">
                  <h3>Payment Method</h3>
                  <div className="payment-method">
                    <div className="card-icon">
                      <CreditCard size={24} />
                    </div>
                    <div className="card-info">
                      <span className="card-type">Manual Transfer</span>
                      <span className="card-expiry">Bank BCA 1234567890</span>
                    </div>
                    <button className="btn btn-sm btn-outline">Update</button>
                  </div>
              </div>
            </div>

            <div className="billing-sidebar">
              <div className="billing-card plans-compare">
                <h3>Available Plans</h3>
                <div className="plans-list">
                  {plans.map((plan, index) => {
                    const isCurrent = plan.slug === currentPlanSlug;
                    return (
                      <div key={index} className={`plan-item ${isCurrent ? 'current' : ''}`}>
                        <div className="plan-item-header">
                          <span className="plan-item-name">{plan.name}</span>
                          {isCurrent && <span className="current-badge">Current</span>}
                        </div>
                        <div className="plan-item-price">
                          {formatPrice(plan.price)}
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
                        {!isCurrent && (
                          <button 
                            className="btn btn-sm btn-outline w-full"
                            onClick={() => handleSubscribe(plan.slug)}
                            disabled={actionLoading}
                          >
                            {actionLoading ? 'Processing...' : (plan.price === 0 ? 'Switch to Free' : 'Upgrade')}
                          </button>
                        )}
                      </div>
                    );
                  })}
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
