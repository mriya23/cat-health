import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ isLoggedIn = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Kenapa', href: '#kenapa' },
    { name: 'Panduan', href: '#panduan' },
    { name: 'Kontak', href: '#kontak' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#1aa393"/>
              <path d="M12 14C12 14 14 10 16 12C18 14 16 18 16 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M28 14C28 14 26 10 24 12C22 14 24 18 24 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <ellipse cx="20" cy="22" rx="8" ry="7" fill="white"/>
              <circle cx="17" cy="21" r="1.5" fill="#1aa393"/>
              <circle cx="23" cy="21" r="1.5" fill="#1aa393"/>
              <ellipse cx="20" cy="24" rx="1.5" ry="1" fill="#ffb6c1"/>
              <path d="M18.5 25.5C19 26 21 26 21.5 25.5" stroke="#1aa393" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="logo-text">Cat Health</span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="navbar-link">{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
          ) : (
            <Link to="/login" className="btn btn-primary">Masuk</Link>
          )}
        </div>

        <button 
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
