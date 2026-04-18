import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">🌿 Agri<span>Pharma</span></div>
            <p>Empowering farmers with smart agricultural technology, AI-powered disease detection, and quality agri-inputs.</p>
          </div>
          <div className="footer-links">
            <h4>Platform</h4>
            <Link to="/crops">Crop Guide</Link>
            <Link to="/shop">Agri Shop</Link>
            <Link to="/disease">Disease Detection</Link>
          </div>
          <div className="footer-links">
            <h4>Account</h4>
            <Link to="/register">Register as Farmer</Link>
            <Link to="/register/shopkeeper">Register as Shopkeeper</Link>
            <Link to="/login">Login</Link>
          </div>
          <div className="footer-links">
            <h4>Support</h4>
            <a href="mailto:support@agripharma.com">Contact Us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 AgriPharma. Built with ❤️ for Indian farmers.</p>
        </div>
      </div>
    </footer>
  );
}
