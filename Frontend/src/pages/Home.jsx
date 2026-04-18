import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const features = [
  { icon: '🌾', title: 'Crop Intelligence', desc: 'Season-wise crop guides with weekly care schedules tailored for your soil and region.' },
  { icon: '🔬', title: 'AI Disease Detection', desc: 'Upload a photo of your crop and get instant AI-powered disease diagnosis with remedies.' },
  { icon: '🛒', title: 'Agri Shop', desc: 'Buy seeds, fertilizers, and medicines directly from verified shopkeepers and admin stock.' },
  { icon: '📦', title: 'Easy Ordering', desc: 'Hassle-free cart and order management with delivery tracking for all your agri needs.' },
  { icon: '🌿', title: 'Shopkeeper Portal', desc: 'Shopkeepers can list products, manage inventory, and serve local farmers efficiently.' },
  { icon: '💧', title: 'Water Planning', desc: 'Water-level based crop recommendations so you plan irrigation and input usage wisely.' },
];

const crops = [
  { emoji: '🌾', name: 'Wheat', season: 'Winter' },
  { emoji: '🌽', name: 'Maize', season: 'Monsoon' },
  { emoji: '🍅', name: 'Tomato', season: 'All Season' },
  { emoji: '🧅', name: 'Onion', season: 'Winter' },
  { emoji: '🥔', name: 'Potato', season: 'Winter' },
  { emoji: '🌻', name: 'Sunflower', season: 'Monsoon' },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home page-enter">
      {/* Farm Background */}
      <div className="farm-bg-animation" />
      <div className="sun-deco" />
      <div className="tractor-anim">🚜</div>

      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="hero-badge">🌱 Smart Farming Platform</span>
            <h1 className="hero-title">
              Grow Smarter,<br/>
              <span>Farm Better</span>
            </h1>
            <p className="hero-desc">
              AgriPharma connects farmers with AI-powered tools, quality agri-inputs, and expert crop knowledge — all in one platform built for Indian agriculture.
            </p>
            <div className="hero-actions">
              {user ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg">Go to Dashboard →</Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">Start for Free →</Link>
                  <Link to="/crops" className="btn btn-outline btn-lg">Explore Crops</Link>
                </>
              )}
            </div>
            <div className="hero-stats">
              <div className="stat"><strong>50+</strong><span>Crops</span></div>
              <div className="stat-divider" />
              <div className="stat"><strong>AI</strong><span>Disease Detection</span></div>
              <div className="stat-divider" />
              <div className="stat"><strong>100%</strong><span>Verified Sellers</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card-stack">
              <div className="hero-card card-1">
                <div className="hc-icon">🔬</div>
                <div className="hc-text">
                  <strong>Disease Scan</strong>
                  <span>AI Result in seconds</span>
                </div>
              </div>
              <div className="hero-card card-2">
                <div className="hc-icon">🌾</div>
                <div className="hc-text">
                  <strong>Weekly Schedule</strong>
                  <span>Wheat — Week 3/12</span>
                </div>
              </div>
              <div className="hero-card card-3">
                <div className="hc-icon">✅</div>
                <div className="hc-text">
                  <strong>Order Placed</strong>
                  <span>Fertilizer — 25kg</span>
                </div>
              </div>
              <div className="hero-big-emoji">🌳</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Crops Strip */}
      <section className="crops-strip">
        <div className="container">
          <p className="strip-label">Popular Crops on AgriPharma</p>
          <div className="crops-row">
            {crops.map(c => (
              <Link to={`/crops?season=${c.season}`} key={c.name} className="crop-pill">
                <span>{c.emoji}</span>
                <span>{c.name}</span>
                <span className="badge badge-green">{c.season}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Everything a Farmer Needs</h2>
            <p className="section-subtitle">One platform, complete agricultural support from sowing to selling.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-content">
              <h2 className="section-title" style={{color:'white'}}>Ready to Transform<br/>Your Farm?</h2>
              <p style={{color:'rgba(255,255,255,0.8)', margin:'16px 0 32px'}}>
                Join thousands of farmers using AgriPharma for smarter, more profitable farming.
              </p>
              <div style={{display:'flex', gap:'16px', flexWrap:'wrap'}}>
                <Link to="/register" className="btn btn-gold btn-lg">Register as Farmer →</Link>
                <Link to="/register/shopkeeper" className="btn btn-outline btn-lg" style={{color:'white', borderColor:'rgba(255,255,255,0.5)'}}>Register as Shopkeeper</Link>
              </div>
            </div>
            <div className="cta-visual">🌿</div>
          </div>
        </div>
      </section>
    </div>
  );
}
