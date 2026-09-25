import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { getCategoryConfig } from '../services/categoryConfig';
import { ShoppingCart, Trash2, ArrowLeft, CreditCard, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, clearCart, showToast } = useShop();
  const navigate = useNavigate();

  const subtotal = cart.reduce((s, i) => s + (i.product.prodPrice || 0) * i.quantity, 0);
  const tax      = subtotal * 0.08;
  const shipping = subtotal > 500 ? 0 : 25;
  const total    = subtotal + tax + shipping;

  const handleCheckout = () => {
    showToast('🎉 Order placed! Thank you for shopping at Electonika.', 'success');
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="empty-state" style={{ marginTop: 60 }}>
        <div className="empty-icon">
          <ShoppingCart size={28} color="#475569" />
        </div>
        <div className="empty-title">Your Cart is Empty</div>
        <p className="empty-desc">Add some electronics to get started.</p>
        <Link to="/products" className="btn btn-primary">
          Browse Products <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 64 }}>

      {/* Header */}
      <div className="page-header">
        <div>
          <button className="btn btn-outline btn-sm" onClick={() => navigate(-1)} style={{ marginBottom: 10 }}>
            <ArrowLeft size={14} /> Continue Shopping
          </button>
          <h1 className="page-header-title">
            <ShoppingCart size={26} color="#67e8f9" /> Shopping Cart
          </h1>
          <p className="page-header-sub">{cart.reduce((s, i) => s + i.quantity, 0)} items in your cart</p>
        </div>
        <button className="btn btn-outline btn-sm" style={{ color: '#f87171', borderColor: 'rgba(239,68,68,0.3)' }} onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      {/* Layout */}
      <div className="cart-layout">

        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {cart.map(({ product, quantity }) => {
            const cfg = getCategoryConfig(product);
            const itemTotal = (product.prodPrice || 0) * quantity;
            return (
              <div key={product.prodId} className="cart-item">
                {/* Icon */}
                <div className="cart-icon-box" style={{ background: `${cfg.gradient}1a` }}>
                  <span style={{ fontSize: '1.7rem', lineHeight: 1 }}>{cfg.icon}</span>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span className="badge badge-id" style={{ fontSize: '0.65rem' }}>#{product.prodId}</span>
                    {product.category && <span className="badge badge-cat" style={{ fontSize: '0.65rem' }}>{product.category}</span>}
                  </div>
                  <div style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#f1f5f9', fontSize: '0.95rem', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {product.prodName}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                    {product.brand} · ${Number(product.prodPrice || 0).toFixed(2)} each
                  </div>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => updateCartQuantity(product.prodId, quantity - 1)}>−</button>
                    <span className="qty-value">{quantity}</span>
                    <button className="qty-btn" onClick={() => updateCartQuantity(product.prodId, quantity + 1)}>+</button>
                  </div>

                  <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1rem', color: '#fff', minWidth: 80, textAlign: 'right' }}>
                    ${itemTotal.toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeFromCart(product.prodId)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', padding: 4, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
                    onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="summary-title">Order Summary</div>

          <div className="summary-row">
            <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
            <span style={{ fontWeight: 600, color: '#f1f5f9', fontFamily: 'monospace' }}>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (8%)</span>
            <span style={{ fontWeight: 600, color: '#f1f5f9', fontFamily: 'monospace' }}>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span style={{ fontWeight: 700, color: shipping === 0 ? '#34d399' : '#f1f5f9', fontFamily: 'monospace' }}>
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="summary-row total">
            <span>Total Due</span>
            <span className="summary-total-amount">${total.toFixed(2)}</span>
          </div>

          <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 20 }} onClick={handleCheckout}>
            <CreditCard size={17} /> Proceed to Checkout
          </button>

          <div className="summary-perks">
            <div className="perk-row"><ShieldCheck size={14} color="#34d399" /> 256-bit encrypted checkout</div>
            <div className="perk-row"><Truck size={14} color="#67e8f9" /> Free shipping on orders over $500</div>
          </div>
        </div>

      </div>
    </div>
  );
}
