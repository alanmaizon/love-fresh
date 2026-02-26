export type Category = 'coffee' | 'skincare' | 'wellness';

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  rating: number;
  newest?: boolean;
  // Coffee specific
  caffeineLevel?: 'high' | 'medium' | 'low' | 'decaf';
  grindOptions?: string[]; // e.g., ['beans', 'ground']
  // Skincare specific
  scent?: string;
  vegan?: boolean;
  // Variants
  sizes?: string[];
}

export const catalog: Product[] = [
  {
    id: 'c1',
    slug: 'midnight-espresso',
    name: 'Midnight Espresso',
    description: 'Dark roast with notes of chocolate and cherry.',
    price: 18.99,
    category: 'coffee',
    image: 'https://picsum.photos/seed/coffee1/400/400',
    rating: 4.8,
    newest: true,
    caffeineLevel: 'high',
    grindOptions: ['beans', 'ground'],
    sizes: ['250g', '500g', '1kg']
  },
  {
    id: 'c2',
    slug: 'morning-breeze',
    name: 'Morning Breeze Blend',
    description: 'Light roast, floral and citrus notes.',
    price: 14.50,
    category: 'coffee',
    image: 'https://picsum.photos/seed/coffee2/400/400',
    rating: 4.5,
    caffeineLevel: 'medium',
    grindOptions: ['beans', 'ground'],
    sizes: ['250g', '500g']
  },
  {
    id: 'c3',
    slug: 'decaf-dream',
    name: 'Decaf Dream',
    description: 'Swiss water process decaf, smooth and nutty.',
    price: 16.00,
    category: 'coffee',
    image: 'https://picsum.photos/seed/coffee3/400/400',
    rating: 4.2,
    caffeineLevel: 'decaf',
    grindOptions: ['beans', 'ground'],
    sizes: ['250g', '500g']
  },
  {
    id: 's1',
    slug: 'rose-hydration-cream',
    name: 'Rose Hydration Cream',
    description: 'Deeply moisturizing face cream with natural rose extract.',
    price: 34.00,
    category: 'skincare',
    image: 'https://picsum.photos/seed/skin1/400/400',
    rating: 4.9,
    newest: true,
    scent: 'rose',
    vegan: true,
    sizes: ['50ml', '100ml']
  },
  {
    id: 's2',
    slug: 'citrus-glow-serum',
    name: 'Citrus Glow Serum',
    description: 'Vitamin C serum for a radiant complexion.',
    price: 42.00,
    category: 'skincare',
    image: 'https://picsum.photos/seed/skin2/400/400',
    rating: 4.7,
    scent: 'citrus',
    vegan: true,
    sizes: ['30ml']
  },
  {
    id: 'w1',
    slug: 'lavender-sleep-mist',
    name: 'Lavender Sleep Mist',
    description: 'Pillow spray for a restful night.',
    price: 12.00,
    category: 'wellness',
    image: 'https://picsum.photos/seed/well1/400/400',
    rating: 4.6,
    scent: 'lavender',
    vegan: true,
    sizes: ['100ml']
  },
  {
    id: 'w2',
    slug: 'matcha-energy-powder',
    name: 'Ceremonial Matcha',
    description: 'Premium grade matcha from Uji, Japan.',
    price: 28.00,
    category: 'wellness',
    image: 'https://picsum.photos/seed/well2/400/400',
    rating: 4.9,
    vegan: true,
    sizes: ['30g', '100g']
  }
];
