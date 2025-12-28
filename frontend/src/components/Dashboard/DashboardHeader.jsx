import { Bell, Search, User } from 'lucide-react';
import './DashboardHeader.css';

const DashboardHeader = ({ title, subtitle }) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1 className="header-title">{title}</h1>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>
      <div className="header-right">
        <div className="header-search">
          <Search size={18} />
          <input type="text" placeholder="Search..." />
        </div>
        <button className="header-notification">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        <div className="header-user">
          <div className="user-avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">John Doe</span>
            <span className="user-role">Pro Plan</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
