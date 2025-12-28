import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-links-grid">
            <div className="footer-links-column">
              <h4>Produk</h4>
              <ul>
                <li><a href="#fitur">Fitur</a></li>
                <li><a href="#harga">Harga</a></li>
                <li><a href="#">API</a></li>
              </ul>
            </div>
            <div className="footer-links-column">
              <h4>Privasi</h4>
              <ul>
                <li><a href="#">Kebijakan Privasi</a></li>
                <li><a href="#">Keamanan Data</a></li>
              </ul>
            </div>
            <div className="footer-links-column">
              <h4>Syarat & Ketentuan</h4>
              <ul>
                <li><a href="#">Syarat Penggunaan</a></li>
                <li><a href="#">Ketentuan Layanan</a></li>
              </ul>
            </div>
            <div className="footer-links-column">
              <h4>Kontak</h4>
              <ul>
                <li><a href="mailto:support@cathealth.ai">support@cathealth.ai</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Bantuan</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-middle">
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Youtube">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-logo">
            <div className="logo-icon-small">
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
          </div>
          <p className="footer-copyright">© 2024 AI Cat Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
