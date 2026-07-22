import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Star, Heart, ShoppingBag, ArrowLeft, Shield, Truck, RefreshCw } from 'lucide-react';
import './ProductDetails.css';

export const ProductDetails = () => {
  const {
    selectedProductId,
    products,
    addToCart,
    toggleWishlist,
    wishlist,
    navigateTo
  } = useContext(ShopContext);

  const product = products.find(p => p.id === selectedProductId);

  // Return home if product not found
  if (!product) {
    return (
      <div className="container product-not-found">
        <h2>Product not found</h2>
        <button className="btn btn-primary" onClick={() => navigateTo('home')}>Back to Shop</button>
      </div>
    );
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('features');

  // Review states (allow mock submittal)
  const [reviews, setReviews] = useState([
    { name: "Sarah K.", rating: 5, date: "2 weeks ago", comment: "Absolutely incredible build quality. Looks beautiful on my desk, and the sound isolation is next-level." },
    { name: "Marcus L.", rating: 4, date: "1 month ago", comment: "Excellent sound signature. Very comfortable for long hours. Docked 1 star because shipping took an extra day." }
  ]);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  // Sync selected color and image index when product changes
  useEffect(() => {
    setSelectedColor(product.colors[0]);
    setActiveImageIndex(0);
    setQuantity(1);
  }, [product]);

  const isWishlisted = wishlist.includes(product.id);

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, Math.min(product.stock, prev + amount)));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newReviewName.trim() === '' || newReviewComment.trim() === '') return;

    const newRev = {
      name: newReviewName,
      rating: newReviewRating,
      date: "Just now",
      comment: newReviewComment
    };

    setReviews([newRev, ...reviews]);
    setNewReviewName('');
    setNewReviewComment('');
  };

  // Find related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="product-details-page animate-fade-in">
      <div className="container">
        {/* Back Link */}
        <button className="back-btn" onClick={() => navigateTo('home')}>
          <ArrowLeft size={16} />
          <span>Back to catalog</span>
        </button>

        {/* Core Layout Grid */}
        <div className="details-grid">
          
          {/* Gallery Section */}
          <div className="details-gallery">
            <div className="main-image-container glass">
              <div className="details-image-overlay-glow" style={{ background: `radial-gradient(circle, ${selectedColor.hex}1a 0%, transparent 70%)` }}></div>
              <img 
                src={product.images[activeImageIndex] || product.images[0]} 
                alt={product.name} 
                className="main-display-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="details-image-fallback" style={{ border: `2px dashed ${selectedColor.hex}44` }}>
                <div className="details-fallback-glow" style={{ backgroundColor: selectedColor.hex }}></div>
              </div>
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="gallery-thumbnails">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    className={`thumbnail-btn glass ${activeImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{ borderColor: activeImageIndex === idx ? selectedColor.hex : 'var(--border-color)' }}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="thumbnail-fallback" style={{ backgroundColor: selectedColor.hex }}></div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="details-info">
            <span className="details-category-tag">{product.category}</span>
            <h1 className="details-title">{product.name}</h1>
            <p className="details-tagline">{product.tagline}</p>

            <div className="details-rating-row">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'} 
                  />
                ))}
              </div>
              <span className="rating-value">{product.rating} ({product.reviewCount} customer reviews)</span>
            </div>

            <p className="details-price">${product.price.toFixed(2)}</p>
            <p className="details-description">{product.description}</p>

            {/* Colors Selectors */}
            <div className="details-colors-selector">
              <span className="selector-label">Finish: <strong>{selectedColor.name}</strong></span>
              <div className="colors-row">
                {product.colors.map((color, idx) => (
                  <button 
                    key={idx}
                    className={`color-selector-dot ${selectedColor.name === color.name ? 'active' : ''}`}
                    style={{ 
                      backgroundColor: color.hex,
                      outlineColor: selectedColor.name === color.name ? color.hex : 'transparent' 
                    }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select finish ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add Actions */}
            <div className="details-buy-section">
              <div className="details-qty-wrapper">
                <span className="selector-label">Quantity</span>
                <div className="details-qty-selector">
                  <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock}>+</button>
                </div>
              </div>

              <div className="details-actions">
                <button 
                  className="btn btn-primary add-to-cart-btn" 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingBag size={18} />
                  <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
                </button>
                
                <button 
                  className={`wishlist-action-btn glass ${isWishlisted ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                >
                  <Heart size={18} className={isWishlisted ? 'heart-filled' : ''} />
                </button>
              </div>
            </div>

            {/* Stock Count Indicator */}
            <p className={`details-stock-status ${product.stock < 5 && product.stock > 0 ? 'low-stock' : ''}`}>
              {product.stock === 0 ? (
                "Sold Out"
              ) : product.stock < 5 ? (
                `Hurry! Only ${product.stock} items left in stock.`
              ) : (
                `In stock: ${product.stock} items available.`
              )}
            </p>

            {/* Micro value props */}
            <div className="details-props-grid">
              <div className="prop-card glass">
                <Truck size={20} className="text-indigo-400" />
                <div>
                  <h4>Free Shipping</h4>
                  <p>On all orders above $150</p>
                </div>
              </div>
              <div className="prop-card glass">
                <RefreshCw size={20} className="text-teal-400" />
                <div>
                  <h4>Easy Returns</h4>
                  <p>30-day hassle-free returns</p>
                </div>
              </div>
              <div className="prop-card glass">
                <Shield size={20} className="text-rose-400" />
                <div>
                  <h4>2-Year Warranty</h4>
                  <p>Full commercial hardware cover</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="details-tabs-section">
          <div className="tabs-header">
            <button 
              className={`tab-link ${activeTab === 'features' ? 'active' : ''}`}
              onClick={() => setActiveTab('features')}
            >
              Key Features
            </button>
            <button 
              className={`tab-link ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Technical Specs
            </button>
            <button 
              className={`tab-link ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          <div className="tab-content glass">
            {/* Features Tab */}
            {activeTab === 'features' && (
              <ul className="features-list animate-fade-in">
                {product.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            )}

            {/* Specs Tab */}
            {activeTab === 'specs' && (
              <table className="specs-table animate-fade-in">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td className="spec-name">{key}</td>
                      <td className="spec-val">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="reviews-tab-container animate-fade-in">
                {/* Reviews List */}
                <div className="reviews-list">
                  {reviews.map((rev, i) => (
                    <div key={i} className="review-card glass">
                      <div className="review-header">
                        <strong>{rev.name}</strong>
                        <span className="review-date">{rev.date}</span>
                      </div>
                      <div className="review-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < rev.rating ? 'star-filled' : 'star-empty'} />
                        ))}
                      </div>
                      <p className="review-comment">{rev.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Add Review Form */}
                <form onSubmit={handleAddReview} className="add-review-form glass">
                  <h3>Write a Customer Review</h3>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="revName">Name</label>
                    <input 
                      id="revName" 
                      type="text" 
                      placeholder="Your name" 
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      className="form-input" 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="revRating">Rating</label>
                    <select 
                      id="revRating" 
                      value={newReviewRating} 
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="form-input"
                    >
                      <option value={5}>5 Stars (Excellent)</option>
                      <option value={4}>4 Stars (Good)</option>
                      <option value={3}>3 Stars (Average)</option>
                      <option value={2}>2 Stars (Poor)</option>
                      <option value={1}>1 Star (Terrible)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="revComment">Comment</label>
                    <textarea 
                      id="revComment" 
                      placeholder="Share your experience..." 
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      className="form-input" 
                      rows={4}
                      required 
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">Submit Review</button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="related-title">Related Products</h2>
            <div className="related-grid">
              {relatedProducts.map(p => (
                <div key={p.id} className="related-card glass" onClick={() => navigateTo('product-details', p.id)}>
                  <div className="related-image-wrapper">
                    <img src={p.images[0]} alt={p.name} onError={(e) => { e.target.style.display = 'none'; }} />
                    <div className="related-fallback" style={{ backgroundColor: p.colors[0].hex }}></div>
                  </div>
                  <h3>{p.name}</h3>
                  <span className="related-price">${p.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
