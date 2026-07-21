import React from 'react';
import { motion } from 'motion/react';
import { Flame, ChevronDown, Sparkles } from 'lucide-react';
import { CanvasSizzle } from './CanvasSizzle';
import { BurgerSvg } from './BurgerSvg';

interface HeroSectionProps {
  onStartJourney: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartJourney }) => {
  return (
    <section id="hero" className="relative w-full min-h-screen bg-neutral-950 flex flex-col items-center justify-between overflow-hidden px-4 py-8">
      
      {/* Cinematic Ambient Background Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft orange/red ambient light in top right */}
        <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] sm:w-[50vw] sm:h-[50vw] rounded-full bg-orange-600/10 blur-[120px]" />
        {/* Hot glowing grill light in center bottom */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[90vw] h-[50vh] rounded-full bg-red-900/15 blur-[100px]" />
        {/* Subtle grid mesh pattern for industrial kitchen feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Top Header Navigation Brand (Cinematic Style) */}
      <header className="relative w-full max-w-7xl mx-auto flex items-center justify-between z-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-2.5"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <Flame className="w-5.5 h-5.5 text-white" />
          </div>
          <div>
            <span className="font-sans font-bold text-lg tracking-wider text-white uppercase block">
              The Foundry
            </span>
            <span className="font-mono text-[9px] text-orange-400 tracking-widest uppercase block">
              Flame-Grilled Craft
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center gap-6"
        >
          <span className="hidden sm:inline font-mono text-[11px] text-neutral-400 tracking-wider uppercase">
            Est. 2021 &bull; Artisan Burgers
          </span>
          <button 
            onClick={onStartJourney}
            className="px-5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-mono tracking-wider hover:text-orange-400 hover:border-orange-500/50 transition-all duration-300"
          >
            SKIP ASSEMBLY
          </button>
        </motion.div>
      </header>

      {/* Main Hero Showcase */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-auto z-10 text-center">
        
        {/* Narrative Sub-Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono tracking-widest uppercase mb-6"
        >
          <Sparkles className="w-3 h-3 animate-pulse" />
          Cinematic Culinary Experience
        </motion.div>

        {/* Narrative-style Hero Message */}
        <h1 className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-4">
          Every Great Burger <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Begins on the Grill.
          </span>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.0 }}
          className="font-sans text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed font-light"
        >
          "Every great burger begins with premium ingredients. We invite you behind the steel counter to witness our signature masterpiece take shape, layer by flame-seared layer."
        </motion.p>

        {/* Grill Station Display */}
        <div className="relative w-full max-w-lg aspect-[16/9] flex items-center justify-center mb-6">
          
          {/* Sizzling Grill Base - Heavy Cast Iron Grates Look */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-end">
            
            {/* Red Glowing Fire Beds beneath the grates */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-red-600/30 via-orange-500/15 to-transparent flex justify-around items-end px-6 blur-md">
              <div className="w-12 h-24 bg-red-600 rounded-full animate-pulse opacity-40" style={{ animationDuration: '3s' }} />
              <div className="w-16 h-32 bg-orange-500 rounded-full animate-pulse opacity-30" style={{ animationDuration: '2s' }} />
              <div className="w-10 h-20 bg-red-500 rounded-full animate-pulse opacity-40" style={{ animationDuration: '4s' }} />
              <div className="w-14 h-28 bg-orange-600 rounded-full animate-pulse opacity-35" style={{ animationDuration: '2.5s' }} />
            </div>

            {/* Iron Grates Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_93%,#222_93%,#111_100%)] bg-[size:100%_16px] opacity-75 z-0" />
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_15px_#f97316] opacity-60" />

            {/* Canvas-based sizzle sparks & smoke */}
            <CanvasSizzle intensity="high" className="z-10" />
          </div>

          {/* Falling Sizzling Angus Beef Patty Layer */}
          <motion.div
            initial={{ y: -160, rotate: -8, scale: 1.15, opacity: 0 }}
            animate={{ y: 15, rotate: 2, scale: 1.0, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 120,
              damping: 10,
              delay: 0.8
            }}
            className="relative z-20 w-[80%] flex flex-col items-center cursor-pointer"
          >
            <BurgerSvg layerId="patty" width="90%" hovered={true} />
            
            {/* Tiny Steam Indicator on Patty */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-0 text-white/10 font-mono text-[9px] uppercase tracking-widest"
            >
              * Sizzling *
            </motion.div>
          </motion.div>
        </div>

        {/* Start Button & Sizzle prompt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center gap-3 mt-4"
        >
          <button
            onClick={onStartJourney}
            className="group relative px-8 py-4.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white font-sans font-bold text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(249,115,22,0.25)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.45)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 z-20 cursor-pointer"
          >
            <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            Cook Your Masterpiece
            <Flame className="w-4 h-4 animate-bounce" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-2 text-neutral-500 font-mono text-[10px] tracking-widest uppercase cursor-pointer"
        onClick={onStartJourney}
      >
        <span>SCROLL DOWN TO ASSEMBLE</span>
        <ChevronDown className="w-4 h-4 text-orange-500 animate-bounce" />
      </motion.div>
    </section>
  );
};
