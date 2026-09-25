import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Zap, ShoppingCart, PlusCircle, Search, LayoutGrid, Home as HomeIcon, Server, WifiOff } from 'lucide-react';

export default function Navbar() {
  const { cart, searchQuery, setSearchQuery, isLiveBackend } = useShop();
  const navigate = useNavigate();
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="navbar glass-nav">
      <div className="container">
        <div className="navbar-inner">

          {/* Brand */}
          <Link to="/" className="brand">
            <div className="brand-icon">
              <Zap size={18} color="#fff" fill="rgba(255,255,255,0.2)" />
            </div>
            <div>
              <div className="brand-text">ELECTONIKA</div>
              <div className="brand-sub">Tech Ecommerce</div>
            </div>
          </Link>

          {/* Search */}
          <div className="navbar-search">
            <Search className="search-icon" size={15} />
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchQuery.trim() && navigate('/products')}
            />
            {searchQuery && (
              <button className="clear-btn" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>

          {/* Nav Links */}
          <nav className="nav-links">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <HomeIcon size={16} /><span>Home</span>
            </NavLink>

            <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <LayoutGrid size={16} /><span>Products</span>
            </NavLink>

            <NavLink to="/add-product" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <PlusCircle size={16} style={{ color: '#67e8f9' }} /><span>Add</span>
            </NavLink>

            {/* Cart */}
            <Link to="/cart" className="cart-btn">
              <ShoppingCart size={18} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>

            {/* API Status */}
            <div className={`api-status ${isLiveBackend ? 'live' : 'offline'}`}>
              {isLiveBackend ? (
                <><span className="status-dot" /><Server size={12} />8080</>
              ) : (
                <><WifiOff size={12} />Offline</>
              )}
            </div>
          </nav>

        </div>
      </div>
    </header>
  );
}
