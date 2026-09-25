// Helper to return relevant high-resolution tech imagery based on category/name
const DEFAULT_IMAGES = {
  Laptops: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  Smartphones: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
  Audio: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  Gaming: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
  Wearables: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  Cameras: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
  Accessories: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
  Default: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
};

export const getProductImage = (product) => {
  if (!product) return DEFAULT_IMAGES.Default;
  
  // If product has custom image property
  if (product.imageUrl) return product.imageUrl;

  const title = (product.prodName || '').toLowerCase();
  const category = (product.category || '').toLowerCase();

  if (title.includes('macbook') || title.includes('laptop') || category.includes('laptop')) {
    return "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80";
  }
  if (title.includes('iphone') || title.includes('galaxy') || title.includes('phone') || category.includes('phone')) {
    return "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80";
  }
  if (title.includes('headphone') || title.includes('earbud') || title.includes('audio') || category.includes('audio')) {
    return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80";
  }
  if (title.includes('playstation') || title.includes('xbox') || title.includes('gpu') || title.includes('gaming') || category.includes('gaming')) {
    return "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80";
  }
  if (title.includes('watch') || category.includes('wearable')) {
    return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
  }
  if (title.includes('camera') || category.includes('camera')) {
    return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80";
  }
  if (title.includes('monitor') || title.includes('display')) {
    return "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80";
  }

  // Match by category
  for (const [key, val] of Object.entries(DEFAULT_IMAGES)) {
    if (category.includes(key.toLowerCase())) return val;
  }

  return DEFAULT_IMAGES.Default;
};
