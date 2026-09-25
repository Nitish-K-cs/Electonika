import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { getCategoryConfig } from '../services/categoryConfig';
import ProductCard from '../components/ProductCard';
import ConfirmModal from '../components/ConfirmModal';
import { Sparkles, PlusCircle, ArrowRight, Server, CheckCircle, Layers, Search, RefreshCw } from 'lucide-react';

export default function Home() {
  const {
    products, loading, isLiveBackend,
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    deleteProduct, refreshProducts
  } = useShop();

  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState({ open: false, product: null });
  const [refreshing, setRefreshing] = useState(false);

  const categories = ['All', 'Laptops', 'Smartphones', 'Audio', 'Gaming', 'Wearables', 'Cameras'];

  const filtered = products.filter(p => {
    const matchCat = selectedCategory === 'All' || (p.category || '').toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch = !searchQuery ||
      (p.prodName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.brand || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshProducts();
    setTimeout(() => setRefreshing(false), 600);
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.product) await deleteProduct(deleteModal.product.prodId);
    setDeleteModal({ open: false, product: null });
  };

  return (
    <div style={{ paddingBottom: 64 }}>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-tag">
            <Sparkles size={13} color="#67e8f9" />
            Electonika · Full-Stack CRUD Platform
          </div>

          <h1 className="hero-title">
            Next-Gen Electronics<br />
            <span className="gradient-text">Powered by Spring API</span>
          </h1>

          <p className="hero-desc">
            Browse, add, edit and delete products connected to your Spring Boot backend at{' '}
            <code style={{
              color: '#67e8f9', fontFamily: 'monospace', fontSize: '0.82rem',
              background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)',
              padding: '2px 8px', borderRadius: 6
            }}>
              localhost:8080/api/products
            </code>
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/add-product')}>
              <PlusCircle size={17} /> Add New Product
            </button>
            <Link to="/products" className="btn btn-outline btn-lg">
              All Products ({products.length}) <ArrowRight size={16} />
            </Link>
            <button
              className="btn btn-outline"
              onClick={handleRefresh}
              title="Sync from API"
              style={{ padding: '14px 16px' }}
            >
              <RefreshCw size={16} style={{ color: refreshing ? '#67e8f9' : undefined, animation: refreshing ? 'spin 0.6s linear infinite' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-label">Total Products</div>
            <div className="stat-value">{products.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Backend API</div>
            <div className="stat-value-sm" style={{ color: isLiveBackend ? '#34d399' : '#fbbf24' }}>
              <Server size={14} />
              {isLiveBackend ? 'Port 8080 Active' : 'Offline Mode'}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Categories</div>
            <div className="stat-value" style={{ color: '#67e8f9' }}>6+</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">CRUD Status</div>
            <div className="stat-value-sm" style={{ color: '#a5b4fc' }}>
              <CheckCircle size={14} /> Synchronized
            </div>
          </div>
        </div>
      </section>

      {/* ── Section Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: 800, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Layers size={20} color="#a5b4fc" /> Featured Inventory
          </h2>
          <p style={{ fontSize: '0.78rem', color: '#475569', marginTop: 4 }}>
            Showing {filtered.length} of {products.length} items
          </p>
        </div>

        {/* Mobile search */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={14} style={{ position: 'absolute', left: 12, color: '#475569', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="filter-input"
            style={{ paddingLeft: 34, width: 200 }}
          />
        </div>
      </div>

      {/* ── Category Pills ── */}
      <div className="category-pills" style={{ marginBottom: 28 }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`pill ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Product Grid ── */}
      {loading ? (
        <div className="product-grid">
          {[1,2,3,4,5,6].map(n => (
            <div key={n} className="skeleton" style={{ height: 320, borderRadius: 20 }} />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="product-grid">
          {filtered.map(p => (
            <ProductCard key={p.prodId} product={p} onDeleteClick={prod => setDeleteModal({ open: true, product: prod })} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon"><Search size={28} color="#475569" /></div>
          <div className="empty-title">No products found</div>
          <p className="empty-desc">
            {searchQuery ? `No matches for "${searchQuery}"` : `Nothing in "${selectedCategory}" category yet.`}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-outline btn-sm" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
              Reset Filters
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/add-product')}>
              Add Product
            </button>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, product: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message="This will permanently remove the product from the database."
        itemDetails={deleteModal.product}
      />

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
