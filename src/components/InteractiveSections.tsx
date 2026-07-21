import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, Quote, Clock, Sparkles, Trophy, ShieldCheck, 
  ChevronLeft, ChevronRight, MapPin, Mail, Phone, Calendar, Flame
} from 'lucide-react';
import { TESTIMONIALS, CHEFS, RESTAURANT_STORY, BURGERS } from '../data';
import { BurgerSvg } from './BurgerSvg';

// Why Choose Us brand pillars configuration
const BENEFITS = [
  {
    id: 'flame',
    title: '500° Flame-Grilled Perfection',
    desc: 'We sear our chuck-rib grinds exclusively over live hickory fire to capture true flame aromas.',
    icon: Flame,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'source',
    title: 'Heritage Marbled Grinds',
    desc: 'Proprietary custom ratio (Chuck, short-rib, bone-marrow) dry-aged for 21 days before smash.',
    icon: Trophy,
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'produce',
    title: 'Locally Sourced Produce',
    desc: 'Crisp green butter lettuces and vine tomato wheels organic-harvested and delivered daily.',
    icon: ShieldCheck,
    color: 'from-emerald-500 to-teal-600'
  }
];

export const InteractiveSections: React.FC = () => {
  // Testimonials slider tracker
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // Limited Time Countdown Timer logic
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Restart to preserve visual loop on sandbox
          return { hours: 14, minutes: 32, seconds: 45 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="w-full bg-neutral-950">
      
      {/* 1. WHY CHOOSE US */}
      <section className="relative w-full py-24 px-4 border-b border-neutral-900 overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="font-mono text-xs text-orange-500 tracking-widest uppercase block mb-2">
              OUR CULINARY MANIFESTO
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-none">
              Built on Three <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Uncompromising Pillars.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.id}
                  className="group relative p-8 bg-neutral-900/20 backdrop-blur-md rounded-3xl border border-neutral-800/80 hover:border-orange-500/20 shadow-lg hover:shadow-[0_15px_35px_rgba(249,115,22,0.05)] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orange-500/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white mb-6 shadow-md`}>
                    <Icon className="w-5.5 h-5.5" />
                  </div>

                  <h3 className="font-sans font-bold text-lg text-white mb-3">
                    {b.title}
                  </h3>
                  <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. LIMITED TIME SPECIAL COUNTDOWN TIMER */}
      <section className="relative w-full py-24 px-4 border-b border-neutral-900 overflow-hidden">
        {/* Glow backdrop gold-leaf */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-amber-500/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative w-full max-w-5xl mx-auto z-10 bg-gradient-to-r from-neutral-900 to-neutral-950 border border-amber-500/20 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 text-left shadow-[0_20px_50px_rgba(245,158,11,0.08)]">
          <div className="space-y-6 lg:max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Limited-Time Gold Special
            </div>

            <h3 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              The Black Truffle <br />
              Wagyu Gold Masterpiece.
            </h3>

            <p className="font-sans text-neutral-400 text-xs leading-relaxed font-light">
              Featuring organic A5 Japanese Wagyu rib eye blends, double slices of hand-crafted gold-leaf, roasted chanterelle reductions, and shaved black Périgord truffles on butter-basted artisan potato dough crown. Only available for the next active shift cycle.
            </p>

            {/* Countdown Clock UI */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <span className="font-mono text-3xl font-extrabold text-white bg-neutral-950 px-4.5 py-3 rounded-2xl border border-neutral-800 block">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider mt-1.5 block">Hours</span>
              </div>
              <span className="font-mono text-2xl text-amber-500 font-bold">:</span>
              <div className="text-center">
                <span className="font-mono text-3xl font-extrabold text-white bg-neutral-950 px-4.5 py-3 rounded-2xl border border-neutral-800 block">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider mt-1.5 block">Mins</span>
              </div>
              <span className="font-mono text-2xl text-amber-500 font-bold">:</span>
              <div className="text-center">
                <span className="font-mono text-3xl font-extrabold text-amber-500 bg-neutral-950 px-4.5 py-3 rounded-2xl border border-neutral-800/80 block">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider mt-1.5 block">Secs</span>
              </div>
            </div>
          </div>

          {/* Interactive visual model preview of Special */}
          <div className="relative w-full max-w-[240px] aspect-square flex items-center justify-center shrink-0">
            <div className="absolute w-[80%] h-[80%] bg-amber-500/10 blur-[50px] rounded-full" />
            <div className="relative w-full flex flex-col justify-end items-center pb-2">
              <BurgerSvg layerId="bun_bottom" width="100%" />
              <div className="absolute bottom-[14px] w-full z-10"><BurgerSvg layerId="patty" width="100%" /></div>
              <div className="absolute bottom-[28px] w-full z-20"><BurgerSvg layerId="cheese" width="100%" /></div>
              <div className="absolute bottom-[40px] w-full z-30"><BurgerSvg layerId="mushroom" width="100%" /></div>
              <div className="absolute bottom-[52px] w-full z-40"><BurgerSvg layerId="bun_top" width="100%" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BEHIND THE GRILL (CHEFS) */}
      <section className="relative w-full py-24 px-4 border-b border-neutral-900 overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="font-mono text-xs text-orange-500 tracking-widest uppercase block mb-2">
              BEHIND THE GRILL
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-none">
              The Masters of <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Thermodynamic Sear.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto items-stretch">
            {CHEFS.map((chef, idx) => (
              <div
                key={idx}
                className="group relative bg-neutral-900/20 backdrop-blur-md rounded-3xl border border-neutral-800 p-6 flex flex-col md:flex-row gap-6 items-center shadow-lg hover:border-neutral-700 transition-all duration-300 text-left overflow-hidden"
              >
                {/* Image and overlay steam effects */}
                <div className="w-32 h-40 rounded-2xl border border-neutral-800 overflow-hidden shrink-0 relative">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle grey smoke layer on hover */}
                  <div className="absolute inset-0 bg-neutral-950/10 mix-blend-screen opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none" />
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-[9px] text-orange-400 tracking-wider uppercase block">
                    {chef.role}
                  </span>
                  <h4 className="font-sans font-bold text-lg text-white">
                    {chef.name}
                  </h4>
                  <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed">
                    {chef.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STORY MILESTONES (RESTAURANT STORY) */}
      <section className="relative w-full py-24 px-4 border-b border-neutral-900 overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="font-mono text-xs text-orange-500 tracking-widest uppercase block mb-2">
              STORY TIMELINE: THE GENESIS
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-none">
              A Timeline of <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Grill Innovation.
              </span>
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Timeline line for large view */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-neutral-800" />

            <div className="space-y-12">
              {RESTAURANT_STORY.map((story, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row items-stretch gap-6 relative ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Circle Node Indicator */}
                    <div className="absolute left-[20px] md:left-1/2 -translate-x-[9.5px] w-5 h-5 rounded-full bg-orange-600 border-4 border-neutral-950 z-20 top-6" />

                    {/* Timeline card column */}
                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 text-left">
                      <div className="p-6 bg-neutral-900/30 backdrop-blur-md border border-neutral-800/80 rounded-2xl shadow-lg">
                        <span className="font-mono text-lg font-extrabold text-orange-400">
                          {story.year}
                        </span>
                        <h4 className="font-sans font-bold text-lg text-white mt-1.5 mb-2">
                          {story.title}
                        </h4>
                        <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed">
                          {story.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Image column */}
                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 flex items-center justify-center">
                      <div className="w-full h-44 rounded-2xl border border-neutral-800/80 overflow-hidden shadow-md">
                        <img
                          src={story.image}
                          alt={story.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. GOURMET TESTIMONIALS */}
      <section className="relative w-full py-24 px-4 border-b border-neutral-900 overflow-hidden">
        <div className="relative w-full max-w-5xl mx-auto z-10 text-center space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs text-orange-500 tracking-widest uppercase block mb-2">
              WHAT CRITICS SAY
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-none">
              Acclaim from the Table.
            </h2>
          </div>

          {/* Stagger slide testimonial */}
          <div className="relative bg-neutral-900/20 backdrop-blur-md rounded-3xl border border-neutral-800 p-8 sm:p-12 max-w-3xl mx-auto shadow-xl">
            <div className="absolute top-6 left-6 text-neutral-800 pointer-events-none">
              <Quote className="w-16 h-16" />
            </div>

            <div className="relative min-h-[160px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReviewIdx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <p className="font-sans text-lg sm:text-xl text-neutral-200 leading-relaxed italic font-light">
                    {TESTIMONIALS[activeReviewIdx].text}
                  </p>

                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-neutral-800 overflow-hidden">
                      <img
                        src={TESTIMONIALS[activeReviewIdx].avatar}
                        alt={TESTIMONIALS[activeReviewIdx].name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <span className="font-sans font-bold text-sm text-white block">
                        {TESTIMONIALS[activeReviewIdx].name}
                      </span>
                      <span className="font-sans text-neutral-500 text-xs block font-light">
                        {TESTIMONIALS[activeReviewIdx].role} &bull; {TESTIMONIALS[activeReviewIdx].date}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls */}
              <div className="flex justify-center items-center gap-3 mt-8">
                <button
                  onClick={handlePrevReview}
                  className="p-2.5 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex gap-1.5">
                  {TESTIMONIALS.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === activeReviewIdx ? 'bg-orange-500 w-4' : 'bg-neutral-800'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextReview}
                  className="p-2.5 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER & CONTACT FOOTER */}
      <footer className="relative w-full py-20 px-4 bg-black border-t border-neutral-900/85">
        <div className="relative w-full max-w-7xl mx-auto z-10 grid grid-cols-1 md:grid-cols-4 gap-12 text-left items-start">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                <Flame className="w-4.5 h-4.5" />
              </div>
              <span className="font-sans font-extrabold text-base tracking-wider text-white uppercase">
                The Foundry
              </span>
            </div>
            <p className="font-sans text-neutral-500 text-xs font-light leading-relaxed">
              Premium flame-grilled gastronomy engineered with precise heat, premium dry-aged Chuck blends, and handcrafted brioche buns. Sizzle is our language.
            </p>
          </div>

          {/* Locations & Opening hours */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-xs text-neutral-400 uppercase tracking-widest border-b border-neutral-900 pb-2">
              Grill Locations
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-500 font-sans font-light">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>120 Sizzle Blvd, San Francisco, CA</span>
              </div>
              <div className="flex gap-2">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Mon - Sun: 11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+1 (415) 555-SEAR</span>
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-xs text-neutral-400 uppercase tracking-widest border-b border-neutral-900 pb-2">
              Craft Navigation
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-500 font-sans font-light">
              <a href="#hero" className="block hover:text-orange-400 transition-colors">Hero Entry</a>
              <a href="#scroll-cooking" className="block hover:text-orange-400 transition-colors">Assembly Timeline</a>
              <a href="#menu-showcase" className="block hover:text-orange-400 transition-colors">Grill Blueprints</a>
              <a href="#checkout-tracker" className="block hover:text-orange-400 transition-colors">Dispatch Tracker</a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4 md:col-span-1">
            <h4 className="font-sans font-bold text-xs text-neutral-400 uppercase tracking-widest border-b border-neutral-900 pb-2">
              Join the Hearth
            </h4>
            <p className="font-sans text-neutral-500 text-xs font-light leading-relaxed">
              Subscribe to unlock seasonal limited-run secret recipes, priority waitlists, and private chef's tables.
            </p>

            <div className="flex gap-2 bg-neutral-900 rounded-xl border border-neutral-800 p-1">
              <input
                type="email"
                placeholder="chef@hearth.com"
                className="flex-1 bg-transparent border-none text-xs text-white placeholder-neutral-600 focus:outline-none px-3 py-2 font-mono"
              />
              <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-sans text-[10px] font-bold uppercase rounded-lg transition-colors cursor-pointer">
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright plate */}
        <div className="relative w-full max-w-7xl mx-auto z-10 border-t border-neutral-900/80 mt-16 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-neutral-600 font-mono">
          <span>&copy; 2026 THE FOUNDRY CULINARY GROUP. ALL RIGHTS GRILLED.</span>
          <span>CRAFTED FOR CINEMATIC ADVERTISEMENT &bull; PORT: 3000</span>
        </div>
      </footer>
    </div>
  );
};
