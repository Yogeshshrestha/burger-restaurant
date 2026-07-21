import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, Check, LayoutGrid, Palette, Type, Compass,
  Flame, Sparkles, Trash2, Plus, Minus, ArrowRight,
  ShieldCheck, Trophy, Clock, Lock, Unlock, Eye,
  Info, ShoppingBag, ArrowDownRight, RefreshCw, Layers,
  Star, Activity, Zap, DollarSign, Calendar, MapPin, 
  CreditCard, Send, CheckCircle2, ChevronRight
} from 'lucide-react';
import { BURGERS, INGREDIENTS, TESTIMONIALS, CHEFS, RESTAURANT_STORY } from '../data';
import { BurgerSvg } from './BurgerSvg';

export const FigmaDesignSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'atoms' | 'components' | 'prototype'>('components');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // States for interactive specs
  const [cardHovered, setCardHovered] = useState<boolean>(false);
  const [cardSelected, setCardSelected] = useState<boolean>(false);
  const [customizerBacon, setCustomizerBacon] = useState<boolean>(true);
  const [customizerPickles, setCustomizerPickles] = useState<boolean>(false);
  const [customizerEgg, setCustomizerEgg] = useState<boolean>(false);
  const [customizerPatties, setCustomizerPatties] = useState<number>(1);
  const [trackerStep, setTrackerStep] = useState<number>(1); // 0: Ignition, 1: Searing, 2: Resting, 3: Completed
  const [activeReviewIdx, setActiveReviewIdx] = useState<number>(0);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Color Palette Definition for Figma Import
  const COLOR_TOKENS = [
    { name: 'Neutral Darkest (Bg)', hex: '#0a0a0a', tailwind: 'bg-neutral-950', desc: 'Primary application canvas background' },
    { name: 'Neutral Panel', hex: '#171717', tailwind: 'bg-neutral-900', desc: 'Cards, side drawer, action panels, and modal containers' },
    { name: 'Neutral Border', hex: '#262626', tailwind: 'border-neutral-800', desc: 'Structural dividers, buttons, and high-contrast lines' },
    { name: 'Brand Flame (Orange)', hex: '#f97316', tailwind: 'text-orange-500', desc: 'Primary brand accent, glowing embers, and major CTAs' },
    { name: 'Brand Amber (Gold)', hex: '#f59e0b', tailwind: 'text-amber-500', desc: 'Limited edition badges, high scores, and ratings' },
    { name: 'Brand Crimson (Red)', hex: '#dc2626', tailwind: 'text-red-600', desc: 'Allergen flags, price points, and thermal indicators' },
    { name: 'Sizzle Emerald (Green)', hex: '#10b981', tailwind: 'text-emerald-500', desc: 'Completed checkouts, order trackers, and verified states' },
    { name: 'Melt Yellow (Cheese)', hex: '#eab308', tailwind: 'text-yellow-500', desc: 'Secondary highlight color and cheese highlights' },
  ];

  // Font Styles
  const TYPO_TOKENS = [
    { name: 'Display Title Lg', family: 'Inter', size: 'text-5xl (48px)', weight: 'FontWeight 900 (Black)', tracking: 'tracking-tight (-0.025em)', sample: 'Flame-Grilled Gastronomy' },
    { name: 'Section Header Md', family: 'Inter', size: 'text-2xl (24px)', weight: 'FontWeight 800 (ExtraBold)', tracking: 'tracking-tight (-0.02em)', sample: 'Select Your Grill Blueprint' },
    { name: 'Card Title Sm', family: 'Inter', size: 'text-lg (18px)', weight: 'FontWeight 700 (Bold)', tracking: 'tracking-tight (-0.015em)', sample: 'Smash Angus Double' },
    { name: 'Component Label', family: 'Inter', size: 'text-xs (12px)', weight: 'FontWeight 700 (Bold)', tracking: 'tracking-wider (0.05em)', sample: 'ADD TO SACK' },
    { name: 'Gourmet Body Regular', family: 'Inter', size: 'text-sm (14px)', weight: 'FontWeight 400 (Regular)', tracking: 'tracking-normal', sample: 'Artisanal buns paired with fresh vegetables and secret smoke sauce.' },
    { name: 'Hearth Code Mono', family: 'JetBrains Mono', size: 'text-[11px]', weight: 'FontWeight 500 (Medium)', tracking: 'tracking-widest (0.1em)', sample: 'PORT_3000: INITIALIZED' },
  ];

  // Icon assets used in the design
  const ICON_ASSETS = [
    { component: Flame, name: 'Flame', desc: 'Thermal cooking, calorie metrics & system core' },
    { component: Star, name: 'Star', desc: 'Gastronomy score & user acclaimed ratings' },
    { component: ShieldCheck, name: 'ShieldCheck', desc: 'Hygiene certification & secure payments' },
    { component: Clock, name: 'Clock', desc: 'Preparation timers & checkout timelines' },
    { component: Info, name: 'Info', desc: 'Allergens index & dietary warnings' },
    { component: ShoppingBag, name: 'ShoppingBag', desc: 'Grill sack drawer & order subtotal' },
    { component: Lock, name: 'Lock', desc: 'Scroll engine locks & security guidelines' },
    { component: Plus, name: 'Plus', desc: 'Ingredient add multipliers' },
  ];

  return (
    <div className="relative w-full bg-neutral-950 text-white min-h-screen pt-28 pb-24 px-4 overflow-hidden border-t border-neutral-900">
      {/* Background aesthetics */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[5%] right-[2%] w-[50vw] h-[50vw] rounded-full bg-orange-600/5 blur-[140px]" />
        <div className="absolute bottom-[10%] left-[-2%] w-[45vw] h-[45vw] rounded-full bg-amber-500/5 blur-[130px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto z-10 space-y-12">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-neutral-900 pb-10">
          <div className="text-left space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" />
              FIGMA SPEC SHEET & INTERACTIVE UI KIT
            </div>
            <h1 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight">
              Decomposed Components Vault
            </h1>
            <p className="font-sans text-neutral-400 text-sm font-light leading-relaxed">
              Every single page module, drawer sidebar, dialogue box, layout, customizer and atomic asset completely mapped out side-by-side. Copy hex tokens, measure pixel metrics, and inspect layouts directly for Figma replication.
            </p>
          </div>

          {/* Quick copy indicator */}
          <AnimatePresence>
            {copiedText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="px-4 py-2 bg-emerald-500 text-neutral-950 rounded-xl font-mono text-xs font-bold flex items-center gap-2 shadow-lg shrink-0"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                Copied: {copiedText}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 bg-neutral-900/40 p-1.5 rounded-2xl border border-neutral-800/80 max-w-3xl text-[11px] font-mono font-bold">
          <button
            onClick={() => setActiveTab('components')}
            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'components' ? 'bg-orange-600 text-white shadow-md shadow-orange-600/15' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            1. Page Modules & Dialogs
          </button>
          <button
            onClick={() => setActiveTab('tokens')}
            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'tokens' ? 'bg-orange-600 text-white shadow-md shadow-orange-600/15' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            2. Design Tokens Spec
          </button>
          <button
            onClick={() => setActiveTab('atoms')}
            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'atoms' ? 'bg-orange-600 text-white shadow-md shadow-orange-600/15' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            3. Atomic Micro-States
          </button>
          <button
            onClick={() => setActiveTab('prototype')}
            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'prototype' ? 'bg-orange-600 text-white shadow-md shadow-orange-600/15' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            4. Smart Prototyping
          </button>
        </div>

        <AnimatePresence mode="wait">
          
          {/* TAB 1: DECOMPOSED PAGE MODULES & COMPONENT SPECS */}
          {activeTab === 'components' && (
            <motion.div
              key="components"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-16 text-left"
            >
              
              {/* SECTION A: HERO HEADER BANNER */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-neutral-900 pb-2">
                  <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                    <Layers className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-xl text-white">Module A: Gourmet Hero Landing Section</h3>
                    <span className="font-mono text-[10px] text-neutral-500">Outer layout bounds: w-full max-w-7xl mx-auto py-20 px-4</span>
                  </div>
                </div>

                <div className="bg-neutral-900/50 border border-neutral-850 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-2 right-2 font-mono text-[9px] text-neutral-600 border border-neutral-850 px-2 py-0.5 rounded">
                    FIGMA SPEC: HERO_CONTAINER
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Hero copy info */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono uppercase tracking-widest">
                        <Trophy className="w-3 h-3" />
                        ENGINEERED FLAME-GRILLED GOURMET
                      </div>
                      
                      <div className="space-y-2">
                        <h1 className="font-sans font-black text-4xl sm:text-6xl text-white tracking-tight leading-none">
                          Forge Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-red-500">Grill Blueprint</span>
                        </h1>
                        <p className="font-sans text-neutral-400 text-sm sm:text-base font-light max-w-xl leading-relaxed">
                          A high-fidelity immersive workspace where premium ingredients meet physics-driven stack layouts. Build, customize, and ignite your culinary blueprint.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-2">
                        <button className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white font-sans font-bold text-xs tracking-widest uppercase flex items-center gap-2 shadow-lg shadow-orange-600/15">
                          <span>Ignite Craft Builder</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button className="px-6 py-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white font-sans font-bold text-xs tracking-widest uppercase flex items-center gap-2">
                          <span>Inspect Vault</span>
                        </button>
                      </div>
                    </div>

                    {/* Hero illustration mock specs */}
                    <div className="lg:col-span-5 bg-neutral-950 rounded-2xl border border-neutral-850 p-6 flex flex-col items-center justify-center relative min-h-[250px]">
                      <div className="absolute top-2 left-2 font-mono text-[8px] text-neutral-500">VISUAL ANCHOR (3D VECTOR)</div>
                      <div className="relative w-36 h-36 flex flex-col justify-end items-center">
                        <div className="absolute w-[90%] h-[95%] bg-orange-500/10 blur-[30px]" />
                        <BurgerSvg layerId="bun_bottom" width="100%" />
                        <div className="absolute bottom-[14px] w-full z-10"><BurgerSvg layerId="patty" width="100%" /></div>
                        <div className="absolute bottom-[28px] w-full z-20"><BurgerSvg layerId="cheese" width="100%" /></div>
                        <div className="absolute bottom-[40px] w-full z-30"><BurgerSvg layerId="bun_top" width="100%" /></div>
                      </div>
                      <span className="font-mono text-[9px] text-orange-400 font-bold tracking-widest mt-4">CLASSIC SMASH SPECIALTY</span>
                    </div>
                  </div>
                </div>
              </div>


              {/* SECTION B: SCROLL-COOKING INTERCEPTOR */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-neutral-900 pb-2">
                  <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                    <Layers className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-xl text-white">Module B: Interactive Scroll-Cooking Builder</h3>
                    <span className="font-mono text-[10px] text-neutral-500">Component specs for the scrolling stack workspace layout</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left Specs explanation */}
                  <div className="lg:col-span-5 bg-neutral-900/40 border border-neutral-850 rounded-3xl p-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-950 text-neutral-400 text-[9px] font-mono font-bold">
                        SPECS ID: SCROLL_INTERCEPTOR
                      </div>
                      <h4 className="font-sans font-extrabold text-lg text-white">Physics-Based Stacking System</h4>
                      <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed">
                        In the live app, this module intercepts standard page scroll wheel inputs. Each detent drops another photorealistic SVG ingredient layer onto the bottom bun with a soft spring bounce.
                      </p>
                      
                      <div className="space-y-2 font-mono text-[11px] text-neutral-400 pt-2">
                        <div className="flex justify-between border-b border-neutral-850 pb-1.5">
                          <span>Default Active Layer</span>
                          <span className="text-orange-400">bun_bottom</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-850 pb-1.5">
                          <span>Animation Engine</span>
                          <span className="text-orange-400">motion/react (Spring)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Layer Heights Offset</span>
                          <span className="text-orange-400">Staggered -12px to -16px</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-4 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-amber-400 font-bold">
                        <Lock className="w-3.5 h-3.5 text-amber-500" />
                        <span>Figma Prototype Note</span>
                      </div>
                      <p className="font-sans text-neutral-400 text-[11px] leading-relaxed">
                        To translate this on a Figma design canvas, set up a frame connection using <strong>Smart Animate</strong> with a <strong>Custom Spring</strong> curve. Place assets exploded in frame A, and stacked closely in frame B.
                      </p>
                    </div>
                  </div>

                  {/* Right layout preview */}
                  <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-2 right-2 font-mono text-[8px] text-neutral-500">FIGMA LAYOUT PREVIEW</div>
                    
                    {/* Scroll Locked Indicator banner */}
                    <div className="flex justify-center mb-6">
                      <div className="flex items-center gap-2 bg-amber-950/50 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-full font-mono text-[9px] font-bold shadow-md animate-pulse">
                        <Lock className="w-3.5 h-3.5" />
                        <span>SCROLL LOCK ENGAGED: ACCUMULATE LAYERS (3/9)</span>
                      </div>
                    </div>

                    {/* Stack visualization */}
                    <div className="flex-1 flex flex-col items-center justify-center py-6">
                      <div className="relative w-44 h-44 flex flex-col justify-end items-center pb-2">
                        <div className="absolute w-[90%] h-[30%] bg-amber-500/10 blur-[20px] bottom-0 rounded-full" />
                        
                        {/* Exploded layers */}
                        <div className="absolute bottom-[0px] w-[90%]"><BurgerSvg layerId="bun_bottom" width="100%" /></div>
                        <div className="absolute bottom-[24px] w-[85%]"><BurgerSvg layerId="patty" width="100%" /></div>
                        <div className="absolute bottom-[48px] w-[85%] border-b border-dashed border-orange-500/50 pb-2 z-15"><BurgerSvg layerId="cheese" width="100%" /></div>
                        
                        {/* Hovering next incoming layer */}
                        <div className="absolute bottom-[90px] w-[80%] opacity-60 border-t border-dashed border-neutral-700 pt-2 flex flex-col items-center">
                          <span className="font-mono text-[8px] text-orange-400 bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800 -mt-5">NEXT ON WHEEL: LETTUCE</span>
                          <BurgerSvg layerId="lettuce" width="100%" />
                        </div>
                      </div>
                    </div>

                    {/* Progress checkpoints */}
                    <div className="flex justify-between items-center bg-neutral-950 p-3 rounded-2xl border border-neutral-850 mt-4 text-[10px]">
                      <span className="font-sans text-neutral-500">Ingredient Weight</span>
                      <span className="font-mono text-white font-bold">140g Standard Patty</span>
                      <span className="font-mono text-orange-400 font-bold">$10.50 Base Price</span>
                    </div>
                  </div>

                </div>
              </div>


              {/* SECTION C: SHOWCASE CARD & GRID SPEC */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-neutral-900 pb-2">
                  <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                    <Layers className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-xl text-white">Module C: Showcase Category & Product Card Specs</h3>
                    <span className="font-mono text-[10px] text-neutral-500">Decomposed specifications for horizontal filter tabs & product cards</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Filter tabs specimens */}
                  <div className="lg:col-span-12 bg-neutral-900/30 border border-neutral-850 rounded-3xl p-6 space-y-4">
                    <div>
                      <span className="font-mono text-[8px] text-neutral-500 block uppercase mb-1">Interactive Component</span>
                      <h4 className="font-sans font-bold text-base text-white">Horizontal Vault Filter Deck</h4>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="space-y-1.5">
                        <span className="font-mono text-[8px] text-neutral-500 uppercase block">Selected (Active) Filter tab</span>
                        <div className="px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase bg-gradient-to-r from-orange-600 to-red-600 border border-orange-500 text-white font-bold shadow-md">
                          Smash Angus Beef
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <span className="font-mono text-[8px] text-neutral-500 uppercase block">Default Unselected tab</span>
                        <div className="px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white">
                          Black Truffle Elite
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <span className="font-mono text-[8px] text-neutral-500 uppercase block">Hover State tab</span>
                        <div className="px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase bg-neutral-900 border border-neutral-700 text-white">
                          Gourmet Plant
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card spec mockup (Col 6) */}
                  <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 relative overflow-hidden space-y-6">
                    <div className="absolute top-2 right-2 font-mono text-[8px] text-neutral-500">PRODUCT_CARD_SPECS: NORMAL</div>
                    
                    {/* Header: score and cal */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 bg-neutral-950 px-2.5 py-1 rounded-full border border-neutral-800">
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                        <span className="font-mono text-[10px] font-bold text-white">4.9</span>
                        <span className="font-sans text-[8px] text-neutral-500">(124)</span>
                      </div>
                      <span className="font-mono text-[10px] text-neutral-400 font-light bg-neutral-950/60 px-2 py-0.5 rounded border border-neutral-850">
                        840 Kcal
                      </span>
                    </div>

                    {/* Vector frame visual stage */}
                    <div className="h-44 bg-neutral-950 rounded-2xl border border-neutral-850/60 flex items-center justify-center relative group">
                      <div className="absolute w-24 h-6 bg-orange-600/10 blur-xl rounded-full" />
                      <div className="relative w-28 h-28 flex flex-col justify-end items-center pb-1">
                        <BurgerSvg layerId="bun_bottom" width="100%" />
                        <div className="absolute bottom-[8px] w-full z-10"><BurgerSvg layerId="patty" width="100%" /></div>
                        <div className="absolute bottom-[16px] w-full z-20"><BurgerSvg layerId="cheese" width="100%" /></div>
                        <div className="absolute bottom-[24px] w-full z-30"><BurgerSvg layerId="bun_top" width="100%" /></div>
                      </div>
                    </div>

                    {/* Titles */}
                    <div className="text-left space-y-1">
                      <h3 className="font-sans font-black text-xl text-white">Smash Angus Supreme</h3>
                      <span className="font-mono text-[9px] text-orange-500 tracking-wider uppercase block">HIGH-SEAR SMASH SPECIALTY</span>
                      <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed">
                        Dual smash Angus beef patties, dual Cheddar melts, fresh Vidalia pickles and our dedicated kitchen smoke sauce.
                      </p>
                    </div>

                    {/* Footer deck with action trigger */}
                    <div className="pt-4 border-t border-neutral-850/80 flex items-center justify-between">
                      <div className="text-left">
                        <span className="text-[9px] font-sans text-neutral-500 uppercase block">Craft Value</span>
                        <span className="font-mono text-base font-bold text-white">$12.50</span>
                      </div>
                      <button className="px-4 py-2 rounded-xl bg-orange-600 text-white font-sans font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                        <span>Deploy Blueprint</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card Spec Details on Hover & Selected (Col 6) */}
                  <div className="lg:col-span-6 space-y-6">
                    
                    {/* Hover spec container */}
                    <div 
                      onMouseEnter={() => setCardHovered(true)}
                      onMouseLeave={() => setCardHovered(false)}
                      className={`bg-neutral-900 border rounded-3xl p-5 transition-all duration-300 relative overflow-hidden ${
                        cardHovered ? 'border-orange-500/40 shadow-[0_15px_30px_rgba(249,115,22,0.08)] scale-[1.01]' : 'border-neutral-800'
                      }`}
                    >
                      <div className="absolute top-2 right-2 font-mono text-[8px] text-neutral-500">INTERACTIVE HOVER STATE CARD</div>
                      <div className="space-y-3">
                        <span className="font-mono text-[9px] text-orange-400 uppercase block font-bold">HOVER FEEDBACK EFFECTS</span>
                        <p className="font-sans text-neutral-400 text-xs font-light">
                          Hovering on a product card initiates a glow behind the burger vector stack, expands the layout size slightly, and elevates the border color to Brand Orange.
                        </p>
                        <div className="flex items-center gap-2 bg-neutral-950 p-2.5 rounded-xl border border-neutral-850 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-orange-500" />
                          <span className="font-sans text-white font-bold">Scale multiplier: scale-102</span>
                        </div>
                      </div>
                    </div>

                    {/* Layout Dimensions Specs */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-3 text-left">
                      <span className="font-mono text-[9px] text-neutral-500 uppercase block">Figma Component Spec-Sheet</span>
                      <div className="space-y-2 font-mono text-xs text-neutral-400">
                        <div className="flex justify-between border-b border-neutral-850 pb-1">
                          <span>Card Border Radius</span>
                          <span className="text-white">24px (rounded-3xl)</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-850 pb-1">
                          <span>Horizontal Padding</span>
                          <span className="text-white">24px (p-6)</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-850 pb-1">
                          <span>Glow Core Alpha</span>
                          <span className="text-white">opacity-60 to opacity-100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Responsive Grid</span>
                          <span className="text-white">Cols-1 (mobile) to Cols-3 (desktop)</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>


              {/* SECTION D: CUSTOMIZER DIALOG & MODAL DECK */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-neutral-900 pb-2">
                  <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                    <Layers className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-xl text-white">Module D: Burger Customizer Dialog & Modal Deck</h3>
                    <span className="font-mono text-[10px] text-neutral-500">Dialogue modal layout, allergen indexes and custom modifiers specifications</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Detailed Spec Modal Container (Col 7) */}
                  <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 relative space-y-6">
                    <div className="absolute top-2 right-2 font-mono text-[8px] text-neutral-500">FIGMA SPEC ID: DIALOGUE_MODAL</div>
                    
                    {/* Header */}
                    <div className="flex justify-between items-start border-b border-neutral-850 pb-4">
                      <div className="text-left space-y-1">
                        <h4 className="font-sans font-black text-lg text-white">Customize Smash Angus</h4>
                        <span className="font-mono text-[9px] text-orange-400 tracking-wider uppercase block">FINE TUNING THE蓝色BLUEPRINT</span>
                      </div>
                      <div className="bg-neutral-950 border border-neutral-800 px-2.5 py-1 rounded-lg text-xs font-mono text-neutral-400">
                        $12.50 Base Price
                      </div>
                    </div>

                    {/* Customizer workspace interactive preview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      
                      {/* Left stack preview */}
                      <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-850 flex flex-col items-center">
                        <div className="relative w-32 h-32 flex flex-col justify-end items-center pb-1">
                          <BurgerSvg layerId="bun_bottom" width="100%" />
                          <div className="absolute bottom-[8px] w-full z-10">
                            {customizerPatties === 1 ? (
                              <BurgerSvg layerId="patty" width="100%" />
                            ) : (
                              <>
                                <div className="absolute bottom-[0px] w-full z-5"><BurgerSvg layerId="patty" width="100%" /></div>
                                <div className="absolute bottom-[8px] w-full z-10"><BurgerSvg layerId="patty" width="100%" /></div>
                              </>
                            )}
                          </div>
                          {customizerBacon && (
                            <div className="absolute bottom-[24px] w-full z-25"><BurgerSvg layerId="bacon" width="100%" /></div>
                          )}
                          {customizerEgg && (
                            <div className="absolute bottom-[36px] w-full z-28"><BurgerSvg layerId="egg" width="100%" /></div>
                          )}
                          <div className="absolute bottom-[48px] w-full z-30"><BurgerSvg layerId="bun_top" width="100%" /></div>
                        </div>
                        <span className="font-mono text-[8px] text-neutral-500 mt-2 block">ACTIVE BUILD STACK</span>
                      </div>

                      {/* Right modifiers options */}
                      <div className="space-y-3 text-left">
                        <div className="space-y-1.5">
                          <span className="font-mono text-[8px] text-neutral-500 block">Patties Multiplier</span>
                          <div className="flex items-center gap-3 bg-neutral-950 p-1 rounded-xl border border-neutral-850 w-fit">
                            <button 
                              onClick={() => setCustomizerPatties(p => Math.max(1, p - 1))}
                              className="p-1.5 rounded bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold text-white px-1">{customizerPatties}</span>
                            <button 
                              onClick={() => setCustomizerPatties(p => Math.min(2, p + 1))}
                              className="p-1.5 rounded bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Toggles */}
                        <div className="space-y-2">
                          {/* Bacon toggle */}
                          <div 
                            onClick={() => setCustomizerBacon(!customizerBacon)}
                            className={`flex justify-between items-center px-3 py-2 rounded-xl border cursor-pointer text-xs transition-all ${
                              customizerBacon ? 'bg-orange-950/20 border-orange-500/30 text-white font-bold' : 'bg-neutral-950 border-neutral-850 text-neutral-500'
                            }`}
                          >
                            <span>Add Extra Bacon</span>
                            <span className="font-mono text-[10px] text-orange-400">+$2.00</span>
                          </div>

                          {/* Egg toggle */}
                          <div 
                            onClick={() => setCustomizerEgg(!customizerEgg)}
                            className={`flex justify-between items-center px-3 py-2 rounded-xl border cursor-pointer text-xs transition-all ${
                              customizerEgg ? 'bg-orange-950/20 border-orange-500/30 text-white font-bold' : 'bg-neutral-950 border-neutral-850 text-neutral-500'
                            }`}
                          >
                            <span>Add Gourmet Egg</span>
                            <span className="font-mono text-[10px] text-orange-400">+$1.50</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Total calorie summary badge */}
                    <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-850 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-neutral-400">
                        <Activity className="w-4 h-4 text-orange-500 animate-pulse" />
                        <span>Dynamic Energy Payload:</span>
                      </div>
                      <span className="font-mono text-white font-bold">
                        {840 + (customizerPatties > 1 ? 240 : 0) + (customizerBacon ? 120 : 0) + (customizerEgg ? 90 : 0)} Kcal
                      </span>
                    </div>
                  </div>

                  {/* Allergen & Specs side sheet (Col 5) */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Allergen warning spec */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4 text-left">
                      <div className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-red-500" />
                        <h4 className="font-sans font-bold text-base text-white">Allergen Safety Deck</h4>
                      </div>
                      <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed">
                        The dialogue panel maps vital food safety indexes dynamically. Red highlights prompt high vigilance warnings.
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                        <div className="p-2.5 bg-red-950/20 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span>Contains Gluten</span>
                        </div>
                        <div className="p-2.5 bg-red-950/20 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span>Contains Dairy</span>
                        </div>
                        <div className="p-2.5 bg-neutral-950 border border-neutral-850 rounded-xl text-neutral-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                          <span>Peanut Free</span>
                        </div>
                        <div className="p-2.5 bg-neutral-950 border border-neutral-850 rounded-xl text-neutral-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                          <span>Soy Free</span>
                        </div>
                      </div>
                    </div>

                    {/* Modal Spec Coordinates */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-3 text-left">
                      <span className="font-mono text-[9px] text-neutral-500 uppercase block">Dialogue Component Coordinates</span>
                      <div className="space-y-2 font-mono text-xs text-neutral-400">
                        <div className="flex justify-between border-b border-neutral-850 pb-1">
                          <span>Dialog Max Width</span>
                          <span className="text-white">650px (max-w-2xl)</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-850 pb-1">
                          <span>Glass Overlay blur</span>
                          <span className="text-white">backdrop-blur-md</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-850 pb-1">
                          <span>Allergen Badge padding</span>
                          <span className="text-white">10px vertical & horizontal</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Close Trigger element</span>
                          <span className="text-white">Escape Key or Backdrop click</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>


              {/* SECTION E: CART DRAWER SIDEBAR SPEC */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-neutral-900 pb-2">
                  <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                    <Layers className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-xl text-white">Module E: Grill Order Sack Drawer & Payment Panel</h3>
                    <span className="font-mono text-[10px] text-neutral-500">Decomposed drawer sidebar, secure transactions simulator console specs</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Outer Cart Sidebar Frame (Col 5) */}
                  <div className="lg:col-span-5 bg-neutral-900 border border-neutral-850 rounded-3xl p-6 space-y-6 relative">
                    <div className="absolute top-2 right-2 font-mono text-[8px] text-neutral-500">FIGMA SPEC ID: CART_DRAWER_SIDEBAR</div>
                    
                    <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4.5 h-4.5 text-orange-400" />
                        <h4 className="font-sans font-extrabold text-base text-white">Grill Order Sack</h4>
                      </div>
                      <span className="font-mono text-[10px] text-neutral-500 bg-neutral-950 px-2 py-0.5 rounded">2 ITEMS</span>
                    </div>

                    {/* Cart list elements */}
                    <div className="space-y-3">
                      
                      {/* Row Item 1 */}
                      <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-850 flex gap-3 text-xs">
                        <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center shrink-0 border border-neutral-800">
                          <BurgerSvg layerId="patty" width="80%" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between font-bold text-white">
                            <span>Double Cheese Master</span>
                            <span className="font-mono text-orange-400">$14.50</span>
                          </div>
                          <p className="font-sans text-[10px] text-neutral-500">Quantity: 1 • Standard Build</p>
                        </div>
                      </div>

                      {/* Row Item 2 */}
                      <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-850 flex gap-3 text-xs">
                        <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center shrink-0 border border-neutral-800">
                          <BurgerSvg layerId="bun_top" width="80%" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between font-bold text-white">
                            <span>The Custom Assembly</span>
                            <span className="font-mono text-orange-400">$12.50</span>
                          </div>
                          <p className="font-sans text-[10px] text-emerald-400 font-medium">+ Extra Crisp Bacon</p>
                        </div>
                      </div>

                    </div>

                    {/* Dynamic checkout receipts card */}
                    <div className="pt-4 border-t border-neutral-850 space-y-2 text-xs font-sans">
                      <div className="flex justify-between text-neutral-500">
                        <span>Thermal Value (Cal)</span>
                        <span className="font-mono">1,520 Kcal</span>
                      </div>
                      <div className="flex justify-between text-neutral-500">
                        <span>Guaranteed Sear Time</span>
                        <span className="font-mono">15 Mins</span>
                      </div>
                      <div className="flex justify-between text-white font-extrabold pt-2 border-t border-neutral-900 text-sm">
                        <span>Grand Total</span>
                        <span className="font-mono text-orange-400">$27.00</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Simulator Spec Drawer console (Col 7) */}
                  <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-5">
                    <div>
                      <span className="font-mono text-[9px] text-orange-400 tracking-wider uppercase block">SECURE GATEWAY SUBSYSTEM</span>
                      <h4 className="font-sans font-extrabold text-lg text-white">Decomposed Component: Transaction Hub</h4>
                      <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed">
                        This captures the instant authorize checkout widget containing credit card inputs and transaction dispatches.
                      </p>
                    </div>

                    <div className="bg-neutral-950 rounded-2xl border border-neutral-850 p-5 space-y-4">
                      <div className="flex items-center gap-2 border-b border-neutral-900 pb-3">
                        <CreditCard className="w-4.5 h-4.5 text-orange-500" />
                        <span className="font-sans font-bold text-xs text-white">Instant Payment Authorization</span>
                      </div>

                      {/* Mock Credit Card inputs */}
                      <div className="space-y-3 text-xs text-left">
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] text-neutral-500 uppercase font-bold">Credit Card Number</label>
                          <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-lg text-neutral-400 font-mono tracking-widest flex items-center justify-between">
                            <span>•••• •••• •••• 4242</span>
                            <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="font-mono text-[9px] text-neutral-500 uppercase font-bold">Expiry Date</label>
                            <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-lg text-neutral-400 font-mono">12 / 28</div>
                          </div>
                          <div className="space-y-1">
                            <label className="font-mono text-[9px] text-neutral-500 uppercase font-bold">CVC Code</label>
                            <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-lg text-neutral-400 font-mono">***</div>
                          </div>
                        </div>
                      </div>

                      {/* Transaction dispatch button */}
                      <button className="w-full py-3 rounded-xl bg-emerald-600 text-neutral-950 font-sans font-black text-[11px] tracking-widest uppercase flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        <span>AUTHORIZE TRANSACTION</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-neutral-500 text-[10px] font-mono justify-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>SECURE AES-256 ENCRYPTION GATEWAY ACTIVE</span>
                    </div>
                  </div>

                </div>
              </div>


              {/* SECTION F: ORDER MILESTONES & THERMAL PROGRESS */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-neutral-900 pb-2">
                  <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                    <Layers className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-xl text-white">Module F: Live Order Tracker & Preparation Milestones</h3>
                    <span className="font-mono text-[10px] text-neutral-500">Deconstructed milestone checkers and active status tracking bar specs</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Step Control Selector */}
                  <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <span className="font-mono text-[9px] text-orange-400 uppercase font-bold block">TRACKER CONTROLLER STATE</span>
                      <h4 className="font-sans font-extrabold text-lg text-white">Interactive Milestones</h4>
                      <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed">
                        Click the milestones below to dynamically simulate different active states in our Figma live tracker component.
                      </p>
                    </div>

                    <div className="space-y-2">
                      {[
                        { id: 0, label: 'Ignition Authorized' },
                        { id: 1, label: 'Gourmet Searing' },
                        { id: 2, label: 'Resting & Assembly' },
                        { id: 3, label: 'Dispatched Rider' }
                      ].map((step) => (
                        <button
                          key={step.id}
                          onClick={() => setTrackerStep(step.id)}
                          className={`w-full py-2.5 px-4 rounded-xl font-mono text-[10px] tracking-wide uppercase border text-left flex items-center justify-between cursor-pointer transition-all ${
                            trackerStep === step.id 
                              ? 'bg-orange-600/15 border-orange-500 text-orange-400 font-bold shadow-md' 
                              : 'bg-neutral-950 border-neutral-850 text-neutral-500 hover:text-white'
                          }`}
                        >
                          <span>{step.label}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rendering Order Tracker specimen */}
                  <div className="lg:col-span-8 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between space-y-8 relative">
                    <div className="absolute top-2 right-2 font-mono text-[8px] text-neutral-500">FIGMA SPEC ID: ORDER_TRACKER_MILESTONES</div>
                    
                    {/* Header tracker info */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-850 pb-4">
                      <div className="text-left">
                        <span className="font-mono text-[9px] text-orange-500 uppercase font-bold block">ORDER REFERENCE: #FF-9584</span>
                        <h4 className="font-sans font-black text-lg text-white">Blueprint Searing Progress</h4>
                      </div>
                      <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-850 px-3 py-1.5 rounded-full text-xs">
                        <Clock className="w-4 h-4 text-orange-400" />
                        <span className="font-mono text-white font-bold">ETA: 12 MIN</span>
                      </div>
                    </div>

                    {/* Progress milestone slider timeline */}
                    <div className="relative w-full pt-4 pb-2 text-left">
                      <div className="absolute top-[28px] inset-x-4 h-1 bg-neutral-950 rounded-full z-0" />
                      
                      {/* Active green filler */}
                      <div 
                        className="absolute top-[28px] left-4 h-1 bg-emerald-500 rounded-full z-10 transition-all duration-700" 
                        style={{ width: `${(trackerStep / 3) * 90}%` }}
                      />

                      <div className="relative z-20 flex justify-between">
                        {[
                          { step: 0, label: 'Ignition' },
                          { step: 1, label: 'Searing' },
                          { step: 2, label: 'Assembly' },
                          { step: 3, label: 'Dispatched' }
                        ].map((m) => (
                          <div key={m.step} className="flex flex-col items-center space-y-2">
                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                              trackerStep >= m.step 
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                                : 'bg-neutral-950 border-neutral-850 text-neutral-600'
                            }`}>
                              {trackerStep >= m.step ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <span className="font-mono text-xs">{m.step + 1}</span>
                              )}
                            </div>
                            <span className={`font-mono text-[9px] font-bold uppercase ${
                              trackerStep === m.step ? 'text-orange-400' : 'text-neutral-500'
                            }`}>
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Thermal value indicator gauges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-850 flex items-center justify-between">
                        <span className="text-neutral-500">Combustion Heat Index</span>
                        <span className="text-red-400 font-bold">420°F Searing Flame</span>
                      </div>
                      <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-850 flex items-center justify-between">
                        <span className="text-neutral-500">Rider Dispatch Status</span>
                        <span className="text-emerald-400 font-bold">Courier Assigned</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* SECTION G: THREE UNCOMPROMISING PILLARS (BENEFITS CARD DECK) */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-neutral-900 pb-2">
                  <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                    <Trophy className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-xl text-white">Module G: Built on Three Pillars Benefit Cards</h3>
                    <span className="font-mono text-[10px] text-neutral-500">Thermodynamic Brand Pillars, high-fidelity card specs & layout geometry</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Interactive Cards Column (Col 8) */}
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        num: "01",
                        title: "500° Flame-Grilled Perfection",
                        desc: "True thermodynamic sear locks in savory juices. Our proprietary infrared burners heat premium cast-iron grates to 500 degrees Fahrenheit, creating an instantaneous crust.",
                        spec: "Border: neutral-800/80, Icon: Flame, Glow: Orange"
                      },
                      {
                        num: "02",
                        title: "Heritage Marbled Grinds",
                        desc: "Proprietary 80/15/5 chuck, short-rib and bone marrow blend. Each batch is ground twice daily to guarantee flawless fat emulsification and juicy bite profile.",
                        spec: "Border: neutral-800/80, Icon: Trophy, Glow: Amber"
                      },
                      {
                        num: "03",
                        title: "Locally Sourced Produce",
                        desc: "Crisped, hand-harvested butter lettuce, field tomatoes. Picked at sunrise from organic local farms, chilled instantly to retain crispy structural crunch.",
                        spec: "Border: neutral-800/80, Icon: MapPin, Glow: Emerald"
                      }
                    ].map((p, idx) => (
                      <div 
                        key={idx}
                        className="group relative bg-neutral-900/30 border border-neutral-800 rounded-2xl p-5 hover:border-orange-500/40 transition-all duration-300 text-left overflow-hidden"
                      >
                        {/* Glow effect on hover */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 blur-2xl group-hover:bg-orange-500/10 transition-all rounded-full" />
                        
                        <div className="flex justify-between items-start mb-4">
                          <span className="font-mono text-2xl font-extrabold text-orange-500/30 group-hover:text-orange-500/80 transition-colors">
                            {p.num}
                          </span>
                          <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-850 text-orange-400">
                            {idx === 0 ? <Flame className="w-4 h-4" /> : idx === 1 ? <Trophy className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                          </div>
                        </div>

                        <h4 className="font-sans font-bold text-sm text-white mb-2 group-hover:text-orange-400 transition-colors">
                          {p.title}
                        </h4>
                        <p className="font-sans text-neutral-400 text-[11px] font-light leading-relaxed mb-4">
                          {p.desc}
                        </p>

                        <div className="pt-2 border-t border-neutral-850/50 font-mono text-[9px] text-neutral-500">
                          {p.spec}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Spec Deck Column (Col 4) */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 text-left space-y-3">
                      <span className="font-mono text-[9px] text-orange-400 uppercase font-bold block">Brand Pillar Specs</span>
                      <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed">
                        These cards establish brand credibility through layout consistency, high-contrast numbers, and micro-animations.
                      </p>
                      <div className="space-y-2 font-mono text-xs text-neutral-400">
                        <div className="flex justify-between border-b border-neutral-850 pb-1">
                          <span>Card Width</span>
                          <span className="text-white">Auto (Flex-1)</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-850 pb-1">
                          <span>Grid System</span>
                          <span className="text-white">Cols-3 Desktop</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-850 pb-1">
                          <span>Radius</span>
                          <span className="text-white">16px (rounded-2xl)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Numeric Font</span>
                          <span className="text-white">JetBrains Mono Bold</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION H: LIMITED-TIME SPECIAL GOLD COUNTDOWN & WAGYU CARD */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-neutral-900 pb-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-xl text-white">Module H: Limited-Time Gold Special Countdown & Wagyu Card</h3>
                    <span className="font-mono text-[10px] text-neutral-500">Premium active countdown timer layout & gold tier special product specifications</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Visual Gold Card Preview (Col 8) */}
                  <div className="lg:col-span-8 bg-gradient-to-b from-neutral-900 via-neutral-900/40 to-neutral-950 border border-amber-500/20 rounded-3xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 text-left">
                    {/* Glowing golden background accent */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />
                    
                    <div className="flex-1 space-y-4 relative z-10">
                      <div>
                        <span className="font-mono text-[9px] text-amber-500 tracking-widest uppercase font-bold bg-amber-950/40 border border-amber-500/20 px-2 py-0.5 rounded w-fit block mb-2">
                          LIMITED SPECIAL REVEAL
                        </span>
                        <h4 className="font-sans font-black text-2xl text-white tracking-tight">
                          The Black Gold <br />
                          <span className="bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                            Truffle Wagyu Masterpiece
                          </span>
                        </h4>
                      </div>

                      <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed max-w-md">
                        Our ultimate luxury blueprint. Butter-basted dry-aged Wagyu, melted gold gruyère cheese, wild porcini mushrooms, and rich black truffle emulsion.
                      </p>

                      {/* Mock timer widget */}
                      <div className="space-y-1.5">
                        <span className="font-mono text-[8px] text-neutral-500 uppercase font-bold block">SPECIAL REVEAL COUNTDOWN</span>
                        <div className="flex items-center gap-2">
                          <div className="text-center">
                            <span className="font-mono text-xl font-extrabold text-amber-500 bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800 block">
                              02
                            </span>
                            <span className="font-mono text-[8px] text-neutral-500 mt-1 block uppercase">Hrs</span>
                          </div>
                          <span className="font-mono text-lg text-amber-500 font-bold">:</span>
                          <div className="text-center">
                            <span className="font-mono text-xl font-extrabold text-amber-500 bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800 block">
                              45
                            </span>
                            <span className="font-mono text-[8px] text-neutral-500 mt-1 block uppercase">Mins</span>
                          </div>
                          <span className="font-mono text-lg text-amber-500 font-bold">:</span>
                          <div className="text-center">
                            <span className="font-mono text-xl font-extrabold text-amber-500 bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800 block">
                              18
                            </span>
                            <span className="font-mono text-[8px] text-neutral-500 mt-1 block uppercase">Secs</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Wagyu Burger Graphic Stack */}
                    <div className="w-44 h-44 bg-neutral-950/60 rounded-full border border-amber-500/10 flex items-center justify-center shrink-0 relative p-4 shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent blur-xl rounded-full" />
                      <div className="relative w-full flex flex-col justify-end items-center pb-2">
                        <BurgerSvg layerId="bun_bottom" width="100%" />
                        <div className="absolute bottom-[12px] w-full z-10"><BurgerSvg layerId="patty" width="100%" /></div>
                        <div className="absolute bottom-[24px] w-full z-20"><BurgerSvg layerId="cheese" width="100%" /></div>
                        <div className="absolute bottom-[34px] w-full z-30"><BurgerSvg layerId="mushroom" width="100%" /></div>
                        <div className="absolute bottom-[46px] w-full z-40"><BurgerSvg layerId="bun_top" width="100%" /></div>
                      </div>
                    </div>

                  </div>

                  {/* Gold Specs Panel (Col 4) */}
                  <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 text-left">
                    <div className="space-y-3">
                      <span className="font-mono text-[9px] text-neutral-500 uppercase block font-bold">Gold Spec Parameters</span>
                      <div className="space-y-2 font-mono text-xs text-neutral-400">
                        <div className="flex justify-between border-b border-neutral-850 pb-1">
                          <span>Theme Blend</span>
                          <span className="text-amber-400">Amber & Gold</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-850 pb-1">
                          <span>Wagyu Base price</span>
                          <span className="text-white">$22.99</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-850 pb-1">
                          <span>Calorie payload</span>
                          <span className="text-white">930 Kcal</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Preparation Time</span>
                          <span className="text-white">15 Mins</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-850/80 text-[11px] font-sans text-neutral-400 leading-relaxed">
                      <strong>Design Tip:</strong> Use golden border highlights with low alpha values (<code className="font-mono text-amber-500">border-amber-500/20</code>) and dark background backdrops to establish high-end, premium luxury visual vibes.
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION I: MASTERS OF THERMODYNAMIC SEAR (CHEFS CARDS) */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-neutral-900 pb-2">
                  <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                    <Layers className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-xl text-white">Module I: Masters of Thermodynamic Sear (Chef Cards)</h3>
                    <span className="font-mono text-[10px] text-neutral-500">Behind the Grill profile cards, overlay steam effects, typography and layout specs</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Interactive Cards (Col 8) */}
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CHEFS.map((chef, idx) => (
                      <div
                        key={idx}
                        className="group relative bg-neutral-900/30 backdrop-blur-md rounded-3xl border border-neutral-800 p-5 flex flex-col sm:flex-row gap-5 items-center shadow-lg hover:border-neutral-700 transition-all duration-300 text-left overflow-hidden"
                      >
                        {/* Image Frame */}
                        <div className="w-28 h-36 rounded-2xl border border-neutral-800 overflow-hidden shrink-0 relative">
                          <img
                            src={chef.image}
                            alt={chef.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-neutral-950/10 mix-blend-screen opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />
                        </div>

                        <div className="space-y-2 flex-1">
                          <span className="font-mono text-[9px] text-orange-400 tracking-wider uppercase block font-bold">
                            {chef.role}
                          </span>
                          <h4 className="font-sans font-bold text-base text-white">
                            {chef.name}
                          </h4>
                          <p className="font-sans text-neutral-400 text-[11px] font-light leading-relaxed">
                            {chef.bio}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Specs (Col 4) */}
                  <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 text-left space-y-4 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[9px] text-orange-400 uppercase font-bold block">Profile Component Specs</span>
                      <h4 className="font-sans font-bold text-sm text-white mt-1">Dual Layout Design</h4>
                    </div>
                    <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed">
                      These profiles merge high-contrast monochrome tones with vibrant chef portraits and orange status tags to convey culinary authority.
                    </p>
                    <div className="space-y-2 font-mono text-xs text-neutral-400">
                      <div className="flex justify-between border-b border-neutral-850 pb-1">
                        <span>Image Aspect</span>
                        <span className="text-white">w-28 h-36 (Vertical 4:5)</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-850 pb-1">
                        <span>Card Padding</span>
                        <span className="text-white">20px (p-5)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interactive Scale</span>
                        <span className="text-white">Hover: scale-102 (border-glow)</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION J: TIMELINE OF GRILL INNOVATION (STORY CARDS) */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-neutral-900 pb-2">
                  <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-xl text-white">Module J: Story Timeline Component Deconstruction</h3>
                    <span className="font-mono text-[10px] text-neutral-500">Alternating vertical timeline milestones, year node indicator metrics & design rules</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Timeline Render (Col 8) */}
                  <div className="lg:col-span-8 bg-neutral-900/30 border border-neutral-800 rounded-3xl p-6 relative space-y-8">
                    <div className="absolute top-2 right-2 font-mono text-[8px] text-neutral-500">FIGMA SPEC ID: TIMELINE_SYSTEM</div>
                    
                    {/* Vertical line connector */}
                    <div className="absolute left-[34px] top-8 bottom-8 w-[1px] bg-neutral-850" />

                    <div className="space-y-8">
                      {RESTAURANT_STORY.map((story, idx) => (
                        <div key={idx} className="flex gap-6 relative items-start text-left">
                          {/* Circle indicator */}
                          <div className="w-5 h-5 rounded-full bg-orange-600 border-4 border-neutral-950 z-10 shrink-0 mt-1.5 ml-[15px]" />
                          
                          {/* Inner card */}
                          <div className="flex-1 bg-neutral-900 border border-neutral-800/80 p-5 rounded-2xl flex flex-col md:flex-row gap-5 items-center">
                            <div className="flex-1 space-y-1.5">
                              <span className="font-mono text-base font-extrabold text-orange-400">
                                {story.year}
                              </span>
                              <h4 className="font-sans font-bold text-sm text-white">
                                {story.title}
                              </h4>
                              <p className="font-sans text-neutral-400 text-[11px] font-light leading-relaxed">
                                {story.description}
                              </p>
                            </div>
                            <div className="w-24 h-18 rounded-lg overflow-hidden border border-neutral-800 shrink-0">
                              <img src={story.image} alt={story.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specs Table (Col 4) */}
                  <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 text-left space-y-3">
                    <span className="font-mono text-[9px] text-orange-400 uppercase font-bold block">Timeline Layout Specs</span>
                    <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed">
                      Alternates layout orientation dynamically on the main landing screen, while preserving strict semantic connections via the vertical center spine.
                    </p>
                    <div className="space-y-2 font-mono text-xs text-neutral-400">
                      <div className="flex justify-between border-b border-neutral-850 pb-1">
                        <span>Timeline spine</span>
                        <span className="text-white">1px wide (#262626)</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-850 pb-1">
                        <span>Node outer diameter</span>
                        <span className="text-white">20px (w-5 h-5)</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-850 pb-1">
                        <span>Node border thickness</span>
                        <span className="text-white">4px thick black (#0a0a0a)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Spacing Gap</span>
                        <span className="text-white">24px (gap-6)</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION K: WHAT CRITICS SAY (GOURMET TESTIMONIAL CARDS) */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-neutral-900 pb-2">
                  <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                    <Star className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-xl text-white">Module K: Gourmet Testimonial Critic Cards</h3>
                    <span className="font-mono text-[10px] text-neutral-500">Interactive testimonial slider states, rating stars, typography scale and copy specs</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Slider Preview Deck (Col 8) */}
                  <div className="lg:col-span-8 bg-neutral-900/40 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between space-y-8 text-left relative">
                    <div className="absolute top-2 right-2 font-mono text-[8px] text-neutral-500">FIGMA SPEC ID: TESTIMONIAL_CARDS</div>
                    
                    {/* Active Testimonial Card Display */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeReviewIdx}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1">
                          {Array.from({ length: TESTIMONIALS[activeReviewIdx].rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                          ))}
                        </div>

                        {/* Quote Text */}
                        <p className="font-sans text-white text-base font-medium italic leading-relaxed">
                          {TESTIMONIALS[activeReviewIdx].text}
                        </p>

                        {/* Author Profile details */}
                        <div className="flex items-center gap-3">
                          <img 
                            src={TESTIMONIALS[activeReviewIdx].avatar} 
                            alt={TESTIMONIALS[activeReviewIdx].name} 
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full border border-neutral-800 object-cover" 
                          />
                          <div>
                            <h4 className="font-sans font-bold text-xs text-white">
                              {TESTIMONIALS[activeReviewIdx].name}
                            </h4>
                            <span className="font-mono text-[9px] text-orange-400 tracking-wider uppercase block">
                              {TESTIMONIALS[activeReviewIdx].role} • {TESTIMONIALS[activeReviewIdx].date}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Pagination Indicator Controls */}
                    <div className="flex items-center gap-3 border-t border-neutral-850 pt-4 justify-between">
                      <div className="flex items-center gap-1.5">
                        {TESTIMONIALS.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveReviewIdx(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              activeReviewIdx === idx ? 'w-6 bg-orange-500' : 'w-1.5 bg-neutral-800 hover:bg-neutral-750'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase">
                        CRITIC REVIEW STATE {activeReviewIdx + 1} OF {TESTIMONIALS.length}
                      </span>
                    </div>

                  </div>

                  {/* Critic Card Spec Panel (Col 4) */}
                  <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 text-left flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <span className="font-mono text-[9px] text-neutral-500 uppercase block font-bold">Critic Card Parameters</span>
                      <div className="space-y-2 font-mono text-xs text-neutral-400">
                        <div className="flex justify-between border-b border-neutral-850 pb-1">
                          <span>Quote Font Family</span>
                          <span className="text-white">Inter Regular Italic</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-850 pb-1">
                          <span>Quote Font Size</span>
                          <span className="text-white">16px (text-base)</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-850 pb-1">
                          <span>Avatar Sizing</span>
                          <span className="text-white">40px x 40px (w-10 h-10)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Stars Star Icon</span>
                          <span className="text-amber-500">Filled (#f59e0b)</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-850/80 text-[11px] font-sans text-neutral-400 leading-relaxed">
                      <strong>Design Guideline:</strong> Critic testimonials use standard blockquote structures with 5-star validation matrices and high-contrast typography pairings to build solid social trust indicators.
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: DESIGN TOKENS (COLORS, TYPOGRAPHY, ASSETS) */}
          {activeTab === 'tokens' && (
            <motion.div
              key="tokens"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              {/* Color Tokens Palette */}
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-orange-500" />
                  <h3 className="font-sans font-extrabold text-xl text-white">Color Styles Palette</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {COLOR_TOKENS.map((c, idx) => (
                    <div 
                      key={idx}
                      onClick={() => copyToClipboard(c.hex, c.name)}
                      className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-4.5 space-y-4 hover:border-neutral-700 transition-all cursor-pointer relative overflow-hidden"
                    >
                      <div className={`h-16 w-full rounded-xl ${c.tailwind} border border-white/5 flex items-center justify-end p-2`}>
                        <Copy className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-sans font-bold text-sm text-white block">{c.name}</span>
                        <div className="flex justify-between items-center font-mono text-[11px] text-neutral-500">
                          <span>{c.hex}</span>
                          <span className="text-orange-400/80">{c.tailwind}</span>
                        </div>
                        <p className="font-sans text-neutral-400 text-[11px] font-light pt-1 leading-relaxed">
                          {c.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography Scale */}
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <Type className="w-5 h-5 text-orange-500" />
                  <h3 className="font-sans font-extrabold text-xl text-white">Typography Scaling System</h3>
                </div>
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 space-y-4 divide-y divide-neutral-800/80">
                  {TYPO_TOKENS.map((t, idx) => (
                    <div key={idx} className={`pt-4 first:pt-0 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left`}>
                      <div className="space-y-1 md:max-w-xs">
                        <span className="font-sans font-bold text-sm text-white block">{t.name}</span>
                        <div className="font-mono text-[10px] text-neutral-500 space-y-0.5">
                          <div>Font Family: {t.family}</div>
                          <div>Font Size: {t.size}</div>
                          <div>Weight: {t.weight}</div>
                          <div>Letter Spacing: {t.tracking}</div>
                        </div>
                      </div>
                      <div className="flex-1 font-sans text-right md:pr-4 overflow-hidden truncate">
                        <span className={`block truncate ${
                          t.name === 'Display Title Lg' ? 'font-sans font-black text-3xl text-white tracking-tight' :
                          t.name === 'Section Header Md' ? 'font-sans font-extrabold text-xl text-orange-400' :
                          t.name === 'Card Title Sm' ? 'font-sans font-extrabold text-lg text-white' :
                          t.name === 'Component Label' ? 'font-sans font-bold text-sm uppercase tracking-wider text-orange-400' :
                          t.name === 'Gourmet Body Regular' ? 'font-sans text-sm text-neutral-300' :
                          'font-mono text-xs text-emerald-400 font-medium'
                        }`}>
                          {t.sample}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asset Library Directory */}
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-orange-500" />
                  <h3 className="font-sans font-extrabold text-xl text-white">Photorealistic Component Layer Assets</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
                  {['bun_top', 'patty', 'cheese', 'lettuce', 'tomato', 'bacon', 'sauce'].map((layerId, idx) => {
                    const ing = INGREDIENTS.find(i => i.id === layerId) || { name: layerId.toUpperCase() };
                    return (
                      <div 
                        key={idx}
                        className="bg-neutral-900 border border-neutral-800/80 rounded-2xl p-3 flex flex-col items-center justify-between text-center space-y-3"
                      >
                        <div className="w-16 h-16 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-center overflow-hidden">
                          <div className="scale-125 w-14 h-14 flex items-center justify-center">
                            <BurgerSvg layerId={layerId} width="100%" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="font-sans font-bold text-[10px] text-white block truncate">{ing.name}</span>
                          <span className="font-mono text-[8px] text-neutral-500 block uppercase">{layerId}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: INTERACTIVE ATOMS STATE MACHINE */}
          {activeTab === 'atoms' && (
            <motion.div
              key="atoms"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
            >
              {/* Primary Buttons states */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6">
                <div>
                  <h4 className="font-sans font-bold text-base text-white">Component: Primary Buttons Deck</h4>
                  <span className="font-mono text-[10px] text-neutral-500">CTA button statuses</span>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="font-mono text-[9px] text-neutral-500 uppercase block">Normal State</span>
                    <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white font-sans font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2">
                      <span>Dispatch To Kitchen</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-mono text-[9px] text-orange-400 uppercase block">Hover Glow Active State</span>
                    <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white font-sans font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_12px_30px_rgba(249,115,22,0.35)] scale-[1.01] border border-orange-400/40">
                      <span>Dispatch To Kitchen</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-mono text-[9px] text-neutral-500 uppercase block">Disabled State</span>
                    <button disabled className="w-full py-3.5 rounded-xl bg-neutral-850 text-neutral-500 border border-neutral-800 font-sans font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 opacity-60">
                      <span>Dispatch To Kitchen</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quantity selectors & Badges matrix */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-6">
                <div>
                  <h4 className="font-sans font-bold text-base text-white">Component: Counter & Badge Matrix</h4>
                  <span className="font-mono text-[10px] text-neutral-500">Mini incrementors and metadata indicators</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] text-neutral-500 uppercase block">Quantity Controls</span>
                    <div className="flex items-center gap-3 bg-neutral-950 p-1.5 rounded-xl border border-neutral-800/80 w-fit">
                      <button className="p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"><Minus className="w-3 h-3" /></button>
                      <span className="font-mono text-xs font-bold text-white px-2">1</span>
                      <button className="p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-orange-400 border border-neutral-800"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="font-mono text-[9px] text-neutral-500 uppercase block">Interactive Pill Toggles</span>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] font-bold w-fit">
                        <Check className="w-3 h-3" /> EXTRA BACON
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[9px] font-bold w-fit">
                        <Trash2 className="w-3 h-3" /> NO PICKLES
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase block">Dynamic Energy Dial Stats</span>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/60 text-center space-y-1">
                      <span className="font-mono text-[10px] text-orange-400 font-bold block">840 Kcal</span>
                      <span className="font-sans text-[8px] text-neutral-500 uppercase">Thermal Value</span>
                    </div>
                    <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/60 text-center space-y-1">
                      <span className="font-mono text-[10px] text-amber-500 font-bold block">15 Min</span>
                      <span className="font-sans text-[8px] text-neutral-500 uppercase">Sear Duration</span>
                    </div>
                    <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/60 text-center space-y-1">
                      <span className="font-mono text-[10px] text-emerald-400 font-bold block">98%</span>
                      <span className="font-sans text-[8px] text-neutral-500 uppercase">Acclaim Score</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: FIGMA PROTOTYPING SMART-ANIMATE TIPS */}
          {activeTab === 'prototype' && (
            <motion.div
              key="prototype"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 text-left"
            >
              <div className="bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
                  <h3 className="font-sans font-extrabold text-xl text-white">How to Set Up Animated Prototype in Figma</h3>
                </div>

                <p className="font-sans text-neutral-300 text-xs leading-relaxed font-light">
                  To recreate the premium scroll-cooking animation, layout transitions, and interactive slide transitions in Figma, you can utilize Figma's native **Smart Animate** feature. Follow this express workflow:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  
                  {/* Step 1 */}
                  <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-850 space-y-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center font-mono text-xs font-bold text-orange-400">
                      1
                    </div>
                    <span className="font-sans font-bold text-sm text-white block">Layer Structure Match</span>
                    <p className="font-sans text-neutral-500 text-[11px] leading-relaxed">
                      Make sure that every individual burger layer image retains the exact same layer name (e.g. <code className="font-mono text-orange-400 bg-neutral-900 px-1 py-0.5 rounded text-[10px]">#bun_top</code>, <code className="font-mono text-orange-400 bg-neutral-900 px-1 py-0.5 rounded text-[10px]">#beef_patty</code>) across both starting and ending frames in Figma.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-850 space-y-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center font-mono text-xs font-bold text-orange-400">
                      2
                    </div>
                    <span className="font-sans font-bold text-sm text-white block">Exploded Offsets</span>
                    <p className="font-sans text-neutral-500 text-[11px] leading-relaxed">
                      In your start frame, position the layers far apart vertically and set their opacity to 0%. In the destination frame, gather them closely stacked together at 100% opacity.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-850 space-y-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center font-mono text-xs font-bold text-orange-400">
                      3
                    </div>
                    <span className="font-sans font-bold text-sm text-white block">Spring Prototype Curve</span>
                    <p className="font-sans text-neutral-500 text-[11px] leading-relaxed">
                      Connect your frames with the <strong className="text-white font-medium">On Scroll</strong> or <strong className="text-white font-medium">On Click</strong> trigger. Select <strong className="text-white font-medium">Smart Animate</strong> and set the easing curve to <strong className="text-orange-400">Custom Spring</strong> (e.g. Mass: 1, Stiffness: 180, Damping: 24) to emulate our physics-driven bounce.
                    </p>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
};
