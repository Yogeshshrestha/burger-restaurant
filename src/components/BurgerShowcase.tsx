import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Flame, ArrowRight, ShieldCheck, ThumbsUp, ShoppingBag, Plus } from 'lucide-react';
import { BURGERS } from '../data';
import { BurgerProduct } from '../types';
import { BurgerSvg } from './BurgerSvg';

interface BurgerShowcaseProps {
  onSelectBurger: (burger: BurgerProduct) => void;
  onAddToCartDirect: (burger: BurgerProduct) => void;
  onCustomizeDirect: (burgerId: string) => void;
}

export const BurgerShowcase: React.FC<BurgerShowcaseProps> = ({
  onSelectBurger,
  onAddToCartDirect,
  onCustomizeDirect,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'beef' | 'poultry' | 'plant' | 'premium'>('all');

  const categories = [
    { id: 'all', label: 'Complete Vault' },
    { id: 'beef', label: 'Smash Angus Beef' },
    { id: 'poultry', label: 'Crispy Poultry' },
    { id: 'plant', label: 'Gourmet Plant' },
    { id: 'premium', label: 'Black Truffle Elite' }
  ];

  // Map database entries to categories for filtering
  const filteredBurgers = BURGERS.filter(burger => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'beef') {
      return ['classic', 'double_cheese', 'bbq_smokehouse', 'spicy_inferno'].includes(burger.id);
    }
    if (activeCategory === 'poultry') {
      return burger.id === 'chicken_glory';
    }
    if (activeCategory === 'plant') {
      return burger.id === 'veggie_botanist';
    }
    if (activeCategory === 'premium') {
      return burger.id === 'signature_truffle';
    }
    return true;
  });

  // Stagger configurations for entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="menu-showcase" className="relative w-full bg-neutral-950 py-24 px-4 border-b border-neutral-900 overflow-hidden">
      
      {/* Visual Ambience background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-red-600/5 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-amber-600/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto z-10">
        
        {/* Showcase Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono tracking-widest uppercase mb-3">
              <Flame className="w-3.5 h-3.5" />
              The Gastronomy Collection
            </div>
            <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Select Your Grill Blueprint
            </h2>
            <p className="font-sans text-neutral-400 text-sm mt-3 font-light leading-relaxed">
              Explore our range of premium burgers engineered for extreme flavor profiles. Customize each element or order directly to prompt immediate kitchen fires.
            </p>
          </div>

          {/* Quick-Filter Horizontal Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4.5 py-2 rounded-xl text-xs font-mono tracking-wider uppercase border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 border-orange-500 text-white font-bold shadow-[0_5px_15px_rgba(249,115,22,0.25)]'
                    : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Card Stagger Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredBurgers.map((burger) => {
            return (
              <motion.div
                key={burger.id}
                variants={cardVariants}
                className="group relative bg-neutral-900/30 backdrop-blur-md rounded-3xl border border-neutral-800/80 hover:border-orange-500/30 p-6 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)] transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Embedded Glowing background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Rating & Calorie Header */}
                <div className="flex items-center justify-between mb-4 z-10">
                  <div className="flex items-center gap-1 bg-neutral-950/60 backdrop-blur-xs px-2.5 py-1 rounded-full border border-neutral-800/80">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    <span className="font-mono text-[11px] font-bold text-neutral-200">{burger.rating}</span>
                    <span className="font-sans text-[9px] text-neutral-500">({burger.reviewsCount})</span>
                  </div>
                  <span className="font-mono text-[10px] text-neutral-400 font-light">
                    {burger.calories} Kcal
                  </span>
                </div>

                {/* 3D-Like Burger Vector Presentation Station */}
                <div 
                  onClick={() => onSelectBurger(burger)}
                  className="relative w-full aspect-[4/3] flex items-center justify-center mb-6 cursor-pointer group-hover:scale-105 transition-transform duration-500"
                >
                  {/* Glowing core ellipse behind burger */}
                  <div className="absolute w-[70%] h-[35%] bg-gradient-to-r from-orange-500/10 to-red-600/10 blur-xl rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  
                  {/* Custom Miniature Stack representing each specific burger profile */}
                  <div className="relative w-full max-w-[170px] aspect-square flex flex-col justify-end items-center pb-2">
                    
                    {/* Tiny reflection stand */}
                    <div className="absolute bottom-0 inset-x-2 h-1.5 bg-neutral-900 rounded-full opacity-50 z-0 border-t border-neutral-800" />
                    
                    <div className="relative w-full flex flex-col justify-end items-center z-10">
                      {burger.ingredients.slice(0, 5).map((ingId, idx) => {
                        // Offset stacking visually
                        const offset = (burger.ingredients.slice(0, 5).length - 1 - idx) * 8;
                        return (
                          <div 
                            key={idx} 
                            className="absolute w-full"
                            style={{ 
                              bottom: `${offset}px`,
                              zIndex: idx + 5
                            }}
                          >
                            <BurgerSvg layerId={ingId} width="100%" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Title & Description Info */}
                <div className="z-10 text-left">
                  <h3 className="font-sans font-extrabold text-xl text-white tracking-tight group-hover:text-orange-400 transition-colors">
                    {burger.name}
                  </h3>
                  <span className="font-mono text-[10px] text-orange-500 tracking-wider uppercase block mt-1">
                    {burger.tagline}
                  </span>
                  <p className="font-sans text-neutral-400 text-xs mt-3 leading-relaxed font-light line-clamp-3">
                    {burger.description}
                  </p>
                </div>

                {/* Action Footer Plate */}
                <div className="mt-6 pt-5 border-t border-neutral-800/80 flex items-center justify-between gap-4 z-10">
                  <div>
                    <span className="font-sans text-[10px] text-neutral-500 uppercase block">Craft Value</span>
                    <span className="font-mono text-lg font-bold text-white tracking-tight">
                      ${burger.basePrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Direct Customize */}
                    <button
                      onClick={() => onCustomizeDirect(burger.id)}
                      title="Deep Customizer"
                      className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-orange-400 hover:border-orange-500/40 active:scale-95 transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    {/* Order Trigger */}
                    <button
                      onClick={() => onAddToCartDirect(burger)}
                      className="px-4 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-sans font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-[0_5px_15px_rgba(239,68,68,0.15)] hover:shadow-[0_10px_25px_rgba(239,68,68,0.35)] active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Order</span>
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
