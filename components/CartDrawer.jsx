import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, Trash2, Minus, Plus, Percent, ShoppingBag } from 'lucide-react';
import './CartDrawer.css';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    appliedPromo,
    promoError,
    applyPromoCode,
    removePromoCode,
    getCartTotals,
    navigateTo
  } = useContext(ShopContext);

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const totals = getCartTotals();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim() !== '') {
      const success = applyPromoCode(promoInput);
      if (success) {
        setPromoInput('');
      }
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="cart-drawer-overlay animate-fade-in" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer glass" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="header-title-container">
            <ShoppingBag size={20} className="text-indigo-400" />
            <h2>Shopping Cart</h2>
            <span className="drawer-item-count">{totals.itemCount}</span>
          </div>
          <button className="close-drawer-btn" onClick={() => setIsCartOpen(false)} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body (Scrollable items) */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart-state animate-fade-in">
              <div className="empty-cart-icon-wrapper">
                <ShoppingBag size={48} className="text-muted" />
              </div>
              <h3>Your cart is empty</h3>
              <p>Add some premium workspace goods to get started.</p>
              <button className="btn btn-primary btn-shop-now" onClick={() => { setIsCartOpen(false); navigateTo('home'); }}>
                Shop Products
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item, index) => (
                <div key={`${item.product.id}-${item.selectedColor.name}-${index}`} className="cart-item glass">
                  {/* Item Image */}
                  <div className="cart-item-image-wrapper">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="cart-item-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="cart-item-image-fallback" style={{ backgroundColor: item.selectedColor.hex }}></div>
                  </div>

                  {/* Item Info */}
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <h4 onClick={() => { setIsCartOpen(false); navigateTo('product-details', item.product.id); }}>
                        {item.product.name}
                      </h4>
                      <button 
                        className="btn-remove-item"
                        onClick={() => removeFromCart(item.product.id, item.selectedColor.name)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    
                    <p className="cart-item-color">
                      Color: <span className="color-dot" style={{ backgroundColor: item.selectedColor.hex }}></span> {item.selectedColor.name}
                    </p>

                    <div className="cart-item-footer">
                      <span className="cart-item-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                      
                      {/* Quantity Selector */}
                      <div className="qty-selector">
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.selectedColor.name, -1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.selectedColor.name, 1)}
                          disabled={item.quantity >= item.product.stock}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer (Sticky calculations & promo) */}
        {cart.length > 0 && (
          <div className="drawer-footer glass">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="promo-form">
              {appliedPromo ? (
                <div className="applied-promo-tag">
                  <Percent size={14} />
                  <span>Promo applied: <strong>{appliedPromo.code}</strong> ({(appliedPromo.discount * 100)}% Off)</span>
                  <button type="button" className="btn-remove-promo" onClick={removePromoCode}>Remove</button>
                </div>
              ) : (
                <div className="promo-input-wrapper">
                  <input 
                    type="text" 
                    placeholder="Promo Code (WELCOME20)" 
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="promo-input"
                  />
                  <button type="submit" className="btn-apply-promo">Apply</button>
                </div>
              )}
              {promoError && <p className="promo-error-msg">{promoError}</p>}
            </form>

            {/* Price Calculations */}
            <div className="checkout-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="summary-row text-discount">
                  <span>Discount</span>
                  <span>-${totals.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping</span>
                <span>{totals.shipping === 0 ? "FREE" : `$${totals.shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row">
                <span>Sales Tax (8%)</span>
                <span>${totals.tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn btn-primary btn-checkout-action" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
