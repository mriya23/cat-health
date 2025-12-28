import { useState } from 'react';
import { Sidebar } from '../components/Dashboard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { 
  Camera, 
  Loader2, 
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();
  
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
  });
  
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus({ type: 'success', message: 'Settings saved successfully!' });
    setLoading(false);
    setTimeout(() => setStatus({ type: '', message: '' }), 3000);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader title="Settings" subtitle="Manage your account" />
        
        <div className="dashboard-content settings-content">
          
          {/* Status Banner */}
          {status.message && (
            <div className={`settings-toast ${status.type}`}>
              {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="settings-form">
            
            {/* Profile Section */}
            <section className="settings-section">
              <div className="section-header">
                <h2>Profile</h2>
                <p>Your personal information</p>
              </div>
              
              <div className="section-content">
                <div className="avatar-area">
                  <div className="avatar-box">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" />
                    ) : (
                      <span>{profileData.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <label className="avatar-change">
                    <Camera size={16} />
                    Change Photo
                    <input type="file" accept="image/*" onChange={handleAvatarSelect} hidden />
                  </label>
                </div>

                <div className="form-grid">
                  <div className="form-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="form-field">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Divider */}
            <hr className="section-divider" />

            {/* Security Section */}
            <section className="settings-section">
              <div className="section-header">
                <h2>Password</h2>
                <p>Change your password</p>
              </div>
              
              <div className="section-content">
                <div className="form-field">
                  <label>Current Password</label>
                  <div className="input-password">
                    <input
                      type={showPassword.current ? 'text' : 'password'}
                      name="current_password"
                      value={passwordData.current_password}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                    />
                    <button type="button" onClick={() => togglePasswordVisibility('current')}>
                      {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-field">
                    <label>New Password</label>
                    <div className="input-password">
                      <input
                        type={showPassword.new ? 'text' : 'password'}
                        name="password"
                        value={passwordData.password}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                      />
                      <button type="button" onClick={() => togglePasswordVisibility('new')}>
                        {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Confirm Password</label>
                    <div className="input-password">
                      <input
                        type={showPassword.confirm ? 'text' : 'password'}
                        name="password_confirmation"
                        value={passwordData.password_confirmation}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                      />
                      <button type="button" onClick={() => togglePasswordVisibility('confirm')}>
                        {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Save Button */}
            <div className="settings-footer">
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={18} className="spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
