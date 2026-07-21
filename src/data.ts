import { Ingredient, BurgerProduct, Testimonial, Chef, StoryMilestone } from './types';

// The canonical list of ingredients used in the interactive stacking and customization systems
export const INGREDIENTS: Ingredient[] = [
  { id: 'bun_bottom', name: 'Toasted Brioche Bun (Bottom)', price: 0.5, calories: 120, color: '#D4A373', category: 'bun' },
  { id: 'patty', name: 'Angus Beef Patty', price: 2.5, calories: 280, color: '#5C3D2E', category: 'patty' },
  { id: 'cheese', name: 'Melted Cheddar Cheese', price: 1.0, calories: 110, color: '#FFB703', category: 'cheese' },
  { id: 'lettuce', name: 'Crisp Butter Lettuce', price: 0.4, calories: 5, color: '#70E000', category: 'veggie' },
  { id: 'tomato', name: 'Vine-Ripened Tomato Slice', price: 0.5, calories: 10, color: '#EF233C', category: 'veggie' },
  { id: 'onion', name: 'Caramelized Sweet Onion', price: 0.4, calories: 15, color: '#9B5DE5', category: 'veggie' },
  { id: 'pickles', name: 'Dill Pickle Ribbons', price: 0.3, calories: 5, color: '#386641', category: 'veggie' },
  { id: 'sauce', name: 'House Signature Sauce', price: 0.5, calories: 90, color: '#D00000', category: 'sauce' },
  { id: 'bun_top', name: 'Toasted Brioche Bun (Top)', price: 0.5, calories: 140, color: '#C68B59', category: 'bun' },
  
  // Customization-only ingredients
  { id: 'bacon', name: 'Applewood Smoked Bacon', price: 1.8, calories: 95, color: '#A06A42', category: 'premium' },
  { id: 'mushroom', name: 'Sautéed Wild Mushrooms', price: 1.2, calories: 45, color: '#8E7C70', category: 'premium' },
  { id: 'jalapenos', name: 'Pickled Jalapeños', price: 0.5, calories: 8, color: '#4E8A3C', category: 'veggie' },
  { id: 'egg', name: 'Organic Sunny-Side Up Egg', price: 1.5, calories: 80, color: '#FFE169', category: 'premium' },
  { id: 'onion_rings', name: 'Crispy Beer-Battered Onion Rings', price: 1.4, calories: 130, color: '#B37D4E', category: 'premium' },
];

