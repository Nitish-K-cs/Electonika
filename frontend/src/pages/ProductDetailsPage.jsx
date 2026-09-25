import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { apiService } from '../services/api';
import { getCategoryConfig } from '../services/categoryConfig';
import ConfirmModal from '../components/ConfirmModal';
import {
  ArrowLeft, ShoppingCart, Edit, Trash2,
  PackageCheck, PackageX, Calendar, Tag, Minus, Plus
} from 'lucide-react';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, deleteProduct } = useShop();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await apiService.getProductById(id);
      setProduct(res.data);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <div style={{ paddingBottom: 64 }}>
        <div className="skeleton" style={{ height: 40, width: 120, borderRadius: 10, marginBottom: 24 }} />
        <div className="skeleton" style={{ height: 440, borderRadius: 24 }} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="empty-state" style={{ marginTop: 60 }}>
        <div className="empty-icon"><PackageX size={28} color="#475569" /></div>
        <div className="empty-title">Product Not Found</div>
        <p className="empty-desc">Product ID #{id} does not exist in the catalog.</p>
        <Link to="/products" className="btn btn-primary btn-sm">Return to Catalog</Link>
      </div>
    );
  }

  const cfg = getCategoryConfig(product);
  const isOutOfStock = !product.quantity || product.quantity <= 0;
  const total = (Number(product.prodPrice || 0) * qty).toFixed(2);

  const handleConfirmDelete = async () => {
    await deleteProduct(product.prodId);
    setDeleteOpen(false);
    navigate('/products');
  };

  return (
    <div style={{ paddingBottom: 64 }}>
      <button className="btn btn-outline btn-sm" onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
        <ArrowLeft size={15} /> Back
      </button>

      <div className="detail-layout">

        {/* Icon Panel (where image will go once backend returns imageUrl) */}
        <div className="detail-icon-panel">
          <div className="detail-icon-glow" />
          <div className="detail-big-icon" style={{ background: `${cfg.gradient}22` }}>
            <span style={{ fontSize: '3.5rem', lineHeight: 1 }}>{cfg.icon}</span>
          </div>

          {/* Top badges */}
          <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="badge badge-id">#{product.prodId}</span>
            {product.category && <span className="badge badge-cat">{product.category}</span>}
          </div>
        </div>

        {/* Info Panel */}
        <div className="detail-info">
          <div>
            {/* Brand & Stock */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              {product.brand && (
                <span className="badge badge-brand" style={{ fontSize: '0.8rem', padding: '5px 12px' }}>
                  {product.brand}
                </span>
              )}
              <span className={`card-stock ${isOutOfStock ? 'out' : 'in'}`} style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                {isOutOfStock
                  ? <><PackageX size={14} /> Out of stock</>
                  : <><PackageCheck size={14} /> {product.quantity} units available</>}
              </span>
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: 'Outfit', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
              {product.prodName}
            </h1>

            {/* Price */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#475569', marginBottom: 4 }}>Price</div>
              <div className="detail-price">
                ${Number(product.prodPrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div style={{
                padding: '14px 16px', borderRadius: 12,
                background: 'rgba(7,9,15,0.6)', border: '1px solid rgba(255,255,255,0.06)',
                marginBottom: 20
              }}>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#475569', marginBottom: 8, fontWeight: 700 }}>
                  Description
                </div>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.7 }}>
                  {product.description}
                </p>
              </div>
            )}

            {/* Specs */}
            <div className="detail-specs">
              <div className="spec-item">
                <div className="spec-label"><Calendar size={11} style={{ display: 'inline', marginRight: 4 }} />Release Date</div>
                <div className="spec-value">
                  {product.releaseDate ? new Date(product.releaseDate).toLocaleDateString() : 'N/A'}
                </div>
              </div>
              <div className="spec-item">
                <div className="spec-label"><Tag size={11} style={{ display: 'inline', marginRight: 4 }} />Stock Qty</div>
                <div className="spec-value">{product.quantity || 0} units</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div>
            {/* Qty + Add to Cart */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Qty control */}
              <div className="qty-control">
                <button className="qty-btn" disabled={isOutOfStock || qty <= 1} onClick={() => setQty(q => q - 1)}>
                  <Minus size={13} />
                </button>
                <span className="qty-value">{qty}</span>
                <button className="qty-btn" disabled={isOutOfStock || qty >= (product.quantity || 1)} onClick={() => setQty(q => q + 1)}>
                  <Plus size={13} />
                </button>
              </div>

              <button
                disabled={isOutOfStock}
                onClick={() => addToCart(product, qty)}
                className="btn btn-primary"
                style={{ flex: 1, minWidth: 180 }}
              >
                <ShoppingCart size={16} />
                Add to Cart · ${total}
              </button>
            </div>

            {/* Edit / Delete */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-warning btn-sm" onClick={() => navigate(`/edit-product/${product.prodId}`)}>
                <Edit size={14} /> Edit Product
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => setDeleteOpen(true)}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message="Permanently remove this product from the inventory database?"
        itemDetails={product}
      />
    </div>
  );
}
