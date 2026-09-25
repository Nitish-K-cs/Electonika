import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import ConfirmModal from '../components/ConfirmModal';
import { LayoutGrid, PlusCircle, RefreshCw, Search } from 'lucide-react';

export default function ProductsPage() {
  const {
    products, loading,
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    selectedBrand, setSelectedBrand,
    deleteProduct, refreshProducts
  } = useShop();

  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('default');
  const [deleteModal, setDeleteModal] = useState({ open: false, product: null });
  const [refreshing, setRefreshing] = useState(false);

  const categories = ['All', 'Laptops', 'Smartphones', 'Audio', 'Gaming', 'Wearables', 'Cameras', 'Accessories'];
  const brands = ['All', ...new Set(products.map(p => p.brand).filter(Boolean))];

  const filtered = products.filter(p => {
    const matchCat = selectedCategory === 'All' || (p.category || '').toLowerCase() === selectedCategory.toLowerCase();
    const matchBrand = selectedBrand === 'All' || (p.brand || '').toLowerCase() === selectedBrand.toLowerCase();
    const matchSearch = !searchQuery ||
      (p.prodName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.brand || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchBrand && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return (a.prodPrice || 0) - (b.prodPrice || 0);
    if (sortBy === 'price-high') return (b.prodPrice || 0) - (a.prodPrice || 0);
    if (sortBy === 'name-asc') return (a.prodName || '').localeCompare(b.prodName || '');
    if (sortBy === 'id-desc') return (b.prodId || 0) - (a.prodId || 0);
    return 0;
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

  const hasFilters = selectedCategory !== 'All' || selectedBrand !== 'All' || searchQuery;

  return (
    <div style={{ paddingBottom: 64 }}>

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-header-title">
            <LayoutGrid size={26} color="#67e8f9" />
            Products Catalog
          </h1>
          <p className="page-header-sub">
            Full inventory connected to Spring Boot API · {filtered.length} of {products.length} items
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            className="btn btn-outline"
            style={{ padding: '10px 12px' }}
            onClick={handleRefresh}
            title="Refresh from API"
          >
            <RefreshCw size={15} style={{ animation: refreshing ? 'spin 0.6s linear infinite' : 'none', color: refreshing ? '#67e8f9' : undefined }} />
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/add-product')}>
            <PlusCircle size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="filter-panel" style={{ marginBottom: 20 }}>
        {/* Search */}
        <div className="filter-field">
          <label className="filter-label">Search</label>
          <div style={{ position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
            <input
              type="text"
              className="filter-input"
              placeholder="Name, brand..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: 32 }}
            />
          </div>
        </div>

        {/* Category */}
        <div className="filter-field">
          <label className="filter-label">Category</label>
          <select className="filter-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Brand */}
        <div className="filter-field">
          <label className="filter-label">Brand</label>
          <select className="filter-select" value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Sort */}
        <div className="filter-field">
          <label className="filter-label">Sort By</label>
          <select className="filter-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="id-desc">Latest (ID Desc)</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasFilters && (
        <div className="active-filters" style={{ marginBottom: 20 }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Active:</span>
          {selectedCategory !== 'All' && (
            <span className="filter-chip">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('All')}>✕</button>
            </span>
          )}
          {selectedBrand !== 'All' && (
            <span className="filter-chip" style={{ borderColor: 'rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.08)', color: '#67e8f9' }}>
              Brand: {selectedBrand}
              <button onClick={() => setSelectedBrand('All')}>✕</button>
            </span>
          )}
          {searchQuery && (
            <span className="filter-chip" style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}>
              "{searchQuery}"
              <button onClick={() => setSearchQuery('')}>✕</button>
            </span>
          )}
          <button
            style={{ fontSize: '0.75rem', color: '#a5b4fc', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => { setSelectedCategory('All'); setSelectedBrand('All'); setSearchQuery(''); }}
          >
            Clear all
          </button>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="product-grid">
          {[1,2,3,4,5,6].map(n => <div key={n} className="skeleton" style={{ height: 320, borderRadius: 20 }} />)}
        </div>
      ) : sorted.length > 0 ? (
        <div className="product-grid">
          {sorted.map(p => (
            <ProductCard key={p.prodId} product={p} onDeleteClick={prod => setDeleteModal({ open: true, product: prod })} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon"><Search size={28} color="#475569" /></div>
          <div className="empty-title">No products matched</div>
          <p className="empty-desc">Adjust your search or filter selections.</p>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, product: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message="This will permanently remove the product from the inventory database."
        itemDetails={deleteModal.product}
      />

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
