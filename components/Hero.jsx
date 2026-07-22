import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import './Hero.css';

export const Hero = () => {
  const { navigateTo } = useContext(ShopContext);

  const scrollToCatalog = () => {
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      {/* Background Glowing Ambient Orbs */}
      <div className="hero-glow orb-1"></div>
      <div className="hero-glow orb-2"></div>

      <div className="container hero-container animate-fade-in">
        {/* Left Column: Heading and Description */}
        <div className="hero-content">
          <div className="hero-badge glass">
            <Sparkles size={14} className="badge-icon text-indigo-400" />
            <span>Introducing AURA 2.0 Collective</span>
          </div>

          <h1 className="hero-title">
            Define Your <br />
            <span className="gradient-text">Workspace Aesthetic</span>
          </h1>

          <p className="hero-description">
            Experience hand-crafted tech accessories, ambient smart lighting, and high-fidelity acoustics. Designed minimalists, engineered for high-performers, styled for your resume.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary hero-btn" onClick={scrollToCatalog}>
              Explore Catalog
              <ArrowRight size={16} />
            </button>
            <button className="btn btn-secondary hero-btn-sec" onClick={() => navigateTo('admin')}>
              Admin Panel
            </button>
          </div>

          {/* Micro stats banner */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">40h</span>
              <span className="stat-label">Battery Playback</span>
            </div>
            <div className="divider"></div>
            <div className="stat-item">
              <span className="stat-num">100%</span>
              <span className="stat-label">Merino Wool Felt</span>
            </div>
            <div className="divider"></div>
            <div className="stat-item">
              <span className="stat-num">15W</span>
              <span className="stat-label">MagSafe Fast Charge</span>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Product Promo Display */}
        <div className="hero-visual">
          <div className="hero-card-container">
            <div className="hero-product-card glass">
              <span className="product-status-tag">BESTSELLER</span>
              <div className="hero-product-image-wrapper">
                {/* Custom modern gradient sphere representation of our high-tech product */}
                <div className="hero-product-sphere">
                  <div className="inner-sphere"></div>
                </div>
                <img 
                  src="/assets/soundlink_black.png" 
                  alt="Aura SoundLink Max" 
                  className="hero-product-image"
                  onError={(e) => {
                    // Fallback to stylized glow if image hasn't been generated/loaded
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="hero-product-details">
                <h3 className="hero-product-title">Aura SoundLink Max</h3>
                <p className="hero-product-subtitle">Studio-Grade Noise Cancelling</p>
                <div className="hero-product-footer">
                  <span className="hero-product-price">$349.99</span>
                  <button 
                    className="btn btn-primary hero-buy-btn"
                    onClick={() => navigateTo('product-details', 'aura-soundlink')}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Floating micro features */}
            <div className="floating-info card-1 glass">
              <Zap size={16} className="text-amber-400" />
              <div>
                <h4>Smart Ambient</h4>
                <p>16M Circadian gradient colors</p>
              </div>
            </div>

            <div className="floating-info card-2 glass">
              <ShieldCheck size={16} className="text-teal-400" />
              <div>
                <h4>2-Year Warranty</h4>
                <p>Premium titanium hardware</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
