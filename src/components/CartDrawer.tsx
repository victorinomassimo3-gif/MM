import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { CartItem, StoreConfig } from '../types';
import { CartSection } from './CartSection';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  storeConfig: StoreConfig;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  storeConfig,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="relative z-10 w-full max-w-lg bg-[#0e0e0e] border-l border-[#292929] h-full flex flex-col shadow-2xl overflow-y-auto">
        {/* Drawer Header */}
        <div className="sticky top-0 z-20 bg-[#121212] border-b border-[#242424] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ff7900]" />
            <h2 className="font-bebas text-2xl uppercase tracking-wider text-white">
              Seu Pedido
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1e1e1e] hover:bg-[#2e2e2e] text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Re-use Cart Section content inside drawer */}
        <div className="flex-1 p-2 sm:p-4">
          <CartSection
            cart={cart}
            storeConfig={storeConfig}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
            onClearCart={onClearCart}
          />
        </div>
      </div>
    </div>
  );
};
