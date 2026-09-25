import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AddEditProductPage from './pages/AddEditProductPage';
import CartPage from './pages/CartPage';

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <main className="main-content container" style={{ paddingTop: 36, paddingBottom: 16 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/add-product" element={<AddEditProductPage />} />
              <Route path="/edit-product/:id" element={<AddEditProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <Toast />
        </div>
      </BrowserRouter>
    </ShopProvider>
  );
}
