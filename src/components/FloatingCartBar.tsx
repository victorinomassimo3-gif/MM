import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatMoney } from '../data/menu';

interface FloatingCartBarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
}) => {
  if (cartCount === 0) return null;

  return (
    <div className="sm:hidden fixed bottom-3 left-3 right-3 z-40">
      <button
        onClick={onOpenCart}
        className="w-full bg-gradient-to-r from-[#ff7900] to-[#ff9b24] text-black font-extrabold px-4 py-3 rounded-2xl shadow-[0_4px_25px_rgba(255,121,0,0.5)] flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer border border-white/20"
      >
        <div className="flex items-center gap-3">
          <div className="relative bg-black text-[#ff7900] w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-xs">
            <ShoppingBag className="w-4 h-4 text-[#ff7900]" />
            <span className="absolute -top-1 -right-1 bg-[#ff7900] text-black w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center border border-black">
              {cartCount}
            </span>
          </div>
          <div className="text-left leading-tight">
            <span className="text-[11px] uppercase tracking-wider font-black block text-black/80">
              Ver Pedido
            </span>
            <span className="font-mono text-sm font-black">{formatMoney(cartTotal)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-bebas text-lg uppercase tracking-wider bg-black/15 px-3 py-1 rounded-xl">
          <span>Finalizar</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </div>
      </button>
    </div>
  );
};
