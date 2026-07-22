import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowLeft } from 'lucide-react';
import './Wishlist.css';

export const Wishlist = () => {
  const { wishlist, products, navigateTo } = useContext(ShopContext);

  const wishlistedItems = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="wishlist-page animate-fade-in">
      <div className="container">
        {/* Back Link */}
        <button className="back-btn" onClick={() => navigateTo('home')}>
          <ArrowLeft size={16} />
          <span>Back to shop</span>
        </button>

        <div className="wishlist-header">
          <Heart size={24} className="wishlist-title-icon text-rose-500 fill-rose-500" />
          <h1>My Wishlist</h1>
          <span className="wishlist-count">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</span>
        </div>

        {wishlistedItems.length === 0 ? (
          <div className="empty-wishlist glass animate-fade-in">
            <div className="empty-wishlist-icon-wrapper">
              <Heart size={40} className="text-muted" />
            </div>
            <h2>Your wishlist is empty</h2>
            <p>Save your favorite premium items here to purchase later.</p>
            <button className="btn btn-primary" onClick={() => navigateTo('home')}>
              Explore Products
            </button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistedItems.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
