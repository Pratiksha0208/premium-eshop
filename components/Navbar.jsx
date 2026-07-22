import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Search, ShoppingBag, Heart, Sun, Moon, Sliders, Menu, X } from 'lucide-react';
import './Navbar.css';

export const Navbar = () => {
  const {
    theme,
    toggleTheme,
    currentPage,
    navigateTo,
    cart,
    wishlist,
    searchQuery,
    setSearchQuery,
    isCartOpen,
    setIsCartOpen
  } = useContext(ShopContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (currentPage !== 'home' && currentPage !== 'wishlist') {
      navigateTo('home');
    }
  };

  const handleNavClick = (page) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar glass">
      <div className="container nav-container">
        {/* Brand Logo */}
        <div className="nav-logo" onClick={() => handleNavClick('home')}>
          <span className="logo-text">AURA</span>
          <span className="logo-dot"></span>
        </div>

        {/* Search Bar */}
        <div className="nav-search-container">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search premium products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="nav-links-desktop">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Shop
          </button>
          <button 
            className={`nav-link ${currentPage === 'wishlist' ? 'active' : ''}`}
            onClick={() => handleNavClick('wishlist')}
          >
            Wishlist
          </button>
          <button 
            className={`nav-link nav-link-admin ${currentPage === 'admin' ? 'active' : ''}`}
            onClick={() => handleNavClick('admin')}
          >
            <Sliders size={16} />
            Admin
          </button>
        </nav>

        {/* Actions (Theme, Wishlist, Cart, Mobile Menu Toggle) */}
        <div className="nav-actions">
          {/* Theme Toggle */}
          <button className="nav-action-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <Sun className="theme-toggle-icon text-amber-400" size={20} />
            ) : (
              <Moon className="theme-toggle-icon text-indigo-600" size={20} />
            )}
          </button>

          {/* Wishlist Indicator */}
          <button 
            className="nav-action-btn wishlist-btn" 
            onClick={() => handleNavClick('wishlist')}
            aria-label="View Wishlist"
          >
            <Heart size={20} className={wishlist.length > 0 ? 'heart-filled' : ''} />
            {wishlist.length > 0 && (
              <span className="badge wishlist-badge">{wishlist.length}</span>
            )}
          </button>

          {/* Cart Toggle */}
          <button 
            className="nav-action-btn cart-btn" 
            onClick={() => setIsCartOpen(!isCartOpen)}
            aria-label="Toggle Cart"
          >
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="badge cart-badge">{cartItemCount}</span>
            )}
          </button>

          {/* Hamburger Menu Toggle */}
          <button 
            className="nav-action-btn hamburger-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu glass animate-fade-in">
          <div className="mobile-search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <div className="mobile-nav-links">
            <button 
              className={`mobile-nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Shop Catalog
            </button>
            <button 
              className={`mobile-nav-link ${currentPage === 'wishlist' ? 'active' : ''}`}
              onClick={() => handleNavClick('wishlist')}
            >
              My Wishlist ({wishlist.length})
            </button>
            <button 
              className={`mobile-nav-link mobile-nav-link-admin ${currentPage === 'admin' ? 'active' : ''}`}
              onClick={() => handleNavClick('admin')}
            >
              <Sliders size={16} /> Admin Controls
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
