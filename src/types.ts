export interface Ingredient {
  id: string;
  name: string;
  price: number;
  calories: number;
  color: string;
  category: 'bun' | 'patty' | 'cheese' | 'veggie' | 'sauce' | 'premium';
}

export interface BurgerProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  rating: number;
  reviewsCount: number;
  calories: number;
  prepTimeMin: number;
  imageSeed: string; // for high-fidelity fallback styling or visual rendering
  primaryColor: string; // warm brand accent color
  ingredients: string[]; // default ingredient IDs included
  nutrition: {
    protein: string;
    carbs: string;
    fat: string;
    sodium: string;
  };
  drinkPairing: {
    name: string;
    description: string;
    price: number;
    icon: string;
  };
}

export interface CartItem {
  id: string; // unique item instance id
  burgerId: string;
  name: string;
  customizedPrice: number;
  customizedCalories: number;
  quantity: number;
  addedIngredients: string[]; // ids of extra ingredients
  removedIngredients: string[]; // ids of default ingredients omitted
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
  date: string;
}

export interface Chef {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  image: string;
}

export type OrderStatusStep =
  | 'confirmed'
  | 'preparing'
  | 'cooking'
  | 'assembling'
  | 'quality_check'
  | 'packed'
  | 'ready'
  | 'delivering'
  | 'delivered';

export interface OrderStatus {
  step: OrderStatusStep;
  timestamp: string;
  label: string;
  description: string;
  active: boolean;
  completed: boolean;
}

