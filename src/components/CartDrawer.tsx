import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, 
  Info, ShieldCheck, Flame, DollarSign, Activity 
} from 'lucide-react';
import { CartItem, BurgerProduct } from '../types';
import { BURGERS, INGREDIENTS } from '../data';
import { BurgerSvg } from './BurgerSvg';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  // Total Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.customizedPrice * item.quantity), 0);
  const totalCalories = cartItems.reduce((acc, item) => acc + (item.customizedCalories * item.quantity), 0);
  const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Quick helper to fetch the corresponding core burger base object
  const getBurgerBase = (burgerId: string): BurgerProduct | undefined => {
    return BURGERS.find(b => b.id === burgerId);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
        
        {/* Backdrop glass backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md cursor-pointer"
        />

        {/* Drawer Frame */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 24, stiffness: 180 }}
          className="relative w-full max-w-md h-full bg-neutral-900 border-l border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-sans font-extrabold text-lg text-white tracking-tight">
                  Grill Order Sack
                </h3>
                <span className="font-mono text-[10px] text-neutral-500 block">
                  {totalQty} {totalQty === 1 ? 'masterpiece' : 'masterpieces'} waiting
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-3 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
            {cartItems.length === 0 ? (
              <div className="h-[60%] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <span className="font-sans font-bold text-neutral-300 block text-base">Your sack is empty</span>
                  <span className="font-sans text-neutral-500 text-xs mt-1 block">
                    No custom assemblies have been fired to the grill yet.
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-mono tracking-wider uppercase hover:text-orange-400 transition-all cursor-pointer"
                >
                  Start Cook Journey
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const base = getBurgerBase(item.burgerId);
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 bg-neutral-950/40 rounded-2xl border border-neutral-800/80 flex gap-4 items-start relative overflow-hidden"
                  >
                    {/* Render visual stacked thumbnail mini-burger */}
                    <div className="w-16 h-16 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-center relative overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-orange-600/5 blur-md" />
                      <div className="relative w-12 h-12 flex flex-col justify-end items-center pb-1">
                        {/* Stacking miniature previews */}
                        {['bun_bottom', 'patty', 'cheese', 'lettuce', 'bun_top'].map((layer, idx) => (
                          <div 
                            key={idx} 
                            className="absolute w-full"
                            style={{ 
                              bottom: `${idx * 4}px`, 
                              zIndex: idx + 5 
                            }}
                          >
                            <BurgerSvg layerId={layer} width="100%" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Meta info column */}
                    <div className="flex-1 space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <h4 className="font-sans font-bold text-sm text-white tracking-tight">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-600 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Display exact customization recipes details */}
                      {(item.addedIngredients.length > 0 || item.removedIngredients.length > 0) && (
                        <div className="space-y-1 bg-neutral-950 p-2 rounded-xl border border-neutral-800/60">
                          {item.addedIngredients.map((id, idx) => {
                            const ing = INGREDIENTS.find(i => i.id === id);
                            return ing ? (
                              <span key={idx} className="font-mono text-[9px] text-emerald-400 block font-light">
                                + Extra {ing.name}
                              </span>
                            ) : null;
                          })}
                          {item.removedIngredients.map((id, idx) => {
                            const ing = INGREDIENTS.find(i => i.id === id);
                            return ing ? (
                              <span key={idx} className="font-mono text-[9px] text-red-400 block font-light">
                                - No {ing.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1">
                        <span className="font-mono text-xs font-extrabold text-orange-400">
                          ${(item.customizedPrice * item.quantity).toFixed(2)}
                        </span>

                        {/* Quantity Counter Control */}
                        <div className="flex items-center gap-1.5 bg-neutral-950 rounded-lg p-0.5 border border-neutral-800/60 shrink-0">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 rounded text-neutral-500 hover:text-white cursor-pointer"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="font-mono text-[10px] font-bold w-4 text-center text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 rounded text-neutral-500 hover:text-orange-400 cursor-pointer"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Subtotal, Macros & Checkout sticky Plate */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-950 space-y-4">
              
              {/* Dynamic totals details */}
              <div className="space-y-2 border-b border-neutral-800 pb-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans text-neutral-500">Order Thermal Value</span>
                  <span className="font-mono text-neutral-300 font-bold">{totalCalories} Kcal</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans text-neutral-500">Estimated Sizzle Service</span>
                  <span className="font-mono text-emerald-400 font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="font-sans font-bold text-sm text-white">Subtotal Cost</span>
                  <span className="font-mono text-xl font-extrabold text-orange-400">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Secure note */}
              <div className="flex gap-2 items-start bg-neutral-900/40 p-3 rounded-xl border border-neutral-800 text-[10px] text-neutral-500 font-sans font-light">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Our system secures payment through certified sandbox channels. Fresh preparation begins instantly upon digital checkout validation.</span>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white font-sans font-bold text-xs tracking-widest uppercase shadow-[0_10px_25px_rgba(249,115,22,0.25)] hover:shadow-[0_15px_35px_rgba(249,115,22,0.45)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Dispatch To Kitchen Fire</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
