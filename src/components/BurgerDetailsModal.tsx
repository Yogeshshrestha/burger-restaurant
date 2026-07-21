import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Star, Plus, Minus, Info, Flame, ShieldAlert,
  Beer, Wine, CupSoda, GlassWater, Sparkles, CheckCircle, ArrowRight
} from 'lucide-react';
import { BurgerProduct, CartItem, Ingredient } from '../types';
import { INGREDIENTS } from '../data';
import { BurgerSvg } from './BurgerSvg';

interface BurgerDetailsModalProps {
  burger: BurgerProduct | null;
  onClose: () => void;
  onAddToCart: (cartItem: Omit<CartItem, 'id'>) => void;
}

// Map pairings to icons dynamically
const PAIRING_ICONS: Record<string, any> = {
  Beer,
  Wine,
  CupSoda,
  GlassWater,
};

export const BurgerDetailsModal: React.FC<BurgerDetailsModalProps> = ({
  burger,
  onClose,
  onAddToCart,
}) => {
  if (!burger) return null;

  // State trackers
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const [includePairing, setIncludePairing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'customizer' | 'specs' | 'reviews'>('customizer');

  // Calculations
  const [customPrice, setCustomPrice] = useState<number>(burger.basePrice);
  const [customCalories, setCustomCalories] = useState<number>(burger.calories);
  const [customPrepTime, setCustomPrepTime] = useState<number>(burger.prepTimeMin);

  // Customization elements that are available to add
  const CUSTOM_TOPPINGS = INGREDIENTS.filter(ing => 
    !['bun_bottom', 'bun_top'].includes(ing.id) // cannot add extra buns
  );

  useEffect(() => {
    // Reset selections on burger change
    setAddedIds([]);
    setRemovedIds([]);
    setIncludePairing(false);
    setActiveTab('customizer');
  }, [burger]);

  useEffect(() => {
    // Re-calculate dynamic indicators in real-time
    let price = burger.basePrice;
    let calories = burger.calories;
    let prepTime = burger.prepTimeMin;

    // Added elements cost & energy
    addedIds.forEach(id => {
      const ing = INGREDIENTS.find(i => i.id === id);
      if (ing) {
        price += ing.price;
        calories += ing.calories;
        prepTime += 1; // 1 minute per extra ingredient
      }
    });

    // Removed elements cost & energy deductions
    removedIds.forEach(id => {
      const ing = INGREDIENTS.find(i => i.id === id);
      if (ing) {
        // We typically do not deduct price for removing default items,
        // but we definitely subtract the calories!
        calories = Math.max(0, calories - ing.calories);
        prepTime = Math.max(2, prepTime - 0.5);
      }
    });

    // Add pairing if toggled
    if (includePairing) {
      price += burger.drinkPairing.price;
      calories += 180; // approximate drink calories
    }

    setCustomPrice(Math.round(price * 100) / 100);
    setCustomCalories(calories);
    setCustomPrepTime(Math.ceil(prepTime));
  }, [addedIds, removedIds, includePairing, burger]);

  // Handle toggling of extra ingredients
  const handleAddIngredient = (id: string) => {
    setAddedIds(prev => [...prev, id]);
  };

  const handleRemoveIngredient = (id: string) => {
    // If it was an added custom ingredient, remove it from added list
    if (addedIds.includes(id)) {
      setAddedIds(prev => {
        const idx = prev.indexOf(id);
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      });
    } else {
      // If it is a default ingredient, add it to removed list
      setRemovedIds(prev => [...prev, id]);
    }
  };

  const handleRestoreIngredient = (id: string) => {
    setRemovedIds(prev => prev.filter(item => item !== id));
  };

  const handleAddToCart = () => {
    onAddToCart({
      burgerId: burger.id,
      name: burger.name,
      customizedPrice: customPrice,
      customizedCalories: customCalories,
      quantity: 1,
      addedIngredients: addedIds,
      removedIngredients: removedIds,
    });
    onClose();
  };

  // Compile active burger stack list in logical sequence for Svg Renderer
  // Standard sequence: bottom bun -> patties/meats -> cheeses -> veggies -> sauces -> top bun
  const resolveLayerStack = (): string[] => {
    // Start with default ingredients, filter out removed ones
    const activeDefaults = burger.ingredients.filter(id => !removedIds.includes(id));
    
    // Combine with added ones
    const allActive = [...activeDefaults, ...addedIds];

    // Logical custom sorting so the burger doesn't look structurally wild
    const orderScore: Record<string, number> = {
      bun_bottom: 0,
      patty: 10,
      egg: 15,
      cheese: 20,
      bacon: 25,
      mushroom: 30,
      onion_rings: 35,
      onion: 40,
      lettuce: 45,
      tomato: 50,
      jalapenos: 55,
      pickles: 60,
      sauce: 70,
      bun_top: 100,
    };

    return allActive.sort((a, b) => (orderScore[a] || 50) - (orderScore[b] || 50));
  };

  const activeLayers = resolveLayerStack();
  const PairingIcon = PAIRING_ICONS[burger.drinkPairing.icon] || Beer;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md cursor-pointer"
        />

        {/* Slide-over Frame */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 24, stiffness: 180 }}
          className="relative w-full max-w-5xl h-full bg-neutral-900/90 border-l border-neutral-800 shadow-[0_0_60px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden z-10"
        >
          {/* Top Sticky bar */}
          <div className="px-6 py-5 border-b border-neutral-800 flex items-center justify-between z-20">
            <div>
              <span className="font-mono text-[9px] text-orange-400 tracking-widest uppercase block">
                Deep Customizer Panel
              </span>
              <h2 className="font-sans font-extrabold text-2xl text-white tracking-tight">
                {burger.name}
              </h2>
            </div>
            
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white transition-all hover:scale-105 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Body Grid (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT FRAME: Burger Live Rendering (Lg: Col-5) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center bg-neutral-950/40 rounded-3xl border border-neutral-800/60 p-6 relative aspect-square lg:sticky lg:top-0 shadow-inner">
                
                {/* Backdrop lighting glow */}
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                  <div className="w-2/3 h-2/3 bg-orange-600/10 blur-[80px] rounded-full animate-pulse" />
                </div>

                <div className="relative w-full max-w-[260px] sm:max-w-[280px] aspect-square flex items-center justify-center z-10">
                  
                  {/* Dynamic interactive stacked Svg model */}
                  <div className="relative w-full flex flex-col justify-end items-center pb-6">
                    
                    {/* Metal Presentation Grid Pedestal */}
                    <div className="absolute bottom-2 inset-x-8 h-3 bg-neutral-800 border-t border-neutral-700/60 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.8)]" />

                    <motion.div 
                      className="w-full relative flex flex-col justify-end items-center"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {activeLayers.map((layerId, idx) => {
                        const offset = (activeLayers.length - 1 - idx) * 16;
                        return (
                          <div
                            key={idx}
                            className="absolute w-full"
                            style={{
                              bottom: `${offset}px`,
                              zIndex: idx + 10,
                            }}
                          >
                            <BurgerSvg layerId={layerId} width="100%" />
                          </div>
                        );
                      })}
                    </motion.div>
                  </div>
                </div>

                {/* Sizzle Alert indicator if active meats or cheeses exist */}
                <div className="absolute bottom-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono tracking-widest uppercase">
                  <Flame className="w-3.5 h-3.5 animate-pulse" />
                  Live Seared & Ready
                </div>
              </div>

              {/* RIGHT FRAME: Configuration Dashboard (Lg: Col-7) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* TAB SWITCHER */}
                <div className="flex border-b border-neutral-800 pb-1">
                  {(['customizer', 'specs', 'reviews'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-3 text-xs font-mono tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                        activeTab === tab
                          ? 'border-orange-500 text-white font-bold'
                          : 'border-transparent text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      {tab === 'customizer' ? 'Ingredients' : tab === 'specs' ? 'Nutrition Facts' : 'Gourmet Reviews'}
                    </button>
                  ))}
                </div>

                {/* TAB CONTENT: Customizer panel */}
                {activeTab === 'customizer' && (
                  <div className="space-y-6 text-left">
                    
                    {/* Default blueprint layer removals */}
                    <div>
                      <h4 className="font-sans font-bold text-xs text-neutral-300 uppercase tracking-widest mb-3 border-l-2 border-orange-500 pl-2">
                        Adjust Default Blueprint
                      </h4>
                      <p className="font-sans text-[11px] text-neutral-500 mb-4">
                        Remove standard ingredients to customize your flavor:
                      </p>

                      <div className="flex flex-wrap gap-2.5">
                        {burger.ingredients.map((ingId) => {
                          const ing = INGREDIENTS.find(i => i.id === ingId);
                          if (!ing || ['bun_bottom', 'bun_top'].includes(ingId)) return null;

                          const isOmitted = removedIds.includes(ingId);

                          return (
                            <button
                              key={ingId}
                              onClick={() => isOmitted ? handleRestoreIngredient(ingId) : handleRemoveIngredient(ingId)}
                              className={`px-4 py-2 rounded-xl border text-xs font-sans tracking-wide transition-all duration-300 cursor-pointer ${
                                isOmitted
                                  ? 'bg-red-950/25 border-red-900/60 text-red-400/80 line-through'
                                  : 'bg-neutral-800/40 border-neutral-800 text-neutral-200 hover:border-red-500/50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ing.color }} />
                                {ing.name}
                                {isOmitted ? <Plus className="w-3 h-3 ml-1 text-red-400" /> : <Minus className="w-3 h-3 ml-1 text-neutral-500" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Extravagant additions custom list */}
                    <div>
                      <h4 className="font-sans font-bold text-xs text-neutral-300 uppercase tracking-widest mb-3 border-l-2 border-orange-500 pl-2">
                        Premium Culinary Additions
                      </h4>
                      <p className="font-sans text-[11px] text-neutral-500 mb-4">
                        Pile on extreme gourmet stack toppings (cost and prep time adjust dynamically):
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {CUSTOM_TOPPINGS.map((ing) => {
                          const addCount = addedIds.filter(id => id === ing.id).length;

                          return (
                            <div
                              key={ing.id}
                              className={`p-3 rounded-2xl border flex items-center justify-between transition-all duration-300 ${
                                addCount > 0
                                  ? 'bg-orange-600/5 border-orange-500/40 text-white'
                                  : 'bg-neutral-950/40 border-neutral-800/80 hover:border-neutral-700 text-neutral-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ing.color }} />
                                <div className="text-left">
                                  <span className="font-sans text-xs font-semibold block">{ing.name}</span>
                                  <span className="font-mono text-[10px] text-neutral-500 block">
                                    +${ing.price.toFixed(2)} &bull; {ing.calories} Kcal
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 bg-neutral-950 rounded-xl p-1 border border-neutral-800/60 shrink-0">
                                <button
                                  onClick={() => handleRemoveIngredient(ing.id)}
                                  disabled={addCount === 0}
                                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white disabled:opacity-20 cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-mono text-xs font-bold w-4 text-center">
                                  {addCount}
                                </span>
                                <button
                                  onClick={() => handleAddIngredient(ing.id)}
                                  className="p-1.5 rounded-lg text-neutral-400 hover:text-orange-400 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Gourmet Drink Pairing Section */}
                    <div className="bg-neutral-950/60 rounded-3xl border border-neutral-800/80 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-4 items-start text-left">
                          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                            <PairingIcon className="w-6 h-6 animate-bounce" />
                          </div>
                          <div>
                            <span className="font-mono text-[9px] text-orange-400 tracking-wider uppercase block">
                              Chef's Recommended pairing
                            </span>
                            <h5 className="font-sans font-bold text-sm text-white">
                              {burger.drinkPairing.name}
                            </h5>
                            <p className="font-sans text-neutral-400 text-xs mt-1 font-light leading-relaxed">
                              {burger.drinkPairing.description}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => setIncludePairing(!includePairing)}
                          className={`px-4.5 py-2.5 rounded-xl border text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                            includePairing
                              ? 'bg-gradient-to-r from-orange-600 to-red-600 border-orange-500 text-white shadow-lg'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          {includePairing ? 'BUNDLED' : `+ $${burger.drinkPairing.price.toFixed(2)}`}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: Nutrition panel */}
                {activeTab === 'specs' && (
                  <div className="space-y-6 text-left">
                    <div className="bg-neutral-950/40 rounded-3xl border border-neutral-800 p-6">
                      <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider mb-6 border-b border-neutral-800 pb-3">
                        Macronutrient Diagnostics
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {/* Protein */}
                        <div className="bg-neutral-900/40 rounded-2xl border border-neutral-800 p-4 text-center">
                          <span className="font-sans text-xs text-neutral-500 block">PROTEIN</span>
                          <span className="font-mono text-2xl font-bold text-white tracking-tight mt-1 block">
                            {burger.nutrition.protein}
                          </span>
                          <span className="font-sans text-[10px] text-emerald-400 mt-2 block font-light">
                            100% Muscle Fuel
                          </span>
                        </div>

                        {/* Carbs */}
                        <div className="bg-neutral-900/40 rounded-2xl border border-neutral-800 p-4 text-center">
                          <span className="font-sans text-xs text-neutral-500 block">CARBOHYDRATES</span>
                          <span className="font-mono text-2xl font-bold text-white tracking-tight mt-1 block">
                            {burger.nutrition.carbs}
                          </span>
                          <span className="font-sans text-[10px] text-indigo-400 mt-2 block font-light">
                            Brioche Energy
                          </span>
                        </div>

                        {/* Fat */}
                        <div className="bg-neutral-900/40 rounded-2xl border border-neutral-800 p-4 text-center">
                          <span className="font-sans text-xs text-neutral-500 block">FAT</span>
                          <span className="font-mono text-2xl font-bold text-white tracking-tight mt-1 block">
                            {burger.nutrition.fat}
                          </span>
                          <span className="font-sans text-[10px] text-amber-500 mt-2 block font-light">
                            Gourmet Richness
                          </span>
                        </div>

                        {/* Sodium */}
                        <div className="bg-neutral-900/40 rounded-2xl border border-neutral-800 p-4 text-center">
                          <span className="font-sans text-xs text-neutral-500 block">SODIUM</span>
                          <span className="font-mono text-2xl font-bold text-white tracking-tight mt-1 block">
                            {burger.nutrition.sodium}
                          </span>
                          <span className="font-sans text-[10px] text-red-400 mt-2 block font-light">
                            Seasoning Balance
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-start gap-3">
                      <Info className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
                      <p className="font-sans text-neutral-400 text-xs leading-relaxed font-light">
                        <strong>Allergen Notice:</strong> Our brioche buns contain gluten, butter, and sesame seeds. Beef patties are prepared on flat-top grills shared with dairy products (Wisconsin cheddar). Please alert our staff via notes if you have acute peanut or dairy allergies.
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: Reviews panel */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4 text-left">
                    <div className="p-4 bg-neutral-950/40 rounded-2xl border border-neutral-800/80 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop" 
                          alt="Reviewer" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-sans font-bold text-xs text-white">Vivian Vance</h5>
                          <span className="font-mono text-[9px] text-neutral-500">2 days ago</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                          ))}
                        </div>
                        <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed">
                          "Adding applewood bacon and a fried egg to the Double Foundry is a life-changing decision. The runny yolk marries with the melting cheddar into the most savory sauce you'll ever experience. 10/10."
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-neutral-950/40 rounded-2xl border border-neutral-800/80 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop" 
                          alt="Reviewer" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-sans font-bold text-xs text-white">Chef Gregory Ross</h5>
                          <span className="font-mono text-[9px] text-neutral-500">1 week ago</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                          ))}
                        </div>
                        <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed">
                          "Most truffle burgers are ruined by overwhelming chemical artificial truffle oil. This is a real reduction, highly fragrant and organic. Paired with a Bourbon stout, it is incredible dining."
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Sticky Action Console */}
          <div className="px-6 py-5 border-t border-neutral-800 bg-neutral-950/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
            {/* Live Indicators summary */}
            <div className="flex items-center gap-6 text-left">
              <div>
                <span className="font-sans text-[10px] text-neutral-500 uppercase block">Dynamic Energy</span>
                <span className="font-mono text-base font-bold text-white">{customCalories} Kcal</span>
              </div>
              <div>
                <span className="font-sans text-[10px] text-neutral-500 uppercase block">Prep Fire Time</span>
                <span className="font-mono text-base font-bold text-white">~{customPrepTime} min</span>
              </div>
              <div className="border-l border-neutral-800 pl-6">
                <span className="font-sans text-[10px] text-neutral-500 uppercase block">Calculated Total</span>
                <span className="font-mono text-2xl font-extrabold text-orange-400 tracking-tight">
                  ${customPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-5 py-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white font-sans font-bold text-xs tracking-wider uppercase active:scale-95 transition-all cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                onClick={handleAddToCart}
                className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white font-sans font-bold text-xs tracking-widest uppercase shadow-[0_10px_25px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_35px_rgba(249,115,22,0.5)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Add Custom Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
