import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { CheckCircle2, Calendar, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import './OrderConfirmation.css';

export const OrderConfirmation = () => {
  const { currentOrder, navigateTo } = useContext(ShopContext);

  if (!currentOrder) {
    return (
      <div className="container confirmation-empty">
        <h2>No order found</h2>
        <button className="btn btn-primary" onClick={() => navigateTo('home')}>Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="confirmation-page animate-fade-in">
      <div className="container confirmation-container">
        
        {/* Success Header */}
        <div className="success-header">
          <div className="checkmark-wrapper">
            <CheckCircle2 size={64} className="text-teal-400" />
          </div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase. We are prepping your workspace upgrades.</p>
        </div>

        {/* Core Layout Details Grid */}
        <div className="confirmation-grid">
          
          {/* Order Details Panel */}
          <div className="confirmation-panel glass">
            <h2>Order Details</h2>
            
            <div className="order-meta-rows">
              <div className="meta-item">
                <span className="meta-label">Order Number</span>
                <strong className="meta-val text-indigo-400">{currentOrder.orderNumber}</strong>
              </div>
              <div className="meta-item">
                <span className="meta-label">Date Placed</span>
                <span className="meta-val">{currentOrder.date}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Estimated Delivery</span>
                <span className="meta-val text-teal-400">3 - 5 Business Days</span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="shipping-address-summary">
              <h3>Shipping Address</h3>
              <p>{currentOrder.shippingInfo.firstName} {currentOrder.shippingInfo.lastName}</p>
              <p>{currentOrder.shippingInfo.address}</p>
              <p>{currentOrder.shippingInfo.city}, {currentOrder.shippingInfo.zip}</p>
              <p>{currentOrder.shippingInfo.email}</p>
            </div>

            {/* Simulated Shipment Tracking */}
            <div className="shipment-status-tracker">
              <h3>Delivery Status</h3>
              <div className="tracker-nodes">
                <div className="tracker-node active">
                  <span className="tracker-dot"></span>
                  <span className="tracker-label">Confirmed</span>
                </div>
                <div className="tracker-bar active"></div>
                <div className="tracker-node">
                  <span className="tracker-dot"></span>
                  <span className="tracker-label">Processing</span>
                </div>
                <div className="tracker-bar"></div>
                <div className="tracker-node">
                  <span className="tracker-dot"></span>
                  <span className="tracker-label">In Transit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Sidebar */}
          <div className="confirmation-sidebar glass">
            <h2>Receipt Summary</h2>
            <div className="receipt-items-list">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="receipt-item">
                  <div className="receipt-qty">{item.quantity}x</div>
                  <div className="receipt-details">
                    <h4>{item.product.name}</h4>
                    <p className="receipt-color">{item.selectedColor.name}</p>
                  </div>
                  <span className="receipt-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="receipt-totals">
              <div className="totals-row">
                <span>Subtotal</span>
                <span>${currentOrder.totals.subtotal.toFixed(2)}</span>
              </div>
              {currentOrder.totals.discount > 0 && (
                <div className="totals-row text-discount">
                  <span>Discount</span>
                  <span>-${currentOrder.totals.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="totals-row">
                <span>Shipping</span>
                <span>{currentOrder.totals.shipping === 0 ? "FREE" : `$${currentOrder.totals.shipping.toFixed(2)}`}</span>
              </div>
              <div className="totals-row">
                <span>Tax (8%)</span>
                <span>${currentOrder.totals.tax.toFixed(2)}</span>
              </div>
              <div className="totals-row grand-total-row">
                <span>Total Paid</span>
                <span>${currentOrder.totals.total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="confirmation-cta">
              <button className="btn btn-primary w-full" onClick={() => navigateTo('home')}>
                Continue Shopping
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
