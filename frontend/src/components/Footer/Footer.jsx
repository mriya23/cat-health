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
          <p className="footer-copyright">© 2024 AI Cat Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
