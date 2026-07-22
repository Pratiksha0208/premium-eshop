import React, { createContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

export const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('aura-theme') || 'dark';
  });

  // Navigation state (SPA routing)
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null); // stores active completed order details
  const [isCartOpen, setIsCartOpen] = useState(false); // control sliding cart drawer

  // Product inventory state (admin can add/edit products)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('aura-products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aura-cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('aura-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('aura-orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Catalog search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('featured');

  // Promo code state
  const [appliedPromo, setAppliedPromo] = useState(null); // { code: 'WELCOME20', discount: 0.2 }
  const [promoError, setPromoError] = useState('');

  // Sync state to local storage and HTML attributes
  useEffect(() => {
    localStorage.setItem('aura-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('aura-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('aura-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aura-orders', JSON.stringify(orders));
  }, [orders]);

  // Actions
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navigateTo = (page, productId = null) => {
    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product, quantity = 1, selectedColor = null) => {
    const color = selectedColor || product.colors[0];
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.selectedColor.name === color.name
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, quantity, selectedColor: color }];
      }
    });
    setIsCartOpen(true); // Automatically open the cart drawer when an item is added
  };

  const removeFromCart = (productId, colorName) => {
    setCart(prevCart => prevCart.filter(
      item => !(item.product.id === productId && item.selectedColor.name === colorName)
    ));
  };

  const updateCartQuantity = (productId, colorName, amount) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId && item.selectedColor.name === colorName) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const applyPromoCode = (code) => {
    const sanitized = code.trim().toUpperCase();
    if (sanitized === 'WELCOME20') {
      setAppliedPromo({ code: 'WELCOME20', discount: 0.20 });
      setPromoError('');
      return true;
    } else if (sanitized === 'RESUME10') {
      setAppliedPromo({ code: 'RESUME10', discount: 0.10 });
      setPromoError('');
      return true;
    } else {
      setPromoError('Invalid promo code');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Checkout and place order
  const placeOrder = (shippingInfo, paymentInfo) => {
    const orderNumber = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderNumber,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: [...cart],
      totals: getCartTotals(),
      shippingInfo,
      status: 'Processing'
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);

    // Update inventory stock
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        const cartItem = cart.find(item => item.product.id === p.id);
        if (cartItem) {
          return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
        }
        return p;
      });
    });

    clearCart();
    navigateTo('confirmation');
    return orderNumber;
  };

  // Inventory administration
  const addProduct = (newProduct) => {
    const formatted = {
      ...newProduct,
      id: newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 5.0,
      reviewCount: 0,
      featured: false,
      images: newProduct.images || ["/assets/placeholder.png"],
      colors: newProduct.colors || [{ name: "Default", hex: "#6366f1" }],
      features: newProduct.features || [],
      specs: newProduct.specs || {}
    };
    setProducts(prev => [formatted, ...prev]);
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  // Calculation helpers
  const getCartTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const discountAmount = appliedPromo ? subtotal * appliedPromo.discount : 0;
    const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15.0;
    const tax = (subtotal - discountAmount) * 0.08; // 8% sales tax
    const total = subtotal - discountAmount + shipping + tax;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: parseFloat(discountAmount.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    };
  };

  // Filter and sort products
  const getFilteredProducts = () => {
    let result = [...products];

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.tagline.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Sort products
    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: Featured first, then alphabetical
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      });
    }

    return result;
  };

  return (
    <ShopContext.Provider value={{
      theme,
      toggleTheme,
      currentPage,
      navigateTo,
      selectedProductId,
      currentOrder,
      isCartOpen,
      setIsCartOpen,
      products,
      cart,
      wishlist,
      orders,
      searchQuery,
      setSearchQuery,
      activeCategory,
      setActiveCategory,
      sortOption,
      setSortOption,
      appliedPromo,
      promoError,
      applyPromoCode,
      removePromoCode,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      toggleWishlist,
      placeOrder,
      clearCart,
      getCartTotals,
      getFilteredProducts,
      addProduct,
      deleteProduct,
      updateProduct
    }}>
      {children}
    </ShopContext.Provider>
  );
};
