import React from 'react';
import { Bike, MapPin, Phone, MessageCircle } from 'lucide-react';
import { StoreConfig } from '../types';

interface FooterProps {
  storeConfig: StoreConfig;
  onOpenSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ storeConfig, onOpenSettings }) => {
  return (
    <footer className="bg-[#070707] border-t border-[#1f1f1f] pt-10 pb-20 sm:pb-12 text-zinc-400">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Flyer Bottom Banner Style: DELIVERY & ADDRESS */}
        <div className="bg-[#111111] border border-[#2b2b2b] rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          
          {/* Delivery Phone */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#ff7900] flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,121,0,0.4)]">
              <Bike className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-bebas text-sm sm:text-base tracking-widest text-[#ff7900] uppercase block">
                DELIVERY & PEDIDOS
              </span>
              <a
                href={`tel:${storeConfig.phone.replace(/\D/g, '')}`}
                className="font-bebas text-2xl sm:text-3xl text-white tracking-wider hover:text-[#ff7900] transition-colors"
              >
                {storeConfig.phone}
              </a>
            </div>
          </div>

          {/* WhatsApp Direct badge */}
          <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#ff7900]/30 px-4 py-2.5 rounded-xl text-xs text-zinc-300">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Pedidos processados via WhatsApp</span>
          </div>

          {/* Address */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#222] border border-[#333] flex items-center justify-center text-[#ff7900]">
              <MapPin className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-bebas text-sm sm:text-base tracking-widest text-zinc-400 uppercase block">
                LOCALIZAÇÃO
              </span>
              <span className="font-bebas text-xl sm:text-2xl text-white tracking-wider">
                {storeConfig.address}
              </span>
              <span className="text-xs text-zinc-400 block">
                {storeConfig.city}
              </span>
            </div>
          </div>

        </div>

        {/* Lower footer info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-t border-[#1a1a1a] pt-6">
          <div className="flex items-center gap-2">
            <span className="font-bebas text-lg tracking-wider text-white">
              MENU <span className="text-[#ff7900]">BURGERS</span>
            </span>
            <span className="text-zinc-500">·</span>
            <span>Cardápio Digital Interativo</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span>{storeConfig.openingHours}</span>
            <button
              onClick={onOpenSettings}
              className="text-[#ff7900] hover:underline cursor-pointer"
            >
              Configurar WhatsApp
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
