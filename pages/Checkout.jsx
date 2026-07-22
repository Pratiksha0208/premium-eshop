import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ShieldCheck, Loader2, ArrowLeft, CreditCard, Calendar, Lock, User } from 'lucide-react';
import './Checkout.css';

export const Checkout = () => {
  const { cart, getCartTotals, placeOrder, navigateTo } = useContext(ShopContext);

  if (cart.length === 0) {
    return (
      <div className="container checkout-empty">
        <h2>Your cart is empty</h2>
        <p>Add products to your cart before checking out.</p>
        <button className="btn btn-primary" onClick={() => navigateTo('home')}>Back to Shop</button>
      </div>
    );
  }

  const totals = getCartTotals();

  // Multi-step Checkout State
  const [step, setStep] = useState(1); // 1 = Shipping, 2 = Payment, 3 = Processing

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [processingStatus, setProcessingStatus] = useState('');

  // Handle Input Changes
  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    let value = e.target.value;
    
    // Auto-format card number with spaces every 4 digits
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Auto-format expiry date MM/YY
    if (e.target.name === 'cardExpiry') {
      value = value.replace(/\//g, '').replace(/(\d{2})/g, '$1/').replace(/\/$/, '').slice(0, 5);
    }

    setPaymentInfo({ ...paymentInfo, [e.target.name]: value });
  };

  // Validation
  const validateShipping = () => {
    const errors = {};
    if (!shippingInfo.firstName.trim()) errors.firstName = 'First name is required';
    if (!shippingInfo.lastName.trim()) errors.lastName = 'Last name is required';
    if (!shippingInfo.email.trim() || !/\S+@\S+\.\S+/.test(shippingInfo.email)) errors.email = 'Valid email is required';
    if (!shippingInfo.address.trim()) errors.address = 'Street address is required';
    if (!shippingInfo.city.trim()) errors.city = 'City is required';
    if (!shippingInfo.zip.trim()) errors.zip = 'ZIP code is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePayment = () => {
    const errors = {};
    if (!paymentInfo.cardName.trim()) errors.cardName = 'Name on card is required';
    
    // Strip spaces for length check
    const rawCard = paymentInfo.cardNumber.replace(/\s/g, '');
    if (rawCard.length < 16) errors.cardNumber = 'Card number must be 16 digits';
    
    if (paymentInfo.cardExpiry.length < 5) errors.cardExpiry = 'Expiry date must be MM/YY';
    if (paymentInfo.cardCvv.length < 3) errors.cardCvv = 'CVV must be 3-4 digits';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Next/Back Step Controls
  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1 && validateShipping()) {
      setStep(2);
      setFormErrors({});
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
      setFormErrors({});
    }
  };

  // Final Simulated Checkout Submit
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validatePayment()) return;

    setStep(3);
    setFormErrors({});

    // simulated step-by-step payment processing log
    setProcessingStatus('Connecting to secure gateway...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setProcessingStatus('Authorizing payment transaction...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProcessingStatus('Verifying security signatures...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setProcessingStatus('Finalizing order allocation...');
    await new Promise(resolve => setTimeout(resolve, 600));

    // Place the order
    placeOrder(shippingInfo, paymentInfo);
  };

  return (
    <div className="checkout-page animate-fade-in">
      <div className="container">
        
        {/* Core Checkout Grid */}
        <div className="checkout-grid">
          
          {/* Left Column: Form Details */}
          <div className="checkout-main glass">
            
            {/* Step Indicators */}
            <div className="checkout-steps">
              <div className={`step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <span className="step-num">1</span>
                <span className="step-label">Shipping</span>
              </div>
              <div className="step-line"></div>
              <div className={`step-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                <span className="step-num">2</span>
                <span className="step-label">Payment</span>
              </div>
              <div className="step-line"></div>
              <div className={`step-node ${step >= 3 ? 'active' : ''}`}>
                <span className="step-num">3</span>
                <span className="step-label">Review</span>
              </div>
            </div>

            {/* Step 1: Shipping Address Form */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="checkout-form animate-fade-in">
                <h2>Shipping Information</h2>
                
                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <input 
                      id="firstName"
                      type="text" 
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      className="form-input" 
                    />
                    {formErrors.firstName && <span className="error-text">{formErrors.firstName}</span>}
                  </div>
                  <div className="form-group flex-1">
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input 
                      id="lastName"
                      type="text" 
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      className="form-input" 
                    />
                    {formErrors.lastName && <span className="error-text">{formErrors.lastName}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    name="email"
                    placeholder="email@example.com"
                    value={shippingInfo.email}
                    onChange={handleShippingChange}
                    className="form-input" 
                  />
                  {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="address">Street Address</label>
                  <input 
                    id="address"
                    type="text" 
                    name="address"
                    placeholder="123 Luxury Workspace Lane"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    className="form-input" 
                  />
                  {formErrors.address && <span className="error-text">{formErrors.address}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="form-label" htmlFor="city">City</label>
                    <input 
                      id="city"
                      type="text" 
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className="form-input" 
                    />
                    {formErrors.city && <span className="error-text">{formErrors.city}</span>}
                  </div>
                  <div className="form-group flex-1">
                    <label className="form-label" htmlFor="zip">ZIP / Postal Code</label>
                    <input 
                      id="zip"
                      type="text" 
                      name="zip"
                      value={shippingInfo.zip}
                      onChange={handleShippingChange}
                      className="form-input" 
                    />
                    {formErrors.zip && <span className="error-text">{formErrors.zip}</span>}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-checkout-next">
                  Continue to Payment
                </button>
              </form>
            )}

            {/* Step 2: Payment Details Form */}
            {step === 2 && (
              <form onSubmit={handleSubmitOrder} className="checkout-form animate-fade-in">
                <div className="form-title-row">
                  <button type="button" className="checkout-back-link" onClick={handlePrevStep}>
                    <ArrowLeft size={14} /> Back
                  </button>
                  <h2>Payment Details</h2>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cardName">Cardholder Name</label>
                  <div className="input-with-icon">
                    <User size={16} className="input-icon" />
                    <input 
                      id="cardName"
                      type="text" 
                      name="cardName"
                      placeholder="Jane Doe"
                      value={paymentInfo.cardName}
                      onChange={handlePaymentChange}
                      className="form-input input-pad-left" 
                    />
                  </div>
                  {formErrors.cardName && <span className="error-text">{formErrors.cardName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cardNumber">Card Number</label>
                  <div className="input-with-icon">
                    <CreditCard size={16} className="input-icon" />
                    <input 
                      id="cardNumber"
                      type="text" 
                      name="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19} // 16 digits + 3 spaces
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      className="form-input input-pad-left" 
                    />
                  </div>
                  {formErrors.cardNumber && <span className="error-text">{formErrors.cardNumber}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="form-label" htmlFor="cardExpiry">Expiration Date</label>
                    <div className="input-with-icon">
                      <Calendar size={16} className="input-icon" />
                      <input 
                        id="cardExpiry"
                        type="text" 
                        name="cardExpiry"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={paymentInfo.cardExpiry}
                        onChange={handlePaymentChange}
                        className="form-input input-pad-left" 
                      />
                    </div>
                    {formErrors.cardExpiry && <span className="error-text">{formErrors.cardExpiry}</span>}
                  </div>
                  
                  <div className="form-group flex-1">
                    <label className="form-label" htmlFor="cardCvv">CVV</label>
                    <div className="input-with-icon">
                      <Lock size={16} className="input-icon" />
                      <input 
                        id="cardCvv"
                        type="password" 
                        name="cardCvv"
                        placeholder="•••"
                        maxLength={4}
                        value={paymentInfo.cardCvv}
                        onChange={handlePaymentChange}
                        className="form-input input-pad-left" 
                      />
                    </div>
                    {formErrors.cardCvv && <span className="error-text">{formErrors.cardCvv}</span>}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-checkout-next">
                  Place Order: ${totals.total.toFixed(2)}
                </button>
              </form>
            )}

            {/* Step 3: Simulated Payment Processing */}
            {step === 3 && (
              <div className="checkout-processing animate-fade-in">
                <Loader2 size={48} className="processing-spinner" />
                <h2>Securing Payment</h2>
                <p className="processing-log">{processingStatus}</p>
                <div className="secure-badge">
                  <ShieldCheck size={16} className="text-teal-400" />
                  <span>256-bit bank grade security encryption active</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Order Summary */}
          <div className="checkout-sidebar glass">
            <h3>Order Summary</h3>
            <div className="checkout-sidebar-list">
              {cart.map((item, index) => (
                <div key={index} className="checkout-sidebar-item">
                  <div className="item-qty-badge">{item.quantity}</div>
                  <div className="item-summary-details">
                    <h4>{item.product.name}</h4>
                    <p className="item-summary-color">
                      <span className="color-dot" style={{ backgroundColor: item.selectedColor.hex }}></span>
                      {item.selectedColor.name}
                    </p>
                  </div>
                  <span className="item-summary-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Invoice Details */}
            <div className="sidebar-summary-costs">
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
            
            <div className="secure-checkout-notice">
              <ShieldCheck size={18} className="text-indigo-400" />
              <p>Your payment details are fully simulated. No real charges are made.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
