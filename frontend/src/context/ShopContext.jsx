import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiveBackend, setIsLiveBackend] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('electonika_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  
  // Toast notifications
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'info' });
    }, 4000);
  };

  useEffect(() => {
    localStorage.setItem('electonika_cart', JSON.stringify(cart));
  }, [cart]);

  const loadProducts = async () => {
    setLoading(true);
    const result = await apiService.getProducts();
    setProducts(result.data || []);
    setIsLiveBackend(result.isLive);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // CRUD Operations
  const handleAddProduct = async (productData) => {
    const result = await apiService.addProduct(productData);
    if (result.success) {
      showToast(
        result.isLive 
          ? `Product "${productData.prodName}" added successfully to server!` 
          : `Product "${productData.prodName}" added to local store (Backend offline)!`, 
        'success'
      );
      await loadProducts();
      return true;
    } else {
      showToast('Failed to add product. Please try again.', 'error');
      return false;
    }
  };

  const handleUpdateProduct = async (productData) => {
    const result = await apiService.updateProduct(productData);
    if (result.success) {
      showToast(
        result.isLive 
          ? `Product ID #${productData.prodId} updated successfully on server!` 
          : `Product ID #${productData.prodId} updated locally (Backend offline)!`, 
        'success'
      );
      await loadProducts();
      return true;
    } else {
      showToast('Failed to update product.', 'error');
      return false;
    }
  };

  const handleDeleteProduct = async (id) => {
    const result = await apiService.deleteProduct(id);
    if (result.success) {
      showToast(`Product ID #${id} deleted successfully.`, 'info');
      await loadProducts();
      return true;
    } else {
      showToast('Failed to delete product.', 'error');
      return false;
    }
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.product.prodId === product.prodId);
      if (existing) {
        return prevCart.map(item =>
          item.product.prodId === product.prodId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    showToast(`Added ${product.prodName} to shopping cart!`, 'success');
  };

  const removeFromCart = (prodId) => {
    setCart(prev => prev.filter(item => item.product.prodId !== prodId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (prodId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(prodId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.prodId === prodId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        loading,
        isLiveBackend,
        cart,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        toast,
        showToast,
        refreshProducts: loadProducts,
        addProduct: handleAddProduct,
        updateProduct: handleUpdateProduct,
        deleteProduct: handleDeleteProduct,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
