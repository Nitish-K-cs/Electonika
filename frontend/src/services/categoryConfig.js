// Maps product category/name to an icon character + gradient colors
// Used in place of product images until image URLs are added to the backend

const CONFIG = {
  laptops:     { icon: '💻', gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)', glow: 'rgba(99,102,241,0.25)' },
  smartphones: { icon: '📱', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)', glow: 'rgba(6,182,212,0.25)' },
  audio:       { icon: '🎧', gradient: 'linear-gradient(135deg, #a855f7, #6366f1)', glow: 'rgba(168,85,247,0.25)' },
  gaming:      { icon: '🎮', gradient: 'linear-gradient(135deg, #ef4444, #f97316)', glow: 'rgba(239,68,68,0.25)' },
  wearables:   { icon: '⌚', gradient: 'linear-gradient(135deg, #10b981, #06b6d4)', glow: 'rgba(16,185,129,0.25)' },
  cameras:     { icon: '📸', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)', glow: 'rgba(245,158,11,0.25)' },
  accessories: { icon: '🖱️', gradient: 'linear-gradient(135deg, #64748b, #475569)', glow: 'rgba(100,116,139,0.2)' },
  keyboards:   { icon: '⌨️', gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)', glow: 'rgba(139,92,246,0.25)' },
  monitors:    { icon: '🖥️', gradient: 'linear-gradient(135deg, #0ea5e9, #3b82f6)', glow: 'rgba(14,165,233,0.25)' },
  tablets:     { icon: '📟', gradient: 'linear-gradient(135deg, #f472b6, #a855f7)', glow: 'rgba(244,114,182,0.25)' },
  default:     { icon: '⚡', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', glow: 'rgba(99,102,241,0.2)' },
};

export function getCategoryConfig(product) {
  if (!product) return CONFIG.default;

  const name = (product.prodName || '').toLowerCase();
  const cat  = (product.category || '').toLowerCase();

  // Check keywords in name
  if (name.includes('laptop') || name.includes('macbook') || name.includes('notebook')) return CONFIG.laptops;
  if (name.includes('phone') || name.includes('iphone') || name.includes('galaxy') || name.includes('pixel')) return CONFIG.smartphones;
  if (name.includes('headphone') || name.includes('airpod') || name.includes('earphone') || name.includes('earbud') || name.includes('speaker')) return CONFIG.audio;
  if (name.includes('playstation') || name.includes('xbox') || name.includes('gpu') || name.includes('gaming') || name.includes('controller')) return CONFIG.gaming;
  if (name.includes('watch') || name.includes('band') || name.includes('fitness')) return CONFIG.wearables;
  if (name.includes('camera') || name.includes('lens')) return CONFIG.cameras;
  if (name.includes('keyboard')) return CONFIG.keyboards;
  if (name.includes('monitor') || name.includes('display') || name.includes('screen')) return CONFIG.monitors;
  if (name.includes('tablet') || name.includes('ipad')) return CONFIG.tablets;

  // Check category
  for (const [key, val] of Object.entries(CONFIG)) {
    if (cat.includes(key)) return val;
  }

  return CONFIG.default;
}
