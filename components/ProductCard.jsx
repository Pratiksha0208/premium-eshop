import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, navigateTo } = useContext(ShopContext);

  const isWishlisted = wishlist.includes(product.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card glass" onClick={() => navigateTo('product-details', product.id)}>
      {/* Card Header Tag & Wishlist Button */}
      <div className="card-header">
        <span className="card-category-tag">{product.category}</span>
        <button 
          className={`wishlist-toggle-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label="Add to wishlist"
        >
          <Heart size={16} className={isWishlisted ? 'heart-filled' : ''} />
        </button>
      </div>

      {/* Product Image */}
      <div className="card-image-container">
        <div className="image-overlay-glow" style={{ background: `radial-gradient(circle, ${product.colors[0].hex}22 0%, transparent 60%)` }}></div>
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="card-product-image"
          onError={(e) => {
            // Fallback representation of high-tech gear
            e.target.style.display = 'none';
          }}
        />
        {/* Geometric representation fallback */}
        <div className="card-image-fallback" style={{ border: `1px dashed ${product.colors[0].hex}44` }}>
          <div className="fallback-inner-glow" style={{ backgroundColor: product.colors[0].hex }}></div>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <div className="rating-row">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'} 
              />
            ))}
          </div>
          <span className="rating-text">{product.rating} ({product.reviewCount})</span>
        </div>

        <h3 className="card-title">{product.name}</h3>
        <p className="card-tagline">{product.tagline}</p>

        <div className="card-footer">
          <span className="card-price">${product.price.toFixed(2)}</span>
          <button 
            className="btn-add-to-cart" 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            aria-label="Add to cart"
          >
            {product.stock === 0 ? (
              <span className="out-of-stock-text">Sold Out</span>
            ) : (
              <>
                <ShoppingCart size={14} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
