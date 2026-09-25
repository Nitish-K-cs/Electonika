import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { getCategoryConfig } from '../services/categoryConfig';
import { Eye, Edit, Trash2, ShoppingCart, PackageCheck, PackageX } from 'lucide-react';

export default function ProductCard({ product, onDeleteClick }) {
  const { addToCart } = useShop();
  const navigate = useNavigate();

  const cfg = getCategoryConfig(product);
  const isOutOfStock = !product.quantity || product.quantity <= 0;

  return (
    <div className="product-card fade-in">

      {/* Category icon banner — no image until backend provides URL */}
      <div
        className="card-icon-banner"
        style={{ background: cfg.gradient.replace('linear-gradient', 'linear-gradient').replace(')', ', 0.15)').replace('(', '(') + ', rgba(7,9,15,0.5)' }}
      >
        {/* Soft gradient wash only */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at center, ${cfg.glow} 0%, transparent 70%)`,
        }} />
        <div className="card-icon-wrap" style={{ background: `${cfg.gradient}22` }}>
          <span style={{ fontSize: '2rem', lineHeight: 1 }}>{cfg.icon}</span>
        </div>

        {/* ID badge top-left */}
        <div style={{ position: 'absolute', top: 10, left: 12 }}>
          <span className="badge badge-id">#{product.prodId}</span>
        </div>

        {/* Hover action buttons */}
        <div className="card-actions">
          <button
            className="card-action-btn view"
            onClick={() => navigate(`/products/${product.prodId}`)}
            title="View Details"
          >
            <Eye size={14} />
          </button>
          <button
            className="card-action-btn edit"
            onClick={() => navigate(`/edit-product/${product.prodId}`)}
            title="Edit"
          >
            <Edit size={14} />
          </button>
          <button
            className="card-action-btn del"
            onClick={() => onDeleteClick(product)}
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        {/* Meta row */}
        <div className="card-meta">
          {product.category && <span className="badge badge-cat">{product.category}</span>}
          {product.brand && <span className="badge badge-brand">{product.brand}</span>}
        </div>

        {/* Title */}
        <Link to={`/products/${product.prodId}`} className="card-title">
          {product.prodName}
        </Link>

        {/* Description */}
        {product.description && (
          <p className="card-desc">{product.description}</p>
        )}

        {/* Footer */}
        <div className="card-footer">
          <div>
            <div className="card-price-label">Price</div>
            <div className="card-price">
              ${Number(product.prodPrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className={`card-stock ${isOutOfStock ? 'out' : 'in'}`} style={{ marginTop: 4 }}>
              {isOutOfStock
                ? <><PackageX size={12} /> Out of stock</>
                : <><PackageCheck size={12} /> {product.quantity} in stock</>
              }
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={isOutOfStock}
            className="btn btn-primary btn-sm"
            style={{ flexShrink: 0 }}
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>

    </div>
  );
}
