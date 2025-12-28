import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Dashboard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { 
  Camera, 
  Loader2, 
  CheckCircle2,
  AlertCircle,
  Shield,
  Save,
  Key
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();
  
  // States
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: null,
  });
  
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar ? `http://localhost:8000/storage/${user.avatar}` : null);

  // Initialize Data
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }));
      if (user.avatar) {
        setAvatarPreview(`http://localhost:8000/storage/${user.avatar}`);
      }
    }
  }, [user]);

  // Clear alerts after 5s
  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => setStatus({ type: '', message: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Handlers
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
      if (file.size > 2 * 1024 * 1024) {
        setStatus({ type: 'error', message: 'File size must be less than 2MB' });
        return;
      }
      setProfileData(prev => ({ ...prev, avatar: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // 1. Update Profile if changed
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('email', profileData.email);
      if (profileData.avatar) {
        formData.append('avatar', profileData.avatar);
      }
      
      const profileResponse = await authAPI.updateProfile(formData);
      
      // Update local storage
      const updatedUser = profileResponse.data.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // 2. Update Password if fields are filled
      if (passwordData.password) {
        if (passwordData.password !== passwordData.password_confirmation) {
          throw new Error("New passwords do not match");
        }
        await authAPI.updatePassword({
            current_password: passwordData.current_password,
            password: passwordData.password,
            password_confirmation: passwordData.password_confirmation
        });
        
        // Reset password fields on success
        setPasswordData({
            current_password: '',
            password: '',
            password_confirmation: '',
        });
      }

      setStatus({ type: 'success', message: 'Settings updated successfully!' });

    } catch (err) {
      console.error('Update error:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to update settings';
      setStatus({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader title="Account Settings" subtitle="Manage your profile and security" />
        
        <div className="dashboard-content">
          <div className="settings-simple-wrapper">
            
            {status.message && (
              <div className={`status-alert ${status.type}`}>
                {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="settings-form-layout">
              
              {/* --- SECTION 1: PROFILE --- */}
              <div className="settings-section">
                <div className="section-title">
                  <h2>Profile Information</h2>
                  <p>Update your photo and personal details.</p>
                </div>

                <div className="card-box">
                  <div className="avatar-row">
                    <div className="avatar-wrapper">
                        {avatarPreview ? (
                            <img src={avatarPreview} alt="Profile" />
                        ) : (
                            <div className="avatar-placeholder">{user?.name?.charAt(0)}</div>
                        )}
                        <label className="avatar-overlay">
                            <Camera size={20} />
                            <input type="file" onChange={handleAvatarSelect} accept="image/*" />
                        </label>
                    </div>
                    <div className="avatar-text">
                        <h3>Profile Photo</h3>
                        <p>Click the photo to change. Max size 2MB.</p>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                        <label>Display Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            className="input-modern"
                            value={profileData.name} 
                            onChange={handleProfileChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="input-modern"
                            value={profileData.email} 
                            onChange={handleProfileChange} 
                        />
                    </div>
                  </div>
                </div>
              </div>

              {/* --- SECTION 2: PASSWORD --- */}
              <div className="settings-section">
                <div className="section-title">
                  <h2>Security</h2>
                  <p>Change your password to keep your account safe.</p>
                </div>

                <div className="card-box security-box">
                  <div className="password-header">
                     <div className="icon-badge"><Key size={18} /></div>
                     <span>Leave blank if you don't want to change password</span>
                  </div>

                  <div className="form-group">
                    <label>Current Password</label>
                    <input 
                        type="password" 
                        name="current_password"
                        className="input-modern"
                        placeholder="Required only if changing password"
                        value={passwordData.current_password}
                        onChange={handlePasswordChange}
                    />
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                        <label>New Password</label>
                        <input 
                            type="password" 
                            name="password"
                            className="input-modern"
                            placeholder="Min. 8 chars"
                            value={passwordData.password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            name="password_confirmation"
                            className="input-modern"
                            placeholder="Confirm new password"
                            value={passwordData.password_confirmation}
                            onChange={handlePasswordChange}
                        />
                    </div>
                  </div>
                </div>
              </div>

              {/* --- FOOTER ACTION --- */}
              <div className="form-actions-sticky">
                <button type="submit" className="btn-primary-solid" disabled={loading}>
                  {loading ? <Loader2 size={20} className="spin" /> : (
                    <>
                        <Save size={18} />
                        Save Changes
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
