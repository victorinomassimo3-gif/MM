/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { CartSection } from './components/CartSection';
import { CartDrawer } from './components/CartDrawer';
import { FloatingCartBar } from './components/FloatingCartBar';
import { StoreSettingsModal } from './components/StoreSettingsModal';
import { Footer } from './components/Footer';
import { MENU_ITEMS, DEFAULT_STORE_CONFIG } from './data/menu';
import { MenuItem, CartItem, StoreConfig } from './types';
import { Utensils, Sparkles } from 'lucide-react';

export default function App() {
  // Store Configuration (persisted in localStorage with official WhatsApp number)
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem('mb_store_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          whatsappNumber: '244932727291',
          phone: '+244 932 727 291',
        };
      }
      return DEFAULT_STORE_CONFIG;
    } catch {
      return DEFAULT_STORE_CONFIG;
    }
  });

  // Cart State (persisted in localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mb_store_config', JSON.stringify(storeConfig));
    } catch (e) {
      console.error('Error saving store config', e);
    }
  }, [storeConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('mb_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cart]);

  // Cart Calculations
  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  // Cart Operations
  const handleAddToCart = (product: MenuItem, quantity: number, notes?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.notes === notes
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, notes }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Distinct categories present in filtered view
  const categoryGroups = useMemo(() => {
    const categories: Array<'Simples' | 'Especiais' | 'Acompanhamentos' | 'Bebidas'> = [
      'Simples',
      'Especiais',
      'Acompanhamentos',
      'Bebidas',
    ];

    if (activeCategory !== 'all') {
      return [activeCategory as any];
    }
    return categories;
  }, [activeCategory]);

  const featuredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => item.isFeatured);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans selection:bg-[#ff7900] selection:text-black">
      
      {/* Top Navigation */}
      <Header
        storeConfig={storeConfig}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      {/* Main Hero Banner with visual homage to the Menu Burguers flyer */}
      <HeroBanner
        featuredItems={featuredItems}
        onSelectFeatured={(item) => handleAddToCart(item, 1)}
      />

      {/* Sticky Category and Search Filter */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Products Grid */}
      <main id="cardapio" className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 sm:py-12">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-zinc-500">
            <Utensils className="w-12 h-12 mx-auto mb-3 opacity-40 text-zinc-400" />
            <h3 className="text-lg font-bold text-zinc-300">Nenhum item encontrado</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Tente pesquisar por outros ingredientes ou limpe os filtros.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-[#ff7900] text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Ver todos os produtos
            </button>
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {categoryGroups.map((catName) => {
              const items = filteredProducts.filter((item) => item.category === catName);
              if (items.length === 0) return null;

              return (
                <section
                  key={catName}
                  id={`categoria-${catName.toLowerCase()}`}
                  className="scroll-mt-36"
                >
                  {/* Category Header with distressed underline bar */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#ff7900]" />
                      <h2 className="font-bebas text-3xl sm:text-4xl uppercase tracking-wider text-white">
                        {catName}
                      </h2>
                    </div>
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-[#ff7900] via-[#ff7900]/40 to-transparent rounded-full" />
                    <span className="text-xs text-zinc-500 font-mono">
                      {items.length} {items.length === 1 ? 'item' : 'itens'}
                    </span>
                  </div>

                  {/* Products Grid: 1 col on mobile, 2 cols on tablet, 3-4 cols on desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {items.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Embedded Cart Section (Preserves `#carrinho` anchor as requested in HTML) */}
        <CartSection
          cart={cart}
          storeConfig={storeConfig}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
      </main>

      {/* Slide-out Cart Drawer for quick review on desktop and mobile */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cart={cart}
        storeConfig={storeConfig}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Mobile Sticky Floating Cart Bar (Adheres to 15% mobile viewport cap) */}
      <FloatingCartBar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartDrawerOpen(true)}
      />

      {/* Store Settings Modal for customizing WhatsApp number and address */}
      <StoreSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        config={storeConfig}
        onSave={setStoreConfig}
      />

      {/* Footer matching flyer branding */}
      <Footer
        storeConfig={storeConfig}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

    </div>
  );
}
