import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-leaf">🌿</span>
          <span className="logo-text">Agri<span>Pharma</span></span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {user ? (
            <>
              <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/crops" className={isActive('/crops') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Crops</Link>
              <Link to="/shop" className={isActive('/shop') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Shop</Link>
              {role === 'farmer' && (
                <>
                  <Link to="/disease" className={isActive('/disease') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Disease AI</Link>
                  <Link to="/cart" className={isActive('/cart') ? 'active' : ''} onClick={() => setMenuOpen(false)}>🛒 Cart</Link>
                  <Link to="/orders" className={isActive('/orders') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Orders</Link>
                </>
              )}
              {role === 'shopkeeper' && (
                <Link to="/shopkeeper" className={isActive('/shopkeeper') ? 'active' : ''} onClick={() => setMenuOpen(false)}>My Shop</Link>
              )}
              {role === 'admin' && (
                <Link to="/admin" className={isActive('/admin') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Admin Panel</Link>
              )}
              <div className="navbar-user">
                <Link to="/profile" className="user-avatar" onClick={() => setMenuOpen(false)}>
                  {user.name?.charAt(0).toUpperCase()}
                </Link>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/crops" className={isActive('/crops') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Crops</Link>
              <Link to="/shop" className={isActive('/shop') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Shop</Link>
              <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
