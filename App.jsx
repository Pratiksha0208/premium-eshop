import React, { useContext } from 'react';
import { FeaturedCategories } from "./components/FeaturedCategories";
import { ShopProvider, ShopContext } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetails } from './pages/ProductDetails';
import { Wishlist } from './pages/Wishlist';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { AdminDashboard } from './pages/AdminDashboard';
import { SlidersHorizontal, ArrowUp } from 'lucide-react';

import './App.css';

// Main layout wrapper that uses ShopContext
const MainLayout = () => {
  const {
    currentPage,
    getFilteredProducts,
    activeCategory,
    setActiveCategory,
    sortOption,
    setSortOption,
    searchQuery
  } = useContext(ShopContext);

  const filteredProducts = getFilteredProducts();

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'product-details':
        return <ProductDetails />;
      case 'wishlist':
        return <Wishlist />;
      case 'checkout':
        return <Checkout />;
      case 'confirmation':
        return <OrderConfirmation />;
      case 'admin':
        return <AdminDashboard />;
      case 'home':
      default:
        return (
          <>
            {/* Hero Section */}
            <Hero />

             <FeaturedCategories />

            <section className="catalog-section" id="catalog-section">
              <div className="container">
                <div className="catalog-header animate-fade-in">
                  <div className="catalog-title-wrapper">
                    <h2>Premium Collective</h2>
                    <p>Meticulously crafted items for your daily productivity and relaxation</p>
                  </div>

                  {/* Filter / Sort Control Banner */}
                  <div className="catalog-controls glass">
                    {/* Category Tabs */}
                    <div className="category-filters">
                      {['all', 'audio', 'wearables', 'desk', 'lighting'].map((cat) => (
                        <button
                          key={cat}
                          className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                          onClick={() => handleCategoryClick(cat)}
                        >
                          {cat === 'all' ? 'All Goods' : cat}
                        </button>
                      ))}
                    </div>

                    {/* Sorting dropdown */}
                    <div className="sort-filter-wrapper">
                      <SlidersHorizontal size={14} className="text-indigo-400" />
                      <select 
                        value={sortOption} 
                        onChange={handleSortChange}
                        className="sort-dropdown"
                        aria-label="Sort products"
                      >
                        <option value="featured">Featured First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Live search results label */}
                {searchQuery && (
                  <p className="search-results-feedback">
                    Showing results for "<strong>{searchQuery}</strong>" ({filteredProducts.length} items found)
                  </p>
                )}

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="no-results glass animate-fade-in">
                    <h3>No products found</h3>
                    <p>Try refining your search keyword or clearing category filters.</p>
                    <button className="btn btn-secondary" onClick={() => handleCategoryClick('all')}>
                      View All Products
                    </button>
                  </div>
                ) : (
                  <div className="product-grid animate-fade-in">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="app-layout">
      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Main Page Area */}
      <main className="main-content-wrapper">
        {renderActivePage()}
      </main>

      {/* Sliding Shopping Cart Sidebar */}
      <CartDrawer />

      {/* Footer Branding */}
      <footer className="footer glass">
        <div className="container footer-content">
          <div className="footer-brand">
            <span className="logo-text">AURA</span>
            <p>Sleek designs, high-end engineering, premium acoustics.</p>
          </div>
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} AURA Lifestyle Tech. Built for resume showcases.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}

export default App;
