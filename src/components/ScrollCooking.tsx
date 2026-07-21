import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Check, ChevronRight, Play, Pause, RotateCcw, 
  Sparkles, Flame, DollarSign, Activity, Zap, Clock 
} from 'lucide-react';
import { BurgerSvg } from './BurgerSvg';
import { CanvasSizzle } from './CanvasSizzle';
import { INGREDIENTS } from '../data';
import { Ingredient } from '../types';

interface ScrollCookingProps {
  onComplete: (selectedIngredients: string[], finalPrice: number) => void;
  onCustomizeDirect: (burgerId: string) => void;
}

// The 9 layers of the standard cinematic builder
const BUILD_LAYERS = [
  { id: 'bun_bottom', label: 'Artisan Brioche Base', desc: 'Hand-shaped sweet brioche, butter-brined and caramelized on a 420°F flat-top cast iron.' },
  { id: 'patty', label: 'Prime Angus Beef Patty', desc: '100% dry-aged USDA Prime Angus beef, double-smashed to trap intense juices and form a crisp Maillard crust.' },
  { id: 'cheese', label: 'Molten Cheddar Layer', desc: 'Thick-cut Wisconsin cheddar melted flawlessly under steam domes to drape over the hot beef.' },
  { id: 'lettuce', label: 'Crisp Butter Lettuce', desc: 'Hand-picked organic green-leaf lettuce, triple-washed in ice water for ultimate texture and snap.' },
  { id: 'tomato', name: 'tomato', label: 'Vine-Ripened Tomato', desc: 'Glistening thick-cut heirloom tomato wheels, salted lightly to release rich umami sweetness.' },
  { id: 'onion', label: 'Caramelized Sweet Onions', desc: 'Sweet Vidalia onions slow-rendered over hickory wood for a rich, deep jam-like reduction.' },
  { id: 'pickles', label: 'Dill Pickle Ribbons', desc: 'Our vintage barrel-aged pickle chips cut corrugated to hold perfect tangy acidity.' },
  { id: 'sauce', label: 'House Signature Sauce', desc: 'A rich secret emulsion of smoked sweet garlic, charred peppers, and organic egg yolks.' },
  { id: 'bun_top', label: 'Toasted Sesame Crown', desc: 'The golden dome crown, toasted and sprinkled with warm premium white sesame seeds.' },
];

