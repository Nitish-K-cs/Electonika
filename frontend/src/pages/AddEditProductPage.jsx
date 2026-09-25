import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { apiService } from '../services/api';
import { PlusCircle, Edit3, ArrowLeft, Save, Hash, Tag, DollarSign, Calendar, Package, FileText } from 'lucide-react';

const CATEGORIES = ['Laptops', 'Smartphones', 'Audio', 'Gaming', 'Wearables', 'Cameras', 'Accessories', 'Keyboards', 'Monitors', 'Tablets'];

const EMPTY_FORM = {
  prodId: '',
  prodName: '',
  prodPrice: '',
  description: '',
  brand: '',
  category: 'Laptops',
  releaseDate: new Date().toISOString().split('T')[0],
  quantity: ''
};

export default function AddEditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProduct, updateProduct, showToast } = useShop();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isEdit) {
      // Auto-generate random prodId suggestion
      setForm(f => ({ ...f, prodId: Math.floor(100 + Math.random() * 900) }));
      return;
    }
    (async () => {
      setLoading(true);
      const res = await apiService.getProductById(id);
      if (res.data) {
        const p = res.data;
        setForm({
          prodId: p.prodId ?? '',
          prodName: p.prodName ?? '',
          prodPrice: p.prodPrice !== undefined ? p.prodPrice : '',
          description: p.description ?? '',
          brand: p.brand ?? '',
          category: p.category ?? 'Laptops',
          releaseDate: p.releaseDate ? new Date(p.releaseDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          quantity: p.quantity !== undefined ? p.quantity : ''
        });
      } else {
        showToast(`Product #${id} not found.`, 'error');
        navigate('/products');
      }
      setLoading(false);
    })();
  }, [id]);

  const validate = () => {
    const e = {};
    if (!form.prodId) e.prodId = 'Product ID is required';
    if (!form.prodName.trim()) e.prodName = 'Product name is required';
    if (!form.prodPrice || isNaN(form.prodPrice) || Number(form.prodPrice) <= 0) e.prodPrice = 'Enter a valid price > 0';
    if (form.quantity === '' || isNaN(form.quantity) || Number(form.quantity) < 0) e.quantity = 'Quantity must be 0 or more';
    if (!form.brand.trim()) e.brand = 'Brand is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(ex => ({ ...ex, [name]: null }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const payload = {
      prodId: Number(form.prodId),
      prodName: form.prodName.trim(),
      prodPrice: parseFloat(form.prodPrice),
      description: form.description.trim(),
      brand: form.brand.trim(),
      category: form.category,
      releaseDate: new Date(form.releaseDate).toISOString(),
      quantity: parseInt(form.quantity, 10)
    };

    const success = isEdit ? await updateProduct(payload) : await addProduct(payload);
    setSubmitting(false);
    if (success) navigate('/products');
  };

  if (loading) {
    return (
      <div style={{ paddingBottom: 64 }}>
        <div className="skeleton" style={{ height: 40, width: 120, borderRadius: 10, marginBottom: 24 }} />
        <div className="skeleton" style={{ height: 500, borderRadius: 24 }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', paddingBottom: 64 }}>

      {/* Page Header */}
      <div className="page-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
        <button className="btn btn-outline btn-sm" onClick={() => navigate(-1)}>
          <ArrowLeft size={14} /> Back
        </button>
        <div>
          <h1 className="page-header-title">
            {isEdit
              ? <><Edit3 size={24} color="#fcd34d" /> Edit Product</>
              : <><PlusCircle size={24} color="#67e8f9" /> Add New Product</>
            }
          </h1>
          <p className="page-header-sub">
            {isEdit
              ? `Updating product #${id} · PUT /api/products`
              : 'Create a new product · POST /api/products'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-grid-2">

          {/* Product ID */}
          <div className="form-group">
            <label className="form-label">
              <Hash size={12} color="#a5b4fc" /> Product ID
            </label>
            <input
              type="number"
              name="prodId"
              value={form.prodId}
              onChange={handleChange}
              disabled={isEdit}
              className={`form-input${isEdit ? ' disabled' : ''}`}
              placeholder="e.g. 101"
              style={{ fontFamily: 'monospace' }}
            />
            {errors.prodId && <span className="field-error">{errors.prodId}</span>}
          </div>

          {/* Product Name */}
          <div className="form-group">
            <label className="form-label">
              <Tag size={12} color="#67e8f9" /> Product Name
            </label>
            <input
              type="text"
              name="prodName"
              value={form.prodName}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. MacBook Pro M3"
            />
            {errors.prodName && <span className="field-error">{errors.prodName}</span>}
          </div>

          {/* Price */}
          <div className="form-group">
            <label className="form-label">
              <DollarSign size={12} color="#34d399" /> Price (USD)
            </label>
            <input
              type="number"
              step="0.01"
              name="prodPrice"
              value={form.prodPrice}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. 1499.99"
              style={{ fontFamily: 'monospace' }}
            />
            {errors.prodPrice && <span className="field-error">{errors.prodPrice}</span>}
          </div>

          {/* Quantity */}
          <div className="form-group">
            <label className="form-label">
              <Package size={12} color="#c084fc" /> Stock Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. 25"
              style={{ fontFamily: 'monospace' }}
            />
            {errors.quantity && <span className="field-error">{errors.quantity}</span>}
          </div>

          {/* Brand */}
          <div className="form-group">
            <label className="form-label">Brand</label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Apple, Samsung, Sony"
            />
            {errors.brand && <span className="field-error">{errors.brand}</span>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="form-select">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Release Date */}
          <div className="form-group">
            <label className="form-label">
              <Calendar size={12} color="#fcd34d" /> Release Date
            </label>
            <input
              type="date"
              name="releaseDate"
              value={form.releaseDate}
              onChange={handleChange}
              className="form-input"
              style={{ fontFamily: 'monospace' }}
            />
          </div>

          {/* Description (full width) */}
          <div className="form-group span-2">
            <label className="form-label">
              <FileText size={12} color="#94a3b8" /> Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Hardware specs, features, warranty info..."
            />
          </div>

        </div>

        <div className="form-footer">
          <button type="button" className="btn btn-outline btn-sm" onClick={() => navigate('/products')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            <Save size={15} />
            {submitting ? 'Saving...' : isEdit ? 'Update Product' : 'Add to Catalog'}
          </button>
        </div>
      </form>
    </div>
  );
}
