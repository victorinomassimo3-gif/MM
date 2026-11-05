import React from 'react';
import { Flame, UtensilsCrossed, Sparkles, ChevronDown } from 'lucide-react';
import { MenuItem } from '../types';

interface HeroBannerProps {
  onSelectFeatured: (item: MenuItem) => void;
  featuredItems: MenuItem[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectFeatured, featuredItems }) => {
  const frangoItem = featuredItems.find(i => i.id === 'frango-especial') || featuredItems[0];
  const baconItem = featuredItems.find(i => i.id === 'bacon-especial') || featuredItems[1] || featuredItems[0];

  return (
    <section id="topo" className="relative overflow-hidden pt-6 pb-10 sm:py-12 border-b border-[#222222]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none hero-glow opacity-80" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ff7900]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#ff7900]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visual Typography directly inspired by the Menu Burguers Flyer */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[#ff7900] text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase mb-2">
              <Flame className="w-4 h-4 fill-[#ff7900]" />
              <span>Sabor • Qualidade • Tradição</span>
            </div>

            {/* Poster Title - Replicating the "MENU BURGUERS" chalkboard distressed lettering */}
            <div className="relative my-2 select-none">
              <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl tracking-tight leading-[0.85] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                MENU
              </h1>
              <div className="relative inline-block mt-1 sm:mt-2">
                <span className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-wider text-[#ff7900] uppercase block drop-shadow-[0_0_25px_rgba(255,121,0,0.45)]">
                  BURGUERS
                </span>
                {/* Horizontal decorative distressed bars matching the flyer */}
                <div className="h-1 sm:h-1.5 w-full bg-gradient-to-r from-[#ff7900] via-[#ffa133] to-[#ff7900] rounded-full mt-1"></div>
                <div className="h-0.5 w-3/4 mx-auto lg:mx-0 bg-[#ff7900]/60 rounded-full mt-1"></div>
              </div>
            </div>

            {/* Subtitle & Value Proposition */}
            <p className="mt-5 text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed">
              Hambúrgueres artesanais preparados na brasa com ingredientes selecionados, pão brioche amanteigado, muito bacon crocante e queijo derretido.
            </p>

            {/* Quick Benefits Checklist */}
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-semibold text-zinc-400">
              <div className="flex items-center gap-1.5 bg-[#141414] border border-[#2a2a2a] px-3 py-1.5 rounded-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#ff7900]" />
                <span>Blend 100% Bovino</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#141414] border border-[#2a2a2a] px-3 py-1.5 rounded-lg">
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#ff7900]" />
                <span>Receitas Originais</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#141414] border border-[#2a2a2a] px-3 py-1.5 rounded-lg">
                <Flame className="w-3.5 h-3.5 text-[#ff7900]" />
                <span>Entrega Rápida & Quentinha</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#cardapio"
                className="bg-[#ff7900] hover:bg-[#ff8f1f] text-black font-black uppercase text-sm px-6 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(255,121,0,0.4)] flex items-center gap-2 active:scale-95 transition-all"
              >
                <span>Ver Cardápio Completo</span>
                <ChevronDown className="w-4 h-4 stroke-[3]" />
              </a>
              <a
                href="#carrinho"
                className="border border-[#444] hover:border-[#ff7900] hover:text-[#ff7900] text-zinc-200 font-bold uppercase text-sm px-5 py-3.5 rounded-xl bg-[#141414] transition-all"
              >
                Ir para o Carrinho
              </a>
            </div>
          </div>

          {/* Right Column: Replicating the two iconic circular burger frames with orange pill titles from the flyer! */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-6 sm:gap-4 lg:gap-6 items-center justify-center">
            
            {/* Top Spotlight: X FRANGO ESPECIAL */}
            {frangoItem && (
              <div
                onClick={() => onSelectFeatured(frangoItem)}
                className="group relative flex flex-col items-center cursor-pointer transform hover:-translate-y-1 transition-all duration-300 w-64 sm:w-60 lg:w-72"
              >
                {/* Circular image frame with textured orange border */}
                <div className="relative w-48 h-48 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full p-1.5 bg-gradient-to-b from-[#ff7900] via-[#c95300] to-[#1e1008] shadow-[0_8px_30px_rgba(255,121,0,0.35)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border-2 border-[#121212]">
                    <img
                      src={frangoItem.image}
                      alt={frangoItem.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Floating price sticker */}
                  <div className="absolute -top-1 -right-1 badge-stamp w-12 h-12 rounded-full flex flex-col items-center justify-center text-white font-bebas text-sm shadow-lg rotate-12">
                    <span className="text-[10px] leading-none opacity-80">POR</span>
                    <span className="text-base font-bold leading-none">R$22</span>
                  </div>
                </div>

                {/* Orange pill banner at bottom matching flyer */}
                <div className="relative -mt-4 bg-gradient-to-r from-[#ff7900] to-[#ff9b24] text-black font-bebas text-lg sm:text-xl tracking-wider px-6 py-1.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.6)] border border-white/20 uppercase flex items-center gap-1.5">
                  <span>X FRANGO ESPECIAL</span>
                </div>
                <span className="text-[11px] text-zinc-400 mt-1 font-medium group-hover:text-[#ff7900] transition-colors">
                  Toque para adicionar
                </span>
              </div>
            )}

            {/* Bottom Spotlight: X BACON ESPECIAL */}
            {baconItem && (
              <div
                onClick={() => onSelectFeatured(baconItem)}
                className="group relative flex flex-col items-center cursor-pointer transform hover:-translate-y-1 transition-all duration-300 w-64 sm:w-60 lg:w-72"
              >
                {/* Circular image frame with textured orange border */}
                <div className="relative w-48 h-48 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full p-1.5 bg-gradient-to-b from-[#ff7900] via-[#c95300] to-[#1e1008] shadow-[0_8px_30px_rgba(255,121,0,0.35)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border-2 border-[#121212]">
                    <img
                      src={baconItem.image}
                      alt={baconItem.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Floating price sticker */}
                  <div className="absolute -top-1 -right-1 badge-stamp w-12 h-12 rounded-full flex flex-col items-center justify-center text-white font-bebas text-sm shadow-lg rotate-12">
                    <span className="text-[10px] leading-none opacity-80">POR</span>
                    <span className="text-base font-bold leading-none">R$22</span>
                  </div>
                </div>

                {/* Orange pill banner at bottom matching flyer */}
                <div className="relative -mt-4 bg-gradient-to-r from-[#ff7900] to-[#ff9b24] text-black font-bebas text-lg sm:text-xl tracking-wider px-6 py-1.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.6)] border border-white/20 uppercase flex items-center gap-1.5">
                  <span>X BACON ESPECIAL</span>
                </div>
                <span className="text-[11px] text-zinc-400 mt-1 font-medium group-hover:text-[#ff7900] transition-colors">
                  Toque para adicionar
                </span>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
