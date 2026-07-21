import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Flame } from 'lucide-react';

import { HeroSection } from './components/HeroSection';
import { ScrollCooking } from './components/ScrollCooking';
import { BurgerShowcase } from './components/BurgerShowcase';
import { BurgerDetailsModal } from './components/BurgerDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTracker } from './components/OrderTracker';
import { InteractiveSections } from './components/InteractiveSections';

import { CartItem, BurgerProduct } from './types';
import { BURGERS } from './data';

export default function App() {
  // Global cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedBurger, setSelectedBurger] = useState<BurgerProduct | null>(null);

  // Order Tracking lifecycle state
  const [trackingSubtotal, setTrackingSubtotal] = useState<number>(0);
  const [activeTracking, setActiveTracking] = useState<boolean>(false);

  // Particles & micro-interactions state on adding to cart
  const [cartBouncing, setCartBouncing] = useState<boolean>(false);
  const [showSparkles, setShowSparkles] = useState<boolean>(false);

  // Scroll skip helpers
  const handleStartJourney = () => {
    const el = document.getElementById('scroll-cooking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectBurger = (burger: BurgerProduct) => {
    setSelectedBurger(burger);
  };

  const handleCustomizeDirect = (burgerId: string) => {
    const base = BURGERS.find(b => b.id === burgerId);
    if (base) {
      setSelectedBurger(base);
      const el = document.getElementById('menu-showcase');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Add custom compiled burger into cart
  const handleAddToCart = (item: Omit<CartItem, 'id'>) => {
    // Generate a unique ID instance representing this custom sandwich
    const id = `${item.burgerId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newItem: CartItem = { ...item, id };

    setCart(prev => [...prev, newItem]);
    
    // Trigger gorgeous micro-interactions (bouncing cart icon, golden sparkles explosion)
    setCartBouncing(true);
    setShowSparkles(true);

    setTimeout(() => {
      setCartBouncing(false);
    }, 1000);

    setTimeout(() => {
      setShowSparkles(false);
    }, 1800);
  };

  // Direct quick-order fallback (from card grid directly)
  const handleAddToCartDirect = (burger: BurgerProduct) => {
    handleAddToCart({
      burgerId: burger.id,
      name: burger.name,
      customizedPrice: burger.basePrice,
      customizedCalories: burger.calories,
      quantity: 1,
      addedIngredients: [],
      removedIngredients: [],
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => 
      prev.map(item => {
        if (item.id === id) {
          const nextQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: nextQty };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Proceed checkout timeline triggers
  const handleProceedToCheckout = () => {
    const subtotal = cart.reduce((acc, item) => acc + (item.customizedPrice * item.quantity), 0);
    setTrackingSubtotal(subtotal);
    setActiveTracking(true);
    setIsCartOpen(false);

    // Smooth scroll down directly to checkout section
    setTimeout(() => {
      const el = document.getElementById('checkout-tracker');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleOrderCompleted = () => {
    // Reset Cart and disable active tracker
    setCart([]);
    setActiveTracking(false);
  };

  const handleResetOrder = () => {
    setCart([]);
    setActiveTracking(false);
    handleStartJourney();
  };

  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.customizedPrice * item.quantity), 0);

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white font-sans overflow-x-hidden selection:bg-orange-600 selection:text-white">
      


      {/* Floating Sticky Cart Hub with particle burst overlay */}
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {showSparkles && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1.2, opacity: [0.8, 0.4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute -inset-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-xl pointer-events-none mix-blend-screen"
            />
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsCartOpen(true)}
          animate={cartBouncing ? {
            scale: [1, 1.25, 0.9, 1.1, 1],
            rotate: [0, -10, 10, -5, 0]
          } : {}}
          transition={{ duration: 0.7 }}
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white flex items-center justify-center shadow-[0_12px_35px_rgba(239,68,68,0.4)] border border-white/15 cursor-pointer group active:scale-95 transition-transform"
        >
          {/* Sparkle badge */}
          <ShoppingBag className="w-6 h-6 group-hover:scale-105 transition-transform" />
          
          {totalQty > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1.5 -right-1.5 bg-white text-neutral-950 font-mono text-[10px] font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-orange-600 shadow-md"
            >
              {totalQty}
            </motion.div>
          )}

          {/* Subtotal mini flyout indicator on hover */}
          {totalQty > 0 && (
            <div className="absolute right-16 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-mono text-xs text-orange-400 font-bold whitespace-nowrap shadow-xl">
              Sack Subtotal: ${subtotal.toFixed(2)}
            </div>
          )}
        </motion.button>
      </div>

      {/* CORE EXPERIENTIAL STAGES */}
      <HeroSection onStartJourney={handleStartJourney} />
      
      <ScrollCooking 
        onComplete={(selected, price) => {
          handleAddToCart({
            burgerId: 'classic',
            name: 'The Custom Assembly',
            customizedPrice: price,
            customizedCalories: 680,
            quantity: 1,
            addedIngredients: selected.filter(id => !['bun_bottom', 'bun_top', 'patty', 'cheese', 'lettuce', 'tomato', 'onion', 'pickles', 'sauce'].includes(id)),
            removedIngredients: [],
          });
        }}
        onCustomizeDirect={handleCustomizeDirect}
      />

      <BurgerShowcase 
        onSelectBurger={handleSelectBurger}
        onAddToCartDirect={handleAddToCartDirect}
        onCustomizeDirect={handleCustomizeDirect}
      />

      {/* Active Order Tracker (Triggered only when payment authorized) */}
      <AnimatePresence>
        {activeTracking && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6 }}
          >
            <OrderTracker 
              cartSubtotal={trackingSubtotal}
              onOrderCompleted={handleOrderCompleted}
              onResetOrder={handleResetOrder}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Engagement sections */}
      <InteractiveSections />

      {/* OVERLAYS & MODALS */}
      <AnimatePresence>
        {selectedBurger && (
          <BurgerDetailsModal 
            burger={selectedBurger}
            onClose={() => setSelectedBurger(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer 
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onProceedToCheckout={handleProceedToCheckout}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