export const BURGERS: BurgerProduct[] = [
  {
    id: 'classic',
    name: 'The Crown Classic',
    tagline: 'Simple perfection, elevated.',
    description: 'Our standard-setting craft burger. 100% USDA Prime Angus beef, butter lettuce, ripe tomato, house dill pickles, red onion, and our legendary signature burger spread on a perfectly toasted, hand-kneaded brioche bun.',
    basePrice: 12.99,
    rating: 4.8,
    reviewsCount: 342,
    calories: 680,
    prepTimeMin: 10,
    imageSeed: 'classic_burger',
    primaryColor: '#F59E0B',
    ingredients: ['bun_bottom', 'patty', 'cheese', 'lettuce', 'tomato', 'onion', 'pickles', 'sauce', 'bun_top'],
    nutrition: { protein: '42g', carbs: '45g', fat: '34g', sodium: '980mg' },
    drinkPairing: {
      name: 'Craft Amber Ale',
      description: 'A smooth, malty local amber ale that cuts through the rich beef patty.',
      price: 6.50,
      icon: 'Beer',
    }
  },
  {
    id: 'double_cheese',
    name: 'The Double Foundry',
    tagline: 'A double-layered monument to cheese.',
    description: 'For the dedicated cheeselover. Two flame-grilled beef patties smashed to crispy-edged perfection, each layer blanketed in gooey, molten cheddar, double pickles, and dynamic mustard-relish sauce.',
    basePrice: 16.99,
    rating: 4.9,
    reviewsCount: 512,
    calories: 1050,
    prepTimeMin: 12,
    imageSeed: 'double_cheeseburger',
    primaryColor: '#FF6B00',
    ingredients: ['bun_bottom', 'patty', 'cheese', 'patty', 'cheese', 'pickles', 'sauce', 'bun_top'],
    nutrition: { protein: '78g', carbs: '46g', fat: '58g', sodium: '1420mg' },
    drinkPairing: {
      name: 'Vintage Cola Stout',
      description: 'An artisanal dark stout infused with real kola nut extracts and roasted vanilla notes.',
      price: 5.99,
      icon: 'CupSoda',
    }
  },
  {
    id: 'bbq_smokehouse',
    name: 'Smokehouse Bourbon BBQ',
    tagline: 'Saddle up for thick hickory smoke.',
    description: 'Rich, bold, and heavily smoked. Infused with a barrel-aged bourbon barbecue sauce, stack of golden beer-battered onion rings, melted cheddar, crispy applewood smoked bacon, and sweet caramelized onions.',
    basePrice: 15.49,
    rating: 4.7,
    reviewsCount: 289,
    calories: 890,
    prepTimeMin: 13,
    imageSeed: 'bbq_burger',
    primaryColor: '#EF4444',
    ingredients: ['bun_bottom', 'patty', 'cheese', 'bacon', 'onion_rings', 'onion', 'sauce', 'bun_top'],
    nutrition: { protein: '48g', carbs: '58g', fat: '42g', sodium: '1150mg' },
    drinkPairing: {
      name: 'Smoked Bourbon Sour',
      description: 'A high-end craft mocktail featuring charred oak infusion, orange zest, and maple syrup.',
      price: 7.99,
      icon: 'GlassWater',
    }
  },
  {
    id: 'spicy_inferno',
    name: 'Habenero Inferno',
    tagline: 'A beautifully balanced, fiery kick.',
    description: 'Not for the faint of heart. Featuring roasted green chiles, pickled jalapeños, melted pepper jack cheese, crispy fried shallots, and our slow-simmered habanero-cayenne aioli that delivers delicious, glowing heat.',
    basePrice: 14.99,
    rating: 4.6,
    reviewsCount: 204,
    calories: 740,
    prepTimeMin: 11,
    imageSeed: 'spicy_burger',
    primaryColor: '#DC2626',
    ingredients: ['bun_bottom', 'patty', 'cheese', 'jalapenos', 'lettuce', 'tomato', 'sauce', 'bun_top'],
    nutrition: { protein: '44g', carbs: '42g', fat: '38g', sodium: '1280mg' },
    drinkPairing: {
      name: 'Chilled Hibiscus Limeade',
      description: 'A deeply refreshing, floral-tart drink that instantly cools the habanero burn.',
      price: 4.50,
      icon: 'Wine',
    }
  },
  {
    id: 'chicken_glory',
    name: 'Crispy Butter-Fried Chicken',
    tagline: 'Unparalleled golden crunch.',
    description: 'Sublime texture and tenderness. Free-range chicken breast double-brined in buttermilk, fried to a brilliant golden crunch, topped with creamy garlic slaw, sweet pickles, and warm honey mustard.',
    basePrice: 13.99,
    rating: 4.8,
    reviewsCount: 418,
    calories: 710,
    prepTimeMin: 9,
    imageSeed: 'chicken_burger',
    primaryColor: '#3B82F6',
    ingredients: ['bun_bottom', 'lettuce', 'pickles', 'sauce', 'bun_top'], // Representing custom chicken parts elegantly
    nutrition: { protein: '39g', carbs: '49g', fat: '28g', sodium: '920mg' },
    drinkPairing: {
      name: 'Draft India Pale Ale (IPA)',
      description: 'A crisp, piney, tropical-hop forward draft that elevates the savory crunch.',
      price: 6.99,
      icon: 'Beer',
    }
  },
  {
    id: 'veggie_botanist',
    name: 'The Artisan Botanist',
    tagline: 'A gourmet harvest of clean, rich flavor.',
    description: 'A plant-based masterpiece. Our handcrafted grilled portobello and quinoa patty, fire-roasted red bell peppers, creamy avocado mash, organic microgreens, and a vegan chive-lime truffle crema.',
    basePrice: 13.49,
    rating: 4.5,
    reviewsCount: 177,
    calories: 520,
    prepTimeMin: 10,
    imageSeed: 'veggie_burger',
    primaryColor: '#10B981',
    ingredients: ['bun_bottom', 'mushroom', 'lettuce', 'tomato', 'onion', 'pickles', 'bun_top'],
    nutrition: { protein: '22g', carbs: '52g', fat: '18g', sodium: '710mg' },
    drinkPairing: {
      name: 'Cucumber Mint Sparkler',
      description: 'A sugar-free organic soda with pressed cucumber cucumber, garden mint, and lime.',
      price: 4.99,
      icon: 'GlassWater',
    }
  },
  {
    id: 'signature_truffle',
    name: 'The Black Gold Truffle',
    tagline: 'The pinnacle of culinary luxury.',
    description: 'Our ultimate luxury burger. Butter-basted Wagyu beef patty, molten gruyère cheese, sautéed wild porcini mushrooms, crispy jamón serrano, and a rich, fragrant black truffle emulsion.',
    basePrice: 22.99,
    rating: 4.9,
    reviewsCount: 154,
    calories: 930,
    prepTimeMin: 15,
    imageSeed: 'truffle_burger',
    primaryColor: '#8B5CF6',
    ingredients: ['bun_bottom', 'patty', 'cheese', 'mushroom', 'onion', 'sauce', 'bun_top'],
    nutrition: { protein: '56g', carbs: '44g', fat: '49g', sodium: '1020mg' },
    drinkPairing: {
      name: 'Bourbon Barrel Stout',
      description: 'A barrel-aged imperial dark stout with rich notes of dark chocolate, oak, and bourbon.',
      price: 8.99,
      icon: 'Beer',
    }
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Vance',
    role: 'Michelin-Starred Culinary Critic',
    rating: 5,
    text: '“The smoke balance and structural integrity of the brioche bun is an absolute architectural marvel. This is not just fast food; this is high-end culinary theater.”',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    date: 'July 2026'
  },
  {
    id: '2',
    name: 'Elena Rostova',
    role: 'Gastronomy Photojournalist',
    rating: 5,
    text: '“Watching the patty drop onto that 500-degree cast iron surface and hearing that glorious sizzle is a visceral experience. The Double Foundry is a masterpiece of cheese emulsion.”',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    date: 'June 2026'
  },
  {
    id: '3',
    name: 'Chef David Chang Jr.',
    role: 'Artisan Smasher & Founder',
    rating: 5,
    text: '“They treat variables like sear temperature, fat-to-lean ratios, and vapor-trapped cheddar cheese melting like advanced physical sciences. Truly the gold standard.”',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    date: 'May 2026'
  }
];

