import React, { useState } from 'react';
import { Plus, Minus, Check, MessageSquare, Utensils } from 'lucide-react';
import { MenuItem } from '../types';
import { formatMoney } from '../data/menu';

interface ProductCardProps {
  product: MenuItem;
  onAddToCart: (product: MenuItem, quantity: number, notes?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [itemNotes, setItemNotes] = useState<string>('');
  const [showNotesInput, setShowNotesInput] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAdd = () => {
    onAddToCart(product, quantity, itemNotes.trim() ? itemNotes.trim() : undefined);
    setAddedSuccess(true);
    setItemNotes('');
    setShowNotesInput(false);
    setTimeout(() => {
      setAddedSuccess(false);
      setQuantity(1);
    }, 1200);
  };

  return (
    <article className="group bg-[#131313] hover:bg-[#181818] border border-[#262626] hover:border-[#ff7900]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg">
      <div>
        {/* Visual Media Header (if product has image) */}
        {product.image && !imageError ? (
          <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#1f1f1f]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark gradient overlay for typography readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-black/20 pointer-events-none" />

            {/* Circular Stamp Price Badge matching flyer */}
            <div className="absolute top-3 right-3 badge-stamp w-13 h-13 rounded-full flex flex-col items-center justify-center text-white font-bebas shadow-xl rotate-6 group-hover:rotate-0 transition-transform">
              <span className="text-[10px] leading-none opacity-85 uppercase font-sans font-bold">R$</span>
              <span className="text-xl font-bold leading-none tracking-tight">{Math.floor(product.price)}</span>
            </div>

            {/* Product tag if present */}
            {product.badge && (
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-[#ff7900]/40 text-[#ff7900] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md">
                {product.badge}
              </div>
            )}
          </div>
        ) : (
          /* Subtle Fallback for items without photographic asset or if photo failed */
          <div className="relative p-4 bg-gradient-to-br from-[#1a1a1a] to-[#121212] border-b border-[#242424] flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-400">
              <div className="w-8 h-8 rounded-lg bg-[#252525] flex items-center justify-center text-[#ff7900]">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
                {product.category}
              </span>
            </div>
            {/* Price Stamp Badge */}
            <div className="badge-stamp w-12 h-12 rounded-full flex flex-col items-center justify-center text-white font-bebas shadow-md">
              <span className="text-[9px] leading-none opacity-85">R$</span>
              <span className="text-lg font-bold leading-none">{Math.floor(product.price)}</span>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-oswald text-lg sm:text-xl font-bold uppercase tracking-wide text-white group-hover:text-[#ff7900] transition-colors">
              {product.name}
            </h3>
            <span className="text-zinc-400 text-xs font-mono font-bold sm:hidden">
              {formatMoney(product.price)}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed min-h-[3rem]">
            {product.description}
          </p>

          {/* Optional custom note toggle */}
          <div className="mt-3">
            {!showNotesInput ? (
              <button
                type="button"
                onClick={() => setShowNotesInput(true)}
                className="text-[11px] text-zinc-400 hover:text-[#ff7900] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3 h-3" />
                <span>Personalizar (ex: sem cebola, ponto)</span>
              </button>
            ) : (
              <div className="mt-2 space-y-1">
                <input
                  type="text"
                  value={itemNotes}
                  onChange={(e) => setItemNotes(e.target.value)}
                  placeholder="Ex: sem cebola, bem passado..."
                  className="w-full text-xs px-3 py-1.5 bg-[#0a0a0a] border border-[#333] focus:border-[#ff7900] rounded-lg text-white outline-none"
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Controls: Quantity Stepper + Add Button */}
      <div className="p-4 sm:p-5 pt-0 border-t border-[#222222]/60 mt-2">
        <div className="flex items-center justify-between gap-3 pt-3">
          
          {/* Quantity Selector Stepper */}
          <div className="flex items-center bg-[#0a0a0a] border border-[#2e2e2e] rounded-xl p-1">
            <button
              type="button"
              onClick={handleDecrement}
              aria-label={`Diminuir quantidade de ${product.name}`}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1f1f1f] hover:bg-[#2e2e2e] text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-mono font-bold text-sm text-white">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label={`Aumentar quantidade de ${product.name}`}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1f1f1f] hover:bg-[#2e2e2e] text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 py-2 sm:py-2.5 px-3 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              addedSuccess
                ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'bg-[#ff7900] hover:bg-[#ff8f1f] text-black shadow-[0_2px_12px_rgba(255,121,0,0.3)] active:scale-95'
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Adicionado!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Adicionar</span>
              </>
            )}
          </button>

        </div>
      </div>
    </article>
  );
};
