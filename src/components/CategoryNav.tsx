import React from 'react';
import { Search, X } from 'lucide-react';
import { CATEGORIES } from '../data/menu';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="sticky top-[57px] sm:top-[69px] z-30 bg-[#0c0c0c]/95 backdrop-blur-md border-b border-[#222222] py-3 px-4 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Horizontal Category Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ff7900] text-black shadow-[0_2px_12px_rgba(255,121,0,0.4)]'
                    : 'bg-[#181818] text-zinc-300 hover:text-white hover:bg-[#252525] border border-[#2b2b2b]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input for fast filtering */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar lanche, porção, bebida..."
            className="w-full pl-9 pr-9 py-2 bg-[#141414] border border-[#2e2e2e] focus:border-[#ff7900] focus:ring-1 focus:ring-[#ff7900] text-xs sm:text-sm text-white rounded-xl placeholder:text-zinc-500 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