export const CHEFS: Chef[] = [
  {
    name: 'Chef Alistair Sterling',
    role: 'Head of Culinary Innovation',
    bio: 'An alumnus of world-class Parisian dining, Chef Alistair dedicated five years to studying the physical and thermodynamic parameters of the perfect flame-sear.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=500&fit=crop'
  },
  {
    name: 'Master Smasher Kenji Sato',
    role: 'Director of Patty Operations',
    bio: 'Kenji engineered our proprietary custom grind ratio (80% chuck, 15% short-rib, 5% bone-marrow) and manages our precision double-smashed flat tops.',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=500&fit=crop'
  }
];

export const RESTAURANT_STORY: StoryMilestone[] = [
  {
    year: '2021',
    title: 'The Cast-Iron Manifesto',
    description: 'We started in a humble custom-welded food trailer with a single 400-degree steel slab and a conviction: that high-end food techniques belong on greaseproof paper.',
    image: 'https://images.unsplash.com/photo-1565130838608-c8a7b255d67e?w=600&h=400&fit=crop'
  },
  {
    year: '2023',
    title: 'The Maillard Lab',
    description: 'Our first brick-and-mortar storefront opened with integrated high-velocity ventilation hoods allowing us to capture true wood-fired hickory embers indoors.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop'
  },
  {
    year: '2025',
    title: 'Nationwide Culinary Acclaim',
    description: 'Awarded the "Innovator of the Year" in modern street food, we continue to push boundaries by introducing dry-aged Wagyu beef in standard fast-food structures.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop'
  }
];
