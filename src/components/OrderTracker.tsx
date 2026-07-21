import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, CreditCard, Sparkles, Smartphone, ArrowRight,
  Flame, Clock, ShoppingBag, Truck, Gift, ClipboardCheck,
  RotateCcw, ShieldCheck, CheckCircle2, ChevronRight
} from 'lucide-react';
import { OrderStatus, OrderStatusStep } from '../types';

interface OrderTrackerProps {
  cartSubtotal: number;
  onOrderCompleted: () => void;
  onResetOrder: () => void;
}

// Complete 9-step timeline configuration
const STATUS_TIMELINE_STEPS: { step: OrderStatusStep; label: string; desc: string; icon: any }[] = [
  { step: 'confirmed', label: 'Order Confirmed', desc: 'Sizzle registers digital ticket validation. Kitchen allocated.', icon: CheckCircle2 },
  { step: 'preparing', label: 'Ingredients Sourced', desc: 'Hand-selecting fresh butter lettuce, sweet Vidalias, and heirloom tomatoes.', icon: Clock },
  { step: 'cooking', label: 'Grill Started', desc: '500°F cast iron sear initiates. Angus patty dropped on flames.', icon: Flame },
  { step: 'assembling', label: 'Artisan Assembly', desc: 'Layer stacking process completed according to customization recipes.', icon: ClipboardCheck },
  { step: 'quality_check', label: 'Quality Audit', desc: 'Chef verifies structural alignment, moisture ratio, and cheese melt.', icon: Check },
  { step: 'packed', label: 'Insulated Packing', desc: 'Slipped into specialized steam-vented craft boxes to lock moisture.', icon: Gift },
  { step: 'ready', label: 'Ready for Pickup', desc: 'Rested and waiting at the warm-pass station for carrier pickup.', icon: ShoppingBag },
  { step: 'delivering', label: 'Out for Delivery', desc: 'Fired up on standard courier route. Hot thermal bag locked.', icon: Truck },
  { step: 'delivered', label: 'Delivered', desc: 'Safely placed at door. Maillard aroma released. Feast begins!', icon: Sparkles },
];

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  cartSubtotal,
  onOrderCompleted,
  onResetOrder,
}) => {
  // Phase toggler
  const [checkoutPhase, setCheckoutPhase] = useState<'billing' | 'processing' | 'tracking'>('billing');
  
  // Card credentials state
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardFocused, setCardFocused] = useState(false);

  // Tracking timeline state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Automatically advance steps for beautiful cinematic timeline simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (checkoutPhase === 'tracking') {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= STATUS_TIMELINE_STEPS.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 5000); // 5 seconds per step progress
    }
    return () => clearInterval(interval);
  }, [checkoutPhase]);

  // Handle billing payment submission
  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutPhase('processing');

    setTimeout(() => {
      setCheckoutPhase('tracking');
    }, 2800); // 2.8 seconds simulated payment processing
  };

  // Skip simulation helper
  const handleAdvanceStep = () => {
    if (currentStepIndex < STATUS_TIMELINE_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleRegressionStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const activeStepMeta = STATUS_TIMELINE_STEPS[currentStepIndex];

  return (
    <section id="checkout-tracker" className="relative w-full bg-neutral-950 py-24 px-4 border-b border-neutral-900 overflow-hidden">
      
      {/* Ambient background rays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-orange-600/5 blur-[120px]" />
        <div className="absolute bottom-[30%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-red-600/5 blur-[130px]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto z-10">
        
        {/* Header section */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-orange-500 tracking-widest uppercase block mb-2">
            STORY STEP III: CHEST & TIMELINE
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Order Dispatch Portal
          </h2>
          <p className="font-sans text-neutral-400 text-sm mt-3 font-light leading-relaxed">
            Validate secure credit checkout to dispatch your personalized grill blueprint. Follow the live-updating timeline as the kitchen sparks rise and delivery starts.
          </p>
        </div>

        <AnimatePresence mode="wait">
          
          {/* PHASE 1: Payment Checkout Card Deck */}
          {checkoutPhase === 'billing' && (
            <motion.div
              key="billing"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto"
            >
              {/* LEFT: Digital Luxury Credit Card Illustration (Lg: Col-5) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
                
                {/* 3D-Like Credit Card Container */}
                <motion.div
                  animate={{ rotateY: cardFocused ? 15 : 0, rotateX: cardFocused ? -5 : 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="relative w-full max-w-[340px] aspect-[1.58/1] rounded-2xl bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-neutral-700/60 p-6 flex flex-col justify-between shadow-[0_20px_45px_rgba(0,0,0,0.85)] overflow-hidden text-left"
                >
                  {/* Glowing card internal accents */}
                  <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-orange-600/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[9px] text-orange-400 tracking-widest uppercase block">
                        CRAFT BANK
                      </span>
                      <span className="font-sans font-bold text-xs text-white">THE FOUNDRY BLACK CARD</span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-mono text-[11px] font-bold">
                      FD
                    </div>
                  </div>

                  {/* Card Chip */}
                  <div className="w-9 h-7 rounded-md bg-gradient-to-br from-amber-400/80 to-amber-600/80 border border-amber-300/40 relative overflow-hidden">
                    <div className="absolute top-[20%] left-0 w-full h-[1px] bg-neutral-900" />
                    <div className="absolute bottom-[20%] left-0 w-full h-[1px] bg-neutral-900" />
                    <div className="absolute top-0 left-[30%] w-[1px] h-full bg-neutral-900" />
                    <div className="absolute top-0 right-[30%] w-[1px] h-full bg-neutral-900" />
                  </div>

                  {/* Card Number display with fallbacks */}
                  <div className="font-mono text-base tracking-[0.15em] text-white">
                    {cardNumber || '••••  ••••  ••••  ••••'}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[8px] text-neutral-500 uppercase block">Card Holder</span>
                      <span className="font-sans text-xs text-neutral-300 font-medium truncate max-w-[150px] block">
                        {cardHolder.toUpperCase() || 'CULINARY CLIENT'}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono text-[8px] text-neutral-500 uppercase block">Expires</span>
                      <span className="font-mono text-xs text-neutral-300 block">
                        {cardExpiry || 'MM/YY'}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono text-[8px] text-neutral-500 uppercase block">CVV</span>
                      <span className="font-mono text-xs text-neutral-300 block">
                        {cardCvv || '•••'}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Sizzle cost summary card */}
                <div className="w-full max-w-[340px] bg-neutral-900/40 backdrop-blur-md rounded-2xl border border-neutral-800 p-5 space-y-3">
                  <span className="font-mono text-[9px] text-neutral-500 tracking-wider uppercase block border-b border-neutral-800 pb-2">
                    Final Ticket Invoice
                  </span>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans text-neutral-400">Gourmet Subtotal</span>
                    <span className="font-mono text-neutral-300">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans text-neutral-400">Luxury Sizzle Service</span>
                    <span className="font-mono text-emerald-400">FREE</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-neutral-800 pt-2 font-bold">
                    <span className="font-sans text-white">Authorized Dispatch Total</span>
                    <span className="font-mono text-base text-orange-400">${cartSubtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: Pay Form (Lg: Col-7) */}
              <form onSubmit={handlePay} className="lg:col-span-7 bg-neutral-900/40 backdrop-blur-md rounded-3xl border border-neutral-800 p-6 sm:p-8 space-y-6 text-left shadow-lg">
                <div className="border-b border-neutral-800 pb-4">
                  <h3 className="font-sans font-bold text-lg text-white">Payment Details</h3>
                  <p className="font-sans text-xs text-neutral-400 mt-1 font-light">
                    Transactions are processed in a simulated secure sandbox for review.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Card Holder Input */}
                  <div>
                    <label className="font-mono text-[10px] text-neutral-400 uppercase block mb-1.5 font-bold">Cardholder Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      onFocus={() => setCardFocused(true)}
                      onBlur={() => setCardFocused(false)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all font-sans"
                    />
                  </div>

                  {/* Card Number Input */}
                  <div>
                    <label className="font-mono text-[10px] text-neutral-400 uppercase block mb-1.5 font-bold">Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        maxLength={19}
                        placeholder="1234  5678  9012  3456"
                        value={cardNumber}
                        onChange={(e) => {
                          // basic spacing formatter for card digits
                          const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                          const formatted = val.match(/.{1,4}/g)?.join('  ') || val;
                          setCardNumber(formatted);
                        }}
                        onFocus={() => setCardFocused(true)}
                        onBlur={() => setCardFocused(false)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all font-mono"
                      />
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-500" />
                    </div>
                  </div>

                  {/* Expiry & CVV Double columns */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] text-neutral-400 uppercase block mb-1.5 font-bold">Expiration Date</label>
                      <input 
                        type="text" 
                        required
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          if (val.length >= 2) {
                            setCardExpiry(val.slice(0,2) + '/' + val.slice(2,4));
                          } else {
                            setCardExpiry(val);
                          }
                        }}
                        onFocus={() => setCardFocused(true)}
                        onBlur={() => setCardFocused(false)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-neutral-400 uppercase block mb-1.5 font-bold">Security Code (CVV)</label>
                      <input 
                        type="password" 
                        required
                        maxLength={3}
                        placeholder="***"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
                        onFocus={() => setCardFocused(true)}
                        onBlur={() => setCardFocused(false)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Secure certificate */}
                <div className="flex gap-2.5 items-center px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-[10px] text-neutral-500 font-sans font-light">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Secure Sandbox Mode: No real funds or sensitive details will be saved or processed.</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white font-sans font-bold text-xs tracking-widest uppercase shadow-[0_10px_25px_rgba(249,115,22,0.2)] hover:shadow-[0_15px_35px_rgba(249,115,22,0.4)] hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Authorize & Fire Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}

          {/* PHASE 2: Billing Processing State */}
          {checkoutPhase === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-md mx-auto bg-neutral-900 border border-neutral-800 rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-6 shadow-2xl"
            >
              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Triple loading rings */}
                <div className="absolute inset-0 rounded-full border-4 border-orange-500/10 border-t-orange-500 animate-spin" />
                <div className="absolute inset-2.5 rounded-full border-4 border-red-500/10 border-t-red-500 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
                <Flame className="w-8 h-8 text-orange-400 animate-pulse" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[10px] text-orange-400 tracking-widest uppercase block">
                  DIGITAL SECURITY GATEWAY
                </span>
                <h4 className="font-sans font-extrabold text-lg text-white">Validating Vault Tokens</h4>
                <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed max-w-xs mx-auto">
                  Authorizing credit lines, communicating coordinate tables to cooking stations, and preheating ovens...
                </p>
              </div>

              {/* Mock terminal log lines */}
              <div className="w-full bg-black/60 p-3 rounded-xl border border-neutral-800 font-mono text-[9px] text-left text-neutral-500 space-y-1">
                <div>&gt; AUTH_REQUESTED: SANDBOX_CLIENT</div>
                <div>&gt; INVOICE_SYNC: ${cartSubtotal.toFixed(2)}</div>
                <div className="text-orange-400 animate-pulse">&gt; GRILL_VECTORS: INITIALIZING_BURNERS_PORT_3000</div>
              </div>
            </motion.div>
          )}

          {/* PHASE 3: Live Cinematic Tracking Timeline */}
          {checkoutPhase === 'tracking' && (
            <motion.div
              key="tracking"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              
              {/* Dynamic Step Details Billboard */}
              <div className="bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                <div className="flex gap-5 items-start text-left">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                    <activeStepMeta.icon className="w-7 h-7 animate-pulse" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-orange-500 tracking-wider uppercase block mb-1">
                      CURRENT STAGE {currentStepIndex + 1} OF 9
                    </span>
                    <h3 className="font-sans font-extrabold text-2xl text-white tracking-tight flex items-center gap-3">
                      {activeStepMeta.label}
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                    </h3>
                    <p className="font-sans text-neutral-400 text-xs mt-2 font-light leading-relaxed">
                      {activeStepMeta.desc}
                    </p>
                  </div>
                </div>

                {/* Sandbox Timeline Speed-Up Trigger Panel */}
                <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800/80 p-2 rounded-xl shrink-0 w-full md:w-auto justify-center">
                  <button 
                    onClick={handleRegressionStep} 
                    disabled={currentStepIndex === 0}
                    className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:text-white disabled:opacity-20 cursor-pointer"
                  >
                    Back
                  </button>
                  <span className="font-mono text-[10px] text-neutral-400 uppercase font-bold px-3">
                    Stage Control
                  </span>
                  <button 
                    onClick={handleAdvanceStep} 
                    disabled={currentStepIndex === STATUS_TIMELINE_STEPS.length - 1}
                    className="p-2.5 rounded-lg bg-orange-600/20 border border-orange-500/40 text-orange-400 disabled:opacity-20 hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Progress Horizontal Bar Line */}
              <div className="relative w-full h-1.5 bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 shadow-[0_0_10px_#f97316]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(currentStepIndex / (STATUS_TIMELINE_STEPS.length - 1)) * 100}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              {/* Nine Horizontal Steppers (Grid layout for timelines) */}
              <div className="grid grid-cols-3 sm:grid-cols-9 gap-3">
                {STATUS_TIMELINE_STEPS.map((step, idx) => {
                  const isActive = idx === currentStepIndex;
                  const isCompleted = idx < currentStepIndex;
                  const StepIcon = step.icon;

                  return (
                    <div 
                      key={step.step}
                      onClick={() => setCurrentStepIndex(idx)}
                      className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between min-h-[90px] transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? 'bg-orange-600/10 border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.15)]' 
                          : isCompleted 
                          ? 'bg-neutral-900/60 border-neutral-800 text-orange-400/80 hover:border-neutral-700' 
                          : 'bg-neutral-950/20 border-neutral-900/40 text-neutral-600 hover:text-neutral-400'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono font-bold shrink-0 transition-all ${
                        isActive 
                          ? 'bg-orange-500 text-white' 
                          : isCompleted 
                          ? 'bg-neutral-800 text-orange-400' 
                          : 'bg-neutral-900 text-neutral-700'
                      }`}>
                        {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                      </div>

                      <span className="font-sans text-[9px] font-bold tracking-wider uppercase block mt-2 line-clamp-1">
                        {step.label.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Finished Feast Alert */}
              {currentStepIndex === STATUS_TIMELINE_STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-neutral-900 border border-emerald-500/30 p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_15px_35px_rgba(16,185,129,0.1)]"
                >
                  <div className="flex gap-4 items-center text-left">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-lg text-white">Culinary Feast Delivered!</h4>
                      <p className="font-sans text-neutral-400 text-xs font-light mt-1">
                        Your custom-crafted grill masterpiece has completed safe transit. Savor the warm hickory aromatics!
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto shrink-0">
                    <button
                      onClick={onResetOrder}
                      className="flex-1 sm:flex-initial py-3 px-5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white font-mono text-xs uppercase cursor-pointer"
                    >
                      Cook Another
                    </button>
                    <button
                      onClick={onOrderCompleted}
                      className="flex-1 sm:flex-initial py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-sans font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Complete Journey
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
