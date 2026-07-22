import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { DollarSign, ShoppingBag, TrendingUp, AlertTriangle, Plus, Trash2, Edit3, X, Check } from 'lucide-react';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  const {
    products,
    orders,
    addProduct,
    deleteProduct,
    updateProduct
  } = useContext(ShopContext);

  // Modal management states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProductToEdit, setSelectedProductToEdit] = useState(null);

  // Form states for adding/editing products
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    price: '',
    category: 'audio',
    stock: '',
    colorsInput: 'Stealth Black,#1a1a1a', // comma separated Name,Hex
    featuresInput: '', // newline separated features
    specsInput: '' // newline separated key:value
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) return;

    // Parse custom inputs
    const colors = formData.colorsInput.split('\n')
      .map(line => {
        const parts = line.split(',');
        return parts.length === 2 ? { name: parts[0].trim(), hex: parts[1].trim() } : null;
      }).filter(Boolean);

    const features = formData.featuresInput.split('\n').map(f => f.trim()).filter(Boolean);

    const specs = {};
    formData.specsInput.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length === 2) {
        specs[parts[0].trim()] = parts[1].trim();
      }
    });

    const newProd = {
      name: formData.name,
      tagline: formData.tagline,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      colors: colors.length > 0 ? colors : [{ name: 'Default', hex: '#6366f1' }],
      features: features.length > 0 ? features : ['Premium design'],
      specs: Object.keys(specs).length > 0 ? specs : { 'Material': 'Alloy' },
      images: ['/assets/placeholder.png']
    };

    addProduct(newProd);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditClick = (product) => {
    setSelectedProductToEdit(product);
    setFormData({
      name: product.name,
      tagline: product.tagline,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      colorsInput: product.colors.map(c => `${c.name},${c.hex}`).join('\n'),
      featuresInput: product.features.join('\n'),
      specsInput: Object.entries(product.specs).map(([k,v]) => `${k}:${v}`).join('\n')
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock || !selectedProductToEdit) return;

    const colors = formData.colorsInput.split('\n')
      .map(line => {
        const parts = line.split(',');
        return parts.length === 2 ? { name: parts[0].trim(), hex: parts[1].trim() } : null;
      }).filter(Boolean);

    const features = formData.featuresInput.split('\n').map(f => f.trim()).filter(Boolean);

    const specs = {};
    formData.specsInput.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length === 2) {
        specs[parts[0].trim()] = parts[1].trim();
      }
    });

    const updated = {
      ...selectedProductToEdit,
      name: formData.name,
      tagline: formData.tagline,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      colors: colors.length > 0 ? colors : selectedProductToEdit.colors,
      features: features.length > 0 ? features : selectedProductToEdit.features,
      specs: Object.keys(specs).length > 0 ? specs : selectedProductToEdit.specs
    };

    updateProduct(updated);
    setIsEditModalOpen(false);
    setSelectedProductToEdit(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      tagline: '',
      description: '',
      price: '',
      category: 'audio',
      stock: '',
      colorsInput: 'Stealth Black,#1a1a1a',
      featuresInput: '',
      specsInput: ''
    });
  };

  // KPI Calculations
  const totalSales = orders.reduce((sum, o) => sum + o.totals.total, 0) + 1240.50; // Mock baseline
  const totalOrdersCount = orders.length + 8; // Mock baseline
  const avgOrderVal = totalOrdersCount > 0 ? (totalSales / totalOrdersCount).toFixed(2) : 0;
  const lowStockCount = products.filter(p => p.stock <= 5).length;

  return (
    <div className="admin-page animate-fade-in">
      <div className="container">
        
        <div className="admin-header-row">
          <h1>Admin Dashboard</h1>
          <button className="btn btn-primary add-product-btn" onClick={() => { resetForm(); setIsAddModalOpen(true); }}>
            <Plus size={16} />
            <span>Add Product</span>
          </button>
        </div>

        {/* KPI Grid */}
        <div className="kpi-grid">
          <div className="kpi-card glass">
            <div className="kpi-icon-wrapper text-indigo-400">
              <DollarSign size={22} />
            </div>
            <div>
              <span className="kpi-label">Total Revenue</span>
              <h3 className="kpi-value">${totalSales.toFixed(2)}</h3>
              <p className="kpi-trend text-teal-400">
                <TrendingUp size={12} /> +12.4% vs last week
              </p>
            </div>
          </div>

          <div className="kpi-card glass">
            <div className="kpi-icon-wrapper text-teal-400">
              <ShoppingBag size={22} />
            </div>
            <div>
              <span className="kpi-label">Total Orders</span>
              <h3 className="kpi-value">{totalOrdersCount}</h3>
              <p className="kpi-trend text-teal-400">
                <TrendingUp size={12} /> +8.2% vs last week
              </p>
            </div>
          </div>

          <div className="kpi-card glass">
            <div className="kpi-icon-wrapper text-purple-400">
              <TrendingUp size={22} />
            </div>
            <div>
              <span className="kpi-label">Avg Order Value</span>
              <h3 className="kpi-value">${avgOrderVal}</h3>
              <p className="kpi-trend text-muted">Stable margins</p>
            </div>
          </div>

          <div className="kpi-card glass">
            <div className="kpi-icon-wrapper text-rose-400">
              <AlertTriangle size={22} />
            </div>
            <div>
              <span className="kpi-label">Low Stock Alerts</span>
              <h3 className="kpi-value">{lowStockCount}</h3>
              <p className="kpi-trend text-rose-400">Needs replenishment</p>
            </div>
          </div>
        </div>

        {/* Custom SVG Sales Chart Banner */}
        <div className="analytics-section glass">
          <h2>Sales Velocity Analytics</h2>
          <div className="chart-wrapper">
            {/* High-quality SVG Line Chart representing mock sales performance over past 6 months */}
            <svg viewBox="0 0 1000 240" className="analytics-svg">
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="50" y1="40" x2="950" y2="40" stroke="var(--border-color)" strokeDasharray="5 5" />
              <line x1="50" y1="100" x2="950" y2="100" stroke="var(--border-color)" strokeDasharray="5 5" />
              <line x1="50" y1="160" x2="950" y2="160" stroke="var(--border-color)" strokeDasharray="5 5" />
              <line x1="50" y1="220" x2="950" y2="220" stroke="var(--border-color)" />

              {/* Chart Shading Area */}
              <path 
                d="M 50 220 L 50 170 L 230 140 L 410 180 L 590 100 L 770 120 L 950 50 L 950 220 Z" 
                fill="url(#chartGlow)" 
              />

              {/* Chart Plot Line */}
              <path 
                d="M 50 170 L 230 140 L 410 180 L 590 100 L 770 120 L 950 50" 
                fill="none" 
                stroke="var(--primary)" 
                strokeWidth="4" 
                strokeLinecap="round" 
              />

              {/* Plot Nodes */}
              <circle cx="50" cy="170" r="6" fill="var(--bg-primary)" stroke="var(--primary)" strokeWidth="3" />
              <circle cx="230" cy="140" r="6" fill="var(--bg-primary)" stroke="var(--primary)" strokeWidth="3" />
              <circle cx="410" cy="180" r="6" fill="var(--bg-primary)" stroke="var(--primary)" strokeWidth="3" />
              <circle cx="590" cy="100" r="6" fill="var(--bg-primary)" stroke="var(--primary)" strokeWidth="3" />
              <circle cx="770" cy="120" r="6" fill="var(--bg-primary)" stroke="var(--primary)" strokeWidth="3" />
              <circle cx="950" cy="50" r="6" fill="var(--bg-primary)" stroke="var(--secondary)" strokeWidth="3" />

              {/* Node values labels */}
              <text x="50" y="240" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">Feb</text>
              <text x="230" y="240" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">Mar</text>
              <text x="410" y="240" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">Apr</text>
              <text x="590" y="240" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">May</text>
              <text x="770" y="240" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">Jun</text>
              <text x="950" y="240" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">Jul</text>
            </svg>
          </div>
        </div>

        {/* Catalog and Orders Split View */}
        <div className="admin-split-grid">
          
          {/* Inventory Manager */}
          <div className="admin-panel-card glass">
            <h2>Inventory Management ({products.length} Products)</h2>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div className="admin-product-cell">
                          <span className="color-dot" style={{ backgroundColor: p.colors[0].hex }}></span>
                          <strong>{p.name}</strong>
                        </div>
                      </td>
                      <td className="text-capitalize">{p.category}</td>
                      <td>${p.price.toFixed(2)}</td>
                      <td>
                        <span className={`stock-badge ${p.stock <= 5 ? 'critical' : 'normal'}`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="text-right actions-cell">
                        <button className="action-icon-btn edit" onClick={() => handleEditClick(p)} aria-label="Edit product">
                          <Edit3 size={14} />
                        </button>
                        <button className="action-icon-btn delete" onClick={() => deleteProduct(p.id)} aria-label="Delete product">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Orders log */}
          <div className="admin-panel-card glass">
            <h2>Recent Orders ({orders.length} Placed)</h2>
            <div className="admin-table-container">
              {orders.length === 0 ? (
                <div className="no-orders-notice">
                  <ShoppingBag size={32} className="text-muted" />
                  <p>No orders recorded in this session yet.</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Paid</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.orderNumber}>
                        <td><strong className="text-indigo-400">{o.orderNumber}</strong></td>
                        <td>{o.date}</td>
                        <td>{o.items.reduce((sum, i) => sum + i.quantity, 0)} units</td>
                        <td><strong>${o.totals.total.toFixed(2)}</strong></td>
                        <td>
                          <span className="status-badge processing">
                            <Check size={10} /> {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay animate-fade-in" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Product</h2>
              <button className="close-modal-btn" onClick={() => setIsAddModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label" htmlFor="newProdName">Product Name</label>
                <input id="newProdName" type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" required />
              </div>
              <div className="form-row">
                <div className="form-group flex-1">
                  <label className="form-label" htmlFor="newProdTagline">Tagline</label>
                  <input id="newProdTagline" type="text" name="tagline" value={formData.tagline} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label" htmlFor="newProdCategory">Category</label>
                  <select id="newProdCategory" name="category" value={formData.category} onChange={handleInputChange} className="form-input">
                    <option value="audio">Audio</option>
                    <option value="wearables">Wearables</option>
                    <option value="desk">Desk Accessories</option>
                    <option value="lighting">Smart Lighting</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group flex-1">
                  <label className="form-label" htmlFor="newProdPrice">Price ($)</label>
                  <input id="newProdPrice" type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} className="form-input" required />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label" htmlFor="newProdStock">Stock Quantity</label>
                  <input id="newProdStock" type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="form-input" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="newProdColors">Colors (Format: Name,Hex - one per line)</label>
                <textarea id="newProdColors" name="colorsInput" value={formData.colorsInput} onChange={handleInputChange} rows={2} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="newProdDescription">Description</label>
                <textarea id="newProdDescription" name="description" value={formData.description} onChange={handleInputChange} rows={3} className="form-input" />
              </div>
              <button type="submit" className="btn btn-primary w-full">Create Product Listing</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay animate-fade-in" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Product Details</h2>
              <button className="close-modal-btn" onClick={() => setIsEditModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleEditSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label" htmlFor="editProdName">Product Name</label>
                <input id="editProdName" type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" required />
              </div>
              <div className="form-row">
                <div className="form-group flex-1">
                  <label className="form-label" htmlFor="editProdTagline">Tagline</label>
                  <input id="editProdTagline" type="text" name="tagline" value={formData.tagline} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label" htmlFor="editProdCategory">Category</label>
                  <select id="editProdCategory" name="category" value={formData.category} onChange={handleInputChange} className="form-input">
                    <option value="audio">Audio</option>
                    <option value="wearables">Wearables</option>
                    <option value="desk">Desk Accessories</option>
                    <option value="lighting">Smart Lighting</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group flex-1">
                  <label className="form-label" htmlFor="editProdPrice">Price ($)</label>
                  <input id="editProdPrice" type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} className="form-input" required />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label" htmlFor="editProdStock">Stock Quantity</label>
                  <input id="editProdStock" type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="form-input" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="editProdColors">Colors (Format: Name,Hex - one per line)</label>
                <textarea id="editProdColors" name="colorsInput" value={formData.colorsInput} onChange={handleInputChange} rows={2} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="editProdFeatures">Key Features (one per line)</label>
                <textarea id="editProdFeatures" name="featuresInput" value={formData.featuresInput} onChange={handleInputChange} rows={2} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="editProdSpecs">Technical Specifications (Format: Key:Value - one per line)</label>
                <textarea id="editProdSpecs" name="specsInput" value={formData.specsInput} onChange={handleInputChange} rows={2} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="editProdDescription">Description</label>
                <textarea id="editProdDescription" name="description" value={formData.description} onChange={handleInputChange} rows={3} className="form-input" />
              </div>
              <button type="submit" className="btn btn-primary w-full">Update Product Listing</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
