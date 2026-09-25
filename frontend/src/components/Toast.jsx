import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useShop();
  if (!toast.show) return null;

  const icons = {
    success: <CheckCircle2 size={18} color="#34d399" />,
    error: <AlertCircle size={18} color="#f87171" />,
    info: <Info size={18} color="#67e8f9" />
  };

  return (
    <div className={`toast ${toast.type || 'info'}`}>
      {icons[toast.type] || icons.info}
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}
