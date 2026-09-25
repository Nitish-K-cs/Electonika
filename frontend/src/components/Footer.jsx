import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Server } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Zap size={15} color="#fff" fill="rgba(255,255,255,0.2)" />
              </div>
              <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1rem', color: '#fff' }}>
                ELECTONIKA
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.7 }}>
              Full-stack CRUD e-commerce engine built with Spring Boot REST API (port 8080) and React Vite frontend.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="footer-heading">Navigate</div>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/add-product">Add Product</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* API Endpoints */}
          <div>
            <div className="footer-heading">API Endpoints</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { method: 'GET', color: '#34d399', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', path: '/api/products' },
                { method: 'POST', color: '#60a5fa', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.25)', path: '/api/products' },
                { method: 'PUT', color: '#fcd34d', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', path: '/api/products' },
                { method: 'DEL', color: '#fca5a5', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)', path: '/api/products/:id' },
              ].map(({ method, color, bg, border, path }) => (
                <div key={method} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem' }}>
                  <span style={{
                    padding: '2px 7px', borderRadius: 4, fontFamily: 'monospace',
                    fontWeight: 700, fontSize: '0.68rem', color,
                    background: bg, border: `1px solid ${border}`
                  }}>{method}</span>
                  <span style={{ color: '#475569', fontFamily: 'monospace' }}>{path}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System */}
          <div>
            <div className="footer-heading">System</div>
            <div style={{
              padding: '14px 16px', borderRadius: 12,
              background: 'rgba(7,9,15,0.6)', border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.78rem'
            }}>
              {[
                ['Backend', 'Spring Boot', '#67e8f9'],
                ['Port', '8080', '#a5b4fc'],
                ['Frontend', 'React + Vite', '#c4b5fd'],
                ['Database', 'PostgreSQL', '#86efac'],
              ].map(([label, val, color]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>{label}</span>
                  <span style={{ color, fontWeight: 600 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Electonika. All rights reserved.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <ShieldCheck size={13} color="#67e8f9" /> Secure CRUD API
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Server size={13} color="#a5b4fc" /> Spring Boot 3
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
