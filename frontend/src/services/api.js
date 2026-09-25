const API_BASE_URL = 'http://localhost:8080/api';

// Initial seed data used if backend API server is offline
const INITIAL_PRODUCTS = [
  {
    prodId: 101,
    prodName: "MacBook Pro 16\" M3 Max",
    prodPrice: 3499.00,
    description: "Apple M3 Max chip with 16-core CPU and 40-core GPU, 36GB Unified Memory, 1TB SSD storage, Liquid Retina XDR display.",
    brand: "Apple",
    category: "Laptops",
    releaseDate: "2024-01-15",
    quantity: 12
  },
  {
    prodId: 102,
    prodName: "Samsung Galaxy S24 Ultra",
    prodPrice: 1299.99,
    description: "256GB Titanium Gray, Galaxy AI integrated, 200MP camera system, Snapdragon 8 Gen 3 for Galaxy, S Pen included.",
    brand: "Samsung",
    category: "Smartphones",
    releaseDate: "2024-02-01",
    quantity: 25
  },
  {
    prodId: 103,
    prodName: "Sony WH-1000XM5 Headphones",
    prodPrice: 398.00,
    description: "Industry-leading noise canceling wireless headphones with Auto NC Optimizer, crystal clear hands-free calling.",
    brand: "Sony",
    category: "Audio",
    releaseDate: "2023-11-10",
    quantity: 30
  },
  {
    prodId: 104,
    prodName: "PlayStation 5 Pro",
    prodPrice: 699.99,
    description: "Advanced Ray Tracing, AI-Enhanced Upscaling (PSSR), 2TB SSD Storage, 60FPS Fidelity Mode gaming.",
    brand: "Sony",
    category: "Gaming",
    releaseDate: "2024-11-07",
    quantity: 8
  },
  {
    prodId: 105,
    prodName: "Dell XPS 15 OLED",
    prodPrice: 2199.50,
    description: "15.6 inch 3.5K OLED Touch Display, Intel Core i9-13900H, 32GB RAM, 1TB SSD, NVIDIA GeForce RTX 4060.",
    brand: "Dell",
    category: "Laptops",
    releaseDate: "2024-03-20",
    quantity: 15
  },
  {
    prodId: 106,
    prodName: "Apple Watch Ultra 2",
    prodPrice: 799.00,
    description: "Rugged 49mm titanium case, Precision Dual-Frequency GPS, up to 36 hours battery life, 3000 nits display.",
    brand: "Apple",
    category: "Wearables",
    releaseDate: "2023-09-22",
    quantity: 18
  }
];

// Helper to manage local fallback storage
const getLocalProducts = () => {
  const stored = localStorage.getItem('electonika_products');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse local products", e);
    }
  }
  localStorage.setItem('electonika_products', JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
};

const saveLocalProducts = (products) => {
  localStorage.setItem('electonika_products', JSON.stringify(products));
};

export const apiService = {
  // Get all products
  getProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return { data, isLive: true };
    } catch (error) {
      console.warn("Backend API offline or unreachable at http://localhost:8080/api/products. Using local dataset.", error);
      return { data: getLocalProducts(), isLive: false, error: error.message };
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return { data, isLive: true };
    } catch (error) {
      const local = getLocalProducts();
      const found = local.find(p => p.prodId === Number(id));
      return { data: found || null, isLive: false, error: error.message };
    }
  },

  // Add new product
  addProduct: async (product) => {
    const formatted = {
      ...product,
      prodId: Number(product.prodId),
      prodPrice: parseFloat(product.prodPrice),
      quantity: parseInt(product.quantity, 10),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formatted)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      // Update local storage too to sync UI fallback state
      const local = getLocalProducts();
      saveLocalProducts([formatted, ...local]);

      return { success: true, isLive: true };
    } catch (error) {
      console.warn("POST failed. Saving to local storage fallback.", error);
      const local = getLocalProducts();
      const updated = [formatted, ...local.filter(p => p.prodId !== formatted.prodId)];
      saveLocalProducts(updated);
      return { success: true, isLive: false, fallback: true };
    }
  },

  // Update product
  updateProduct: async (product) => {
    const formatted = {
      ...product,
      prodId: Number(product.prodId),
      prodPrice: parseFloat(product.prodPrice),
      quantity: parseInt(product.quantity, 10),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formatted)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      // Update local storage
      const local = getLocalProducts();
      const updated = local.map(p => p.prodId === formatted.prodId ? formatted : p);
      saveLocalProducts(updated);

      return { success: true, isLive: true };
    } catch (error) {
      console.warn("PUT failed. Updating local storage fallback.", error);
      const local = getLocalProducts();
      const updated = local.map(p => p.prodId === formatted.prodId ? formatted : p);
      saveLocalProducts(updated);
      return { success: true, isLive: false, fallback: true };
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const local = getLocalProducts();
      saveLocalProducts(local.filter(p => p.prodId !== Number(id)));

      return { success: true, isLive: true };
    } catch (error) {
      console.warn("DELETE failed. Deleting from local storage fallback.", error);
      const local = getLocalProducts();
      saveLocalProducts(local.filter(p => p.prodId !== Number(id)));
      return { success: true, isLive: false, fallback: true };
    }
  }
};
