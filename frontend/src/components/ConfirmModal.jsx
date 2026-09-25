import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, itemDetails }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <AlertTriangle size={17} color="#f87171" />
            </div>
            <div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1rem', color: '#f1f5f9' }}>
                {title || 'Confirm Delete'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#f87171', fontFamily: 'monospace', marginTop: 2 }}>
                DELETE operation — cannot be undone
              </div>
            </div>
          </div>
          <button className="btn btn-icon btn-outline" style={{ padding: 6 }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: 16 }}>
            {message || 'Are you sure you want to delete this item?'}
          </p>

          {itemDetails && (
            <div style={{
              padding: '14px 16px',
              borderRadius: 10,
              background: 'rgba(7,9,15,0.8)',
              border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', flexDirection: 'column', gap: 8
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: '#64748b' }}>Product ID</span>
                <span style={{ color: '#a5b4fc', fontFamily: 'monospace', fontWeight: 700 }}>
                  #{itemDetails.prodId}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: '#64748b' }}>Name</span>
                <span style={{ color: '#f1f5f9', fontWeight: 600, maxWidth: 220, textAlign: 'right' }}>
                  {itemDetails.prodName}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline btn-sm" onClick={onClose}>Cancel</button>
          <button
            className="btn btn-sm"
            style={{
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
              color: '#fff',
              boxShadow: '0 4px 16px rgba(220,38,38,0.35)',
              gap: 6, display: 'inline-flex', alignItems: 'center'
            }}
            onClick={onConfirm}
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
