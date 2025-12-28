import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import './Auth.css';

const Auth = () => {
  const { login, register } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(location.pathname === '/register');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  // Sync state with URL
  useEffect(() => {
    setIsSignUp(location.pathname === '/register');
    setError('');
    // Reset form when switching modes
    setFormData({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    });
  }, [location.pathname]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = () => {
    const newPath = isSignUp ? '/login' : '/register';
    navigate(newPath);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { email, password } = formData;
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (formData.password !== formData.password_confirmation) {
         throw new Error('Passwords do not match');
      }

      const { name, email, password, password_confirmation } = formData;
      await register(name, email, password, password_confirmation);
      navigate('/dashboard');
    } catch (err) {
       console.error('Register error:', err);
       setError(err.response?.data?.message || err.message || 'Failed to register.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className={`auth-card ${isSignUp ? 'sign-up-mode' : ''}`}>
        <div className="forms-container">
          <div className="signin-signup">
            {/* Sign In Form */}
            <form onSubmit={handleLoginSubmit} className="sign-in-form">
              <h2 className="title">Sign In</h2>
              <p className="subtitle">Enter your credentials to access your account</p>
              
              {error && !isSignUp && <div className="error-message" style={{color: '#ff4444', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center'}}>{error}</div>}

              <div className="input-field">
                <Mail size={20} />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="input-field">
                <Lock size={20} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="form-options">
                <label className="checkbox-wrapper">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" title="Forgot Password?">Forgot Password?</Link>
              </div>

                <button type="submit" className={`btn solid ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>

                <p className="toggle-text">
                  New here? <button type="button" onClick={toggleMode}>Sign Up</button>
                </p>

                <div className="social-text">Or sign in with social platforms</div>
              <div className="social-media">
                <button type="button" className="social-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                <button type="button" className="social-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
              </div>
            </form>

            {/* Sign Up Form */}
            <form onSubmit={handleRegisterSubmit} className="sign-up-form">
              <h2 className="title">Create Account</h2>
              <p className="subtitle">Fill in your details to get started</p>
              
              {error && isSignUp && <div className="error-message" style={{color: '#ff4444', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center'}}>{error}</div>}

              <div className="input-field">
                <User size={20} />
                <input 
                  type="text" 
                  name="name"
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="input-field">
                <Mail size={20} />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="input-field">
                <Lock size={20} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="input-field">
                <Lock size={20} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password_confirmation"
                  placeholder="Confirm Password" 
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required 
                />
              </div>

                <button type="submit" className={`btn solid ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Sign Up'}
                </button>

                <p className="toggle-text">
                  Already have an account? <button type="button" onClick={toggleMode}>Sign In</button>
                </p>

                <div className="social-text">Or sign up with social platforms</div>
              <div className="social-media">
                <button type="button" className="social-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                <button type="button" className="social-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <div className="auth-logo-white">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="20" fill="white"/>
                  <path d="M12 14C12 14 14 10 16 12C18 14 16 18 16 18" stroke="#1aa393" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M28 14C28 14 26 10 24 12C22 14 24 18 24 18" stroke="#1aa393" strokeWidth="2" strokeLinecap="round"/>
                  <ellipse cx="20" cy="22" rx="8" ry="7" fill="#1aa393"/>
                  <circle cx="17" cy="21" r="1.5" fill="white"/>
                  <circle cx="23" cy="21" r="1.5" fill="white"/>
                  <ellipse cx="20" cy="24" rx="1.5" ry="1" fill="#ffb6c1"/>
                </svg>
                <span>Cat Health</span>
              </div>
                <h3>New here?</h3>
                <p>Join our community and start monitoring your cat's health with AI technology today.</p>
              </div>
            </div>
          <div className="panel right-panel">
            <div className="content">
              <div className="auth-logo-white">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="20" fill="white"/>
                  <path d="M12 14C12 14 14 10 16 12C18 14 16 18 16 18" stroke="#1aa393" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M28 14C28 14 26 10 24 12C22 14 24 18 24 18" stroke="#1aa393" strokeWidth="2" strokeLinecap="round"/>
                  <ellipse cx="20" cy="22" rx="8" ry="7" fill="#1aa393"/>
                  <circle cx="17" cy="21" r="1.5" fill="white"/>
                  <circle cx="23" cy="21" r="1.5" fill="white"/>
                  <ellipse cx="20" cy="24" rx="1.5" ry="1" fill="#ffb6c1"/>
                </svg>
                <span>Cat Health</span>
              </div>
                <h3>One of us?</h3>
                <p>Already have an account? Sign in to see your cat's health progress and latest scans.</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
