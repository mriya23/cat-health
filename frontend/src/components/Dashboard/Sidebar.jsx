import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Upload, 
  History, 
  CreditCard, 
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isAdmin = false }) => {
  const location = useLocation();

  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Upload size={20} />, label: 'Upload & Scan', path: '/upload' },
    { icon: <History size={20} />, label: 'Riwayat Scan', path: '/history' },
    { icon: <CreditCard size={20} />, label: 'Billing', path: '/billing' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  const adminItems = [
    { icon: <Home size={20} />, label: 'Admin Dashboard', path: '/admin' },
    ...menuItems.slice(1),
  ];

  const items = isAdmin ? adminItems : menuItems;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#1aa393"/>
              <path d="M12 14C12 14 14 10 16 12C18 14 16 18 16 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M28 14C28 14 26 10 24 12C22 14 24 18 24 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <ellipse cx="20" cy="22" rx="8" ry="7" fill="white"/>
              <circle cx="17" cy="21" r="1.5" fill="#1aa393"/>
              <circle cx="23" cy="21" r="1.5" fill="#1aa393"/>
              <ellipse cx="20" cy="24" rx="1.5" ry="1" fill="#ffb6c1"/>
            </svg>
          </div>
          <span className="logo-text">Cat Health</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {items.map((item, index) => (
            <li key={index}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <Link to="/login" className="sidebar-link logout-link">
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