export const ScrollCooking: React.FC<ScrollCookingProps> = ({ onComplete, onCustomizeDirect }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Stats calculation
  const [stats, setStats] = useState({
    price: 0.5,
    calories: 120,
    protein: 4,
    prepTime: 2,
  });

  // Handle updates to stats based on stacked ingredients
  useEffect(() => {
    let price = 0;
    let calories = 0;
    let protein = 0;
    let prepTime = 2; // base minutes

    for (let i = 0; i <= activeStep; i++) {
      const layerId = BUILD_LAYERS[i].id;
      const ingredient = INGREDIENTS.find(ing => ing.id === layerId);
      if (ingredient) {
        price += ingredient.price;
        calories += ingredient.calories;
        // estimate protein based on category
        if (ingredient.category === 'patty') {
          protein += 30;
          prepTime += 4;
        } else if (ingredient.category === 'cheese') {
          protein += 6;
          prepTime += 1;
        } else if (ingredient.category === 'bun') {
          protein += 4;
          prepTime += 1;
        } else {
          prepTime += 0.5;
        }
      }
    }

    // Add general markup for craft cooking service
    const finalPrice = Math.round((price + 8.99) * 100) / 100;

    setStats({
      price: finalPrice,
      calories: calories,
      protein: protein,
      prepTime: Math.ceil(prepTime),
    });
  }, [activeStep]);

  // Scroll detection within the section container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // If container is active on viewport, map its scroll position to burger layers
      if (rect.top <= 0 && rect.bottom >= viewHeight) {
        const totalScrollable = rect.height - viewHeight;
        const currentScroll = -rect.top;
        const ratio = currentScroll / totalScrollable;
        
        const nextStep = Math.min(
          BUILD_LAYERS.length - 1,
          Math.max(0, Math.floor(ratio * BUILD_LAYERS.length))
        );
        setActiveStep(nextStep);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Cinematic Auto-Player sequence
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= BUILD_LAYERS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500); // 2.5 seconds per drop animation
    }
    return () => clearInterval(interval);
  }, [isPlaying]);


  const handleNext = () => {
    if (activeStep < BUILD_LAYERS.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsPlaying(false);
  };

  const handleSelectStep = (index: number) => {
    setActiveStep(index);
    setIsPlaying(false);
  };

  const isCompleted = activeStep === BUILD_LAYERS.length - 1;

  return (
    <section 
      ref={containerRef} 
      id="scroll-cooking" 
      className="relative w-full min-h-[140vh] sm:min-h-[160vh] bg-neutral-950 flex flex-col justify-start overflow-visible pt-16 pb-24 px-4 border-b border-neutral-900"
    >
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-amber-600/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-red-600/5 blur-[130px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto z-10">
        
        {/* Storytelling Section Header */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-orange-500 tracking-widest uppercase block mb-2">
            STORY STEP II: THE ASSEMBLY
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Watch Your Burger <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Come to Life.
            </span>
          </h2>
          <p className="font-sans text-neutral-400 text-sm mt-3 font-light leading-relaxed">
            Every layer has its own story, physics, and purpose. Interact with the panels below, use the play triggers, or scroll down to watch the artisan stack lock into place.
          </p>
        </div>

        {/* Outer Bento Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Ingredient Timeline Controls (Lg: Col-4) */}
          <div className="lg:col-span-4 bg-neutral-900/40 backdrop-blur-md rounded-3xl border border-neutral-800 p-6 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
            <div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-5">
                <span className="font-sans font-bold text-sm text-neutral-200 tracking-wide">
                  Culinary Layer Timeline
                </span>
                <span className="font-mono text-xs text-orange-400">
                  {activeStep + 1} of {BUILD_LAYERS.length}
                </span>
              </div>

              {/* Steps vertical index list */}
              <div className="space-y-1.5 max-h-[300px] lg:max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                {BUILD_LAYERS.map((layer, idx) => {
                  const isStacked = idx <= activeStep;
                  const isActive = idx === activeStep;

                  return (
                    <button
                      key={layer.id}
                      onClick={() => handleSelectStep(idx)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-300 group cursor-pointer ${
                        isActive 
                          ? 'bg-gradient-to-r from-orange-600/20 to-neutral-900 border-orange-500/70 text-white shadow-md' 
                          : isStacked 
                          ? 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700' 
                          : 'bg-neutral-950/20 border-neutral-900/40 text-neutral-600 hover:text-neutral-400 hover:border-neutral-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-colors ${
                          isActive 
                            ? 'bg-orange-500 text-white' 
                            : isStacked 
                            ? 'bg-neutral-800 text-orange-400' 
                            : 'bg-neutral-950 text-neutral-700'
                        }`}>
                          {isStacked && !isActive ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <span className="font-sans text-xs font-semibold tracking-wide">
                          {layer.label}
                        </span>
                      </div>
                      
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                        isActive ? 'text-orange-400 translate-x-1' : 'text-neutral-600 group-hover:translate-x-0.5'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cinematic Automation Trigger Deck */}
            <div className="mt-6 pt-5 border-t border-neutral-800/80 flex items-center justify-between gap-3">
              <button
                onClick={handleReset}
                title="Restart Assembly"
                className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isPlaying 
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.35)] hover:bg-red-500' 
                    : 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:bg-orange-400'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" /> Pause Sequence
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white animate-pulse" /> Play Assembly
                  </>
                )}
              </button>
            </div>
          </div>

          {/* CENTER COLUMN: The Dynamic Burger Canvas (Lg: Col-5) */}
          <div className="lg:col-span-5 bg-neutral-900/10 backdrop-blur-xs rounded-3xl border border-neutral-800/35 relative flex flex-col items-center justify-center min-h-[460px] md:min-h-[520px] shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] px-4 overflow-hidden">
            
            {/* Ambient Background Glow inside frame */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
              <div className="w-[80%] h-[50%] bg-orange-600/10 blur-[90px] rounded-full animate-pulse" />
            </div>

            {/* Sizzle particles on active grill area */}
            {activeStep >= 1 && activeStep <= 3 && (
              <CanvasSizzle intensity="medium" className="absolute inset-0" />
            )}

            {/* Dynamic Interactive Stacking Container */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] flex flex-col justify-end items-center pb-6 z-10">
              
              {/* Premium Luxury Pedestal Platform */}
              <div className="absolute bottom-2 inset-x-4 h-4 bg-gradient-to-b from-neutral-800 to-neutral-950 border-t border-neutral-700/60 rounded-full shadow-[0_15px_25px_rgba(0,0,0,0.9)] flex items-center justify-center z-0">
                <div className="w-1/2 h-[1px] bg-orange-500/30 blur-xs" />
              </div>

              {/* Complete Burger slow rotation effect on completion */}
              <motion.div 
                className="w-full flex flex-col justify-end items-center relative"
                animate={isCompleted ? { 
                  y: [0, -8, 0],
                  rotateY: [0, 8, -8, 0] 
                } : {}}
                transition={isCompleted ? { 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut"
                } : {}}
              >
                
                {/* Visual Lens Flare / Rays on Burger Completion */}
                <AnimatePresence>
                  {isCompleted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: [0.15, 0.4, 0.15], scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                    >
                      <div className="absolute w-[250px] h-[250px] rounded-full bg-amber-500/10 blur-xl" />
                      <div className="absolute w-[2px] h-[350px] bg-gradient-to-t from-transparent via-amber-400/20 to-transparent rotate-45" />
                      <div className="absolute w-[2px] h-[350px] bg-gradient-to-t from-transparent via-amber-400/20 to-transparent -rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Layer Stack with staggered positioning */}
                {BUILD_LAYERS.map((layer, index) => {
                  const isStacked = index <= activeStep;
                  
                  // Calculate cumulative height index offset to simulate dense vertical compression
                  let bottomOffset = 0;
                  if (isStacked) {
                    // Give slight organic spacing overlaps for 3D look
                    bottomOffset = (activeStep - index) * 22;
                  }

                  return (
                    <AnimatePresence key={layer.id}>
                      {isStacked && (
                        <motion.div
                          initial={{ 
                            y: -220, 
                            rotate: Math.random() * 20 - 10, 
                            opacity: 0,
                            scale: 1.15
                          }}
                          animate={{ 
                            y: -bottomOffset, 
                            rotate: isCompleted ? 0 : (index % 2 === 0 ? 1 : -1), 
                            opacity: 1,
                            scale: 1.0
                          }}
                          exit={{ 
                            y: -300, 
                            opacity: 0,
                            transition: { duration: 0.3 }
                          }}
                          transition={{ 
                            type: "spring",
                            stiffness: 140,
                            damping: 12,
                            mass: 0.8
                          }}
                          className="absolute w-full flex items-center justify-center"
                          style={{ 
                            zIndex: 10 + index,
                            bottom: `${15}px`,
                          }}
                        >
                          <BurgerSvg layerId={layer.id} width="100%" hovered={index === activeStep} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Description & Dynamic Counter Gauges (Lg: Col-3) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Top Right: Sensory Caption Card */}
            <div className="flex-1 bg-neutral-900/40 backdrop-blur-md rounded-3xl border border-neutral-800 p-6 flex flex-col justify-between shadow-lg">
              <div>
                <span className="font-mono text-[10px] text-orange-400 tracking-wider uppercase block mb-2">
                  Layer Focus & Sensory Specs
                </span>
                
                <div className="h-[180px] flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <h4 className="font-sans font-bold text-lg text-white tracking-tight flex items-center gap-2">
                        {BUILD_LAYERS[activeStep].label}
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                      </h4>
                      <p className="font-sans text-neutral-400 text-xs leading-relaxed font-light">
                        {BUILD_LAYERS[activeStep].desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Manual Step Incrementor Buttons */}
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={handlePrev}
                      disabled={activeStep === 0}
                      className="flex-1 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 disabled:opacity-30 disabled:pointer-events-none hover:text-white hover:border-neutral-700 active:scale-95 transition-all cursor-pointer text-xs font-mono uppercase"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={isCompleted}
                      className="flex-1 py-2 rounded-xl bg-orange-600/20 border border-orange-500/40 text-orange-400 disabled:opacity-30 disabled:pointer-events-none hover:bg-orange-500 hover:text-white hover:border-orange-500 active:scale-95 transition-all cursor-pointer text-xs font-mono uppercase"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Right: Dynamic Culinary Gauges */}
            <div className="bg-neutral-900/40 backdrop-blur-md rounded-3xl border border-neutral-800 p-6 shadow-lg space-y-4">
              <span className="font-mono text-[10px] text-neutral-500 tracking-wider uppercase block border-b border-neutral-800 pb-2">
                Live Macro Diagnostics
              </span>

              {/* Price Gauge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <span className="font-sans text-xs text-neutral-400">Calculated Cost</span>
                </div>
                <motion.span 
                  key={stats.price}
                  initial={{ scale: 1.15, color: '#10b981' }}
                  animate={{ scale: 1.0, color: '#ffffff' }}
                  className="font-mono text-sm font-bold"
                >
                  ${stats.price.toFixed(2)}
                </motion.span>
              </div>

              {/* Calories Gauge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <span className="font-sans text-xs text-neutral-400">Thermal Energy</span>
                </div>
                <motion.span 
                  key={stats.calories}
                  initial={{ scale: 1.15, color: '#f97316' }}
                  animate={{ scale: 1.0, color: '#ffffff' }}
                  className="font-mono text-sm font-bold"
                >
                  {stats.calories} Kcal
                </motion.span>
              </div>

              {/* Protein Gauge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="font-sans text-xs text-neutral-400">Pure Protein</span>
                </div>
                <motion.span 
                  key={stats.protein}
                  initial={{ scale: 1.15, color: '#3b82f6' }}
                  animate={{ scale: 1.0, color: '#ffffff' }}
                  className="font-mono text-sm font-bold"
                >
                  {stats.protein}g
                </motion.span>
              </div>

              {/* Preparation Time Gauge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="font-sans text-xs text-neutral-400">Est. Fire Time</span>
                </div>
                <motion.span 
                  key={stats.prepTime}
                  initial={{ scale: 1.15, color: '#6366f1' }}
                  animate={{ scale: 1.0, color: '#ffffff' }}
                  className="font-mono text-sm font-bold"
                >
                  ~{stats.prepTime} min
                </motion.span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Launchpad triggered upon burger completion */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 w-full max-w-4xl mx-auto bg-gradient-to-r from-neutral-900 to-neutral-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_50px_rgba(249,115,22,0.15)] z-20 relative"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-orange-400 tracking-wider uppercase block">
                    CULINARY SUCCESS
                  </span>
                  <h3 className="font-sans font-bold text-xl text-white tracking-tight">
                    The Foundry Crown Classic is Assembled!
                  </h3>
                  <p className="font-sans text-neutral-400 text-xs mt-1 font-light">
                    Your masterpiece has locked. You can order this classic exact blueprint directly, or send it to the Deep Customizer to add double bacon, sunny-side egg, mushrooms, and more.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={() => onCustomizeDirect('classic')}
                  className="py-3.5 px-6 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-orange-500/50 hover:bg-neutral-800 font-sans font-bold text-xs tracking-wider uppercase active:scale-95 transition-all cursor-pointer"
                >
                  Deep Customizer
                </button>
                <button
                  onClick={() => {
                    const layerIds = BUILD_LAYERS.map(l => l.id);
                    onComplete(layerIds, stats.price);
                  }}
                  className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-sans font-bold text-xs tracking-widest uppercase shadow-[0_8px_20px_rgba(249,115,22,0.25)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.45)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  Add to Cart & Order
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
