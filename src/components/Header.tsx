import React from 'react';
import { ShoppingBag, Settings, Bike, Phone, Clock } from 'lucide-react';
import { StoreConfig } from '../types';
import { formatMoney } from '../data/menu';

interface HeaderProps {
  storeConfig: StoreConfig;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  storeConfig,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#222222]">
      {/* Top micro bar for store status & delivery info */}
      <div className="bg-[#121212] border-b border-[#1f1f1f] text-[11px] py-1.5 px-4 text-[#a0a0a0]">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Aberto Agora
            </span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#ff7900]" />
              {storeConfig.openingHours}
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-300">
            <a
              href={`tel:${storeConfig.phone.replace(/\D/g, '')}`}
              className="flex items-center gap-1 hover:text-[#ff7900] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#ff7900]" />
              <span className="hidden md:inline font-mono">{storeConfig.phone}</span>
            </a>
            <button
              onClick={onOpenSettings}
              title="Configurar WhatsApp e dados do restaurante"
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Configurar Loja</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar (Top Bar Contract: Zone 1 Wordmark, Zone 2 Links/Trust, Zone 3 Cart Action) */}
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <a href="#topo" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#ff7900] to-[#b84300] flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(255,121,0,0.4)] group-hover:scale-105 transition-transform">
            <span className="font-bebas text-2xl tracking-tighter">MB</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bebas text-2xl sm:text-3xl tracking-wider leading-none text-white">
              MENU <span className="text-[#ff7900]">BURGERS</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
              Cardápio Digital
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links / Fast Anchors */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <a href="#categoria-simples" className="hover:text-[#ff7900] transition-colors whitespace-nowrap">
            Simples
          </a>
          <a href="#categoria-especiais" className="hover:text-[#ff7900] transition-colors whitespace-nowrap">
            Especiais
          </a>
          <a href="#categoria-acompanhamentos" className="hover:text-[#ff7900] transition-colors whitespace-nowrap">
            Acompanhamentos
          </a>
          <a href="#categoria-bebidas" className="hover:text-[#ff7900] transition-colors whitespace-nowrap">
            Bebidas
          </a>
          <a href="#carrinho" className="hover:text-[#ff7900] transition-colors whitespace-nowrap">
            Meu Pedido
          </a>
        </nav>

        {/* Zone 3: Primary Action (Interactive Cart button) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label={`Ver carrinho com ${cartCount} itens`}
            className="flex items-center gap-2.5 bg-gradient-to-r from-[#ff7900] to-[#e66800] hover:from-[#ff8a1a] hover:to-[#f07400] text-black font-extrabold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-[0_2px_15px_rgba(255,121,0,0.35)] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-black stroke-[2.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-[#ff7900] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#ff7900]">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col items-start text-left leading-tight">
              <span className="text-xs uppercase tracking-wide font-black">Ver Pedido</span>
              <span className="text-[11px] font-mono tabular-nums opacity-90">{formatMoney(cartTotal)}</span>
            </div>
            <span className="sm:hidden font-mono text-xs font-black">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
