import type { Product, Review } from '@/types';

const img = (id: string, n: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;

// Curated Pexels photo IDs by category
const RINGS = ['2732096', '30541187', '30541169', '2849742', '30541186', '17368718', '30541184', '30541170', '30206324', '30541185', '30541171', '10897815', '13895021', '12803908'];
const EARRINGS = ['5370644', '10976654', '35961143', '5737290', '20943478', '2849743', '7981566', '20943476', '35270159', '35933224', '5370642', '7258925', '7509257', '20033873'];
const NECKLACES = ['4889719', '20858950', '32780784', '10117804', '38269804', '4595719', '28976815', '177332', '9551116', '7679654', '29013500', '4735888', '17833830', '38774780'];
const BRACELETS = ['34399144', '34399141', '34399138', '34399059', '29357584', '13348470', '32048447', '15491661', '34399142', '11476471', '12194304', '12124617'];
const BANGLES = ['7251792', '35059564', '37485307', '9808451', '37485313', '37485314', '8887000'];
const CHARMS = ['38909337', '5586', '29043373', '7559418', '38827930', '15947237', '10652684', '28263466'];
const SETS = ['28347073', '29038003', '33154729', '7093184', '7093181', '7093174', '29385412', '10944923'];

const makeReviews = (count: number): Review[] => {
  const names = ['Aisha K.', 'Meera S.', 'Zara H.', 'Priya R.', 'Fatima A.', 'Nadia M.', 'Sara T.', 'Hina B.', 'Rabia F.', 'Layla J.'];
  const titles = ['Absolutely stunning', 'Exceeded expectations', 'Perfect gift', 'Beautiful craftsmanship', 'Love it', 'Highly recommend', 'Worth every penny'];
  const bodies = [
    'The piece arrived beautifully packaged and looks even better in person. The finish is exquisite.',
    'I gifted this to my mother and she was moved to tears. The quality is outstanding.',
    'Wearing it daily and it has not tarnished at all. Very happy with this purchase.',
    'The detailing is remarkable. Feels like a heirloom piece.',
    'Exactly as pictured. The gold tone is rich and the stones catch the light beautifully.',
    'Customer service helped me choose the right size and delivery was prompt.',
  ];
  return Array.from({ length: Math.min(count, 5) }).map((_, i) => ({
    id: `r${i}`,
    name: names[i % names.length],
    rating: 4 + (i % 2),
    date: `2026-0${(i % 6) + 1}-1${i % 9}`,
    title: titles[i % titles.length],
    body: bodies[i % bodies.length],
  }));
};

let counter = 0;
const p = (
  partial: Omit<Product, 'id' | 'slug' | 'reviews' | 'reviewCount' | 'rating' | 'specifications' | 'dimensions' | 'careInstructions'>
): Product => {
  counter += 1;
  const id = `p${String(counter).padStart(3, '0')}`;
  return {
    ...partial,
    id,
    slug: `${partial.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${id}`,
    rating: Math.round((3.8 + Math.random() * 1.2) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 180) + 12,
    reviews: makeReviews(Math.floor(Math.random() * 5) + 1),
    specifications: [
      { label: 'Material', value: partial.material },
      { label: 'Stone', value: partial.stone === 'None' ? 'No stone' : partial.stone },
      { label: 'Collection', value: partial.collection },
      { label: 'Color', value: partial.color },
      { label: 'Category', value: partial.category },
    ],
    dimensions: 'Adjustable / One size fits most',
    careInstructions: 'Store in a dry, airtight pouch. Avoid contact with water, perfume, and sweat. Clean gently with a soft microfibre cloth.',
  };
};

export const products: Product[] = [
  // RINGS (6)
  p({ name: 'Aurora Solitaire Ring', price: 189, salePrice: 142, category: 'Rings', material: 'Gold', stone: 'Diamond', color: 'Gold', collection: 'Aurora', images: [img(RINGS[0], 1), img(RINGS[6], 2), img(RINGS[12], 3)], description: 'A single brilliant-cut stone held in a delicate four-prong setting, designed to catch light from every angle. The slim band keeps the focus on the centre stone.', inStock: true, stockCount: 8, isNew: true, isBestSeller: true, isFeatured: true }),
  p({ name: 'Heritage Pavé Band', price: 165, category: 'Rings', material: 'Gold', stone: 'Diamond', color: 'Gold', collection: 'Heritage', images: [img(RINGS[1], 1), img(RINGS[7], 2), img(RINGS[8], 3)], description: 'A full-circle pavé band set with micro-stones for continuous sparkle. Designed to stack or stand alone.', inStock: true, stockCount: 14, isNew: false, isBestSeller: true, isFeatured: true }),
  p({ name: 'Noor Twin-Stone Ring', price: 128, salePrice: 99, category: 'Rings', material: 'Rose Gold', stone: 'Sapphire', color: 'Rose', collection: 'Noor', images: [img(RINGS[2], 1), img(RINGS[9], 2), img(RINGS[10], 3)], description: 'Two complementary stones set side by side, symbolising balance and partnership. A modern take on a classic silhouette.', inStock: true, stockCount: 6, isNew: true, isBestSeller: false, isFeatured: false }),
  p({ name: 'Zarina Signet Ring', price: 145, category: 'Rings', material: 'Gold', stone: 'Ruby', color: 'Gold', collection: 'Zarina', images: [img(RINGS[3], 1), img(RINGS[11], 2), img(RINGS[5], 3)], description: 'A bold signet silhouette with a deep ruby centre, inspired by South Asian heirloom jewellery. Hand-finished with a mirror polish.', inStock: true, stockCount: 10, isNew: false, isBestSeller: true, isFeatured: true }),
  p({ name: 'Mehfil Cocktail Ring', price: 175, salePrice: 129, category: 'Rings', material: 'Gold', stone: 'Emerald', color: 'Gold', collection: 'Mehfil', images: [img(RINGS[4], 1), img(RINGS[13], 2), img(RINGS[1], 3)], description: 'An oversized emerald surrounded by a halo of pavé stones. Made for evenings that deserve to be remembered.', inStock: false, stockCount: 0, isNew: false, isBestSeller: false, isFeatured: false }),
  p({ name: 'Everyday Twist Ring', price: 89, category: 'Rings', material: 'Silver', stone: 'None', color: 'Silver', collection: 'Everyday Luxe', images: [img(RINGS[5], 1), img(RINGS[2], 2), img(RINGS[7], 3)], description: 'A sculptural twisted band in polished silver. Lightweight enough for daily wear, striking enough to be noticed.', inStock: true, stockCount: 22, isNew: false, isBestSeller: false, isFeatured: false }),

  // EARRINGS (6)
  p({ name: 'Aurora Drop Earrings', price: 155, salePrice: 119, category: 'Earrings', material: 'Gold', stone: 'Diamond', color: 'Gold', collection: 'Aurora', images: [img(EARRINGS[0], 1), img(EARRINGS[5], 2), img(EARRINGS[10], 3)], description: 'Linear drop earrings that move with you. Each element is set to catch light independently, creating a cascade of sparkle.', inStock: true, stockCount: 9, isNew: true, isBestSeller: true, isFeatured: true }),
  p({ name: 'Heritage Jhumka', price: 135, category: 'Earrings', material: 'Gold', stone: 'Pearl', color: 'Gold', collection: 'Heritage', images: [img(EARRINGS[1], 1), img(EARRINGS[6], 2), img(EARRINGS[11], 3)], description: 'A traditional jhumka reimagined with a fresh pearl drop. The dome is finished with fine beadwork along the rim.', inStock: true, stockCount: 12, isNew: false, isBestSeller: true, isFeatured: true }),
  p({ name: 'Noor Stud Earrings', price: 78, category: 'Earrings', material: 'Gold', stone: 'Diamond', color: 'Gold', collection: 'Noor', images: [img(EARRINGS[2], 1), img(EARRINGS[7], 2), img(EARRINGS[12], 3)], description: 'Classic round studs that go with everything. A secure butterfly back keeps them comfortable all day.', inStock: true, stockCount: 30, isNew: false, isBestSeller: true, isFeatured: false }),
  p({ name: 'Mehfil Chandelier Earrings', price: 198, salePrice: 149, category: 'Earrings', material: 'Gold', stone: 'Kundan', color: 'Gold', collection: 'Mehfil', images: [img(EARRINGS[3], 1), img(EARRINGS[8], 2), img(EARRINGS[13], 3)], description: 'Tiered chandelier earrings with kundan setting and ruby accents. Designed for celebrations and special occasions.', inStock: true, stockCount: 5, isNew: true, isBestSeller: false, isFeatured: true }),
  p({ name: 'Zarina Hoop Earrings', price: 98, category: 'Earrings', material: 'Rose Gold', stone: 'None', color: 'Rose', collection: 'Zarina', images: [img(EARRINGS[4], 1), img(EARRINGS[9], 2), img(EARRINGS[0], 3)], description: 'Medium hoops with a brushed rose-gold finish. A quiet luxury staple for the modern wardrobe.', inStock: true, stockCount: 18, isNew: false, isBestSeller: false, isFeatured: false }),
  p({ name: 'Everyday Huggie Earrings', price: 65, salePrice: 49, category: 'Earrings', material: 'Silver', stone: 'None', color: 'Silver', collection: 'Everyday Luxe', images: [img(EARRINGS[5], 1), img(EARRINGS[2], 2), img(EARRINGS[7], 3)], description: 'Slim huggie hoops that sit close to the lobe. Perfect for stacking or wearing on their own.', inStock: true, stockCount: 25, isNew: true, isBestSeller: false, isFeatured: false }),

  // NECKLACES (6)
  p({ name: 'Aurora Pendant Necklace', price: 169, category: 'Necklaces', material: 'Gold', stone: 'Diamond', color: 'Gold', collection: 'Aurora', images: [img(NECKLACES[0], 1), img(NECKLACES[5], 2), img(NECKLACES[11], 3)], description: 'A single solitaire pendant on a fine gold chain. The chain is adjustable to layer with other pieces.', inStock: true, stockCount: 11, isNew: true, isBestSeller: true, isFeatured: true }),
  p({ name: 'Heritage Temple Necklace', price: 245, salePrice: 189, category: 'Necklaces', material: 'Gold', stone: 'Ruby', color: 'Gold', collection: 'Heritage', images: [img(NECKLACES[1], 1), img(NECKLACES[6], 2), img(NECKLACES[12], 3)], description: 'An ornate temple-style necklace with intricate gold work and ruby settings. A statement piece for festive occasions.', inStock: true, stockCount: 4, isNew: false, isBestSeller: true, isFeatured: true }),
  p({ name: 'Noor Layered Necklace', price: 132, category: 'Necklaces', material: 'Gold', stone: 'Pearl', color: 'Gold', collection: 'Noor', images: [img(NECKLACES[2], 1), img(NECKLACES[7], 2), img(NECKLACES[13], 3)], description: 'A pre-layered necklace with a pearl drop pendant. Gives the look of three necklaces in one easy piece.', inStock: true, stockCount: 15, isNew: false, isBestSeller: false, isFeatured: false }),
  p({ name: 'Mehfil Choker', price: 215, salePrice: 169, category: 'Necklaces', material: 'Gold', stone: 'Kundan', color: 'Gold', collection: 'Mehfil', images: [img(NECKLACES[3], 1), img(NECKLACES[8], 2), img(NECKLACES[9], 3)], description: 'A close-fitting choker with kundan stones and fine bead detailing. Pairs beautifully with the Mehfil earrings.', inStock: true, stockCount: 7, isNew: true, isBestSeller: true, isFeatured: true }),
  p({ name: 'Zarina Chain Necklace', price: 115, category: 'Necklaces', material: 'Rose Gold', stone: 'None', color: 'Rose', collection: 'Zarina', images: [img(NECKLACES[4], 1), img(NECKLACES[10], 2), img(NECKLACES[0], 3)], description: 'A medium-weight cable chain in rose gold with a lobster clasp. A versatile foundation piece.', inStock: true, stockCount: 20, isNew: false, isBestSeller: false, isFeatured: false }),
  p({ name: 'Everyday Bar Necklace', price: 72, salePrice: 55, category: 'Necklaces', material: 'Silver', stone: 'None', color: 'Silver', collection: 'Everyday Luxe', images: [img(NECKLACES[5], 1), img(NECKLACES[11], 2), img(NECKLACES[4], 3)], description: 'A slim silver bar on a delicate chain. Minimal, modern, and easy to layer.', inStock: true, stockCount: 28, isNew: true, isBestSeller: false, isFeatured: false }),

  // BRACELETS (4)
  p({ name: 'Aurora Tennis Bracelet', price: 225, salePrice: 179, category: 'Bracelets', material: 'Gold', stone: 'Diamond', color: 'Gold', collection: 'Aurora', images: [img(BRACELETS[0], 1), img(BRACELETS[8], 2), img(BRACELETS[3], 3)], description: 'A continuous line of stones set in a flexible gold bracket. Secured with a double-locking clasp.', inStock: true, stockCount: 6, isNew: true, isBestSeller: true, isFeatured: true }),
  p({ name: 'Heritage Cuff Bracelet', price: 158, category: 'Bracelets', material: 'Gold', stone: 'Emerald', color: 'Gold', collection: 'Heritage', images: [img(BRACELETS[1], 1), img(BRACELETS[9], 2), img(BRACELETS[4], 3)], description: 'A wide cuff with a central emerald and engraved detailing along the edges. Adjustable for a comfortable fit.', inStock: true, stockCount: 9, isNew: false, isBestSeller: true, isFeatured: true }),
  p({ name: 'Noor Chain Bracelet', price: 95, category: 'Bracelets', material: 'Rose Gold', stone: 'None', color: 'Rose', collection: 'Noor', images: [img(BRACELETS[2], 1), img(BRACELETS[10], 2), img(BRACELETS[5], 3)], description: 'A fine rose-gold chain bracelet with a small charm accent. Lightweight and easy to wear every day.', inStock: true, stockCount: 17, isNew: false, isBestSeller: false, isFeatured: false }),
  p({ name: 'Everyday Bangle Bracelet', price: 68, salePrice: 52, category: 'Bracelets', material: 'Silver', stone: 'None', color: 'Silver', collection: 'Everyday Luxe', images: [img(BRACELETS[3], 1), img(BRACELETS[11], 2), img(BRACELETS[6], 3)], description: 'A slim silver bangle with a polished finish. Stack a few together for a layered look.', inStock: true, stockCount: 24, isNew: true, isBestSeller: false, isFeatured: false }),

  // BANGLES (3)
  p({ name: 'Heritage Gold Kada', price: 195, category: 'Bangles', material: 'Gold', stone: 'None', color: 'Gold', collection: 'Heritage', images: [img(BANGLES[0], 1), img(BANGLES[2], 2), img(BANGLES[4], 3)], description: 'A broad gold kada with traditional engraved motifs. Hinged opening for easy wear.', inStock: true, stockCount: 8, isNew: false, isBestSeller: true, isFeatured: true }),
  p({ name: 'Mehfil Bridal Bangles', price: 285, salePrice: 219, category: 'Bangles', material: 'Gold', stone: 'Kundan', color: 'Gold', collection: 'Mehfil', images: [img(BANGLES[1], 1), img(BANGLES[3], 2), img(BANGLES[5], 3)], description: 'A set of bridal bangles with kundan work and rich red accents. Designed for the wedding day and beyond.', inStock: true, stockCount: 3, isNew: true, isBestSeller: true, isFeatured: true }),
  p({ name: 'Everyday Stack Bangles', price: 85, category: 'Bangles', material: 'Silver', stone: 'None', color: 'Silver', collection: 'Everyday Luxe', images: [img(BANGLES[2], 1), img(BANGLES[4], 2), img(BANGLES[6], 3)], description: 'A set of four slim silver bangles in varying textures. Mix and match or wear together.', inStock: true, stockCount: 16, isNew: false, isBestSeller: false, isFeatured: false }),

  // CHARMS (3)
  p({ name: 'Aurora Pearl Charm', price: 58, salePrice: 44, category: 'Charms', material: 'Gold', stone: 'Pearl', color: 'Gold', collection: 'Aurora', images: [img(CHARMS[0], 1), img(CHARMS[3], 2), img(CHARMS[5], 3)], description: 'A freshwater pearl charm with a gold clip. Attach to a bracelet or necklace to build your own story.', inStock: true, stockCount: 26, isNew: true, isBestSeller: false, isFeatured: false }),
  p({ name: 'Noor Heart Charm', price: 48, category: 'Charms', material: 'Rose Gold', stone: 'None', color: 'Rose', collection: 'Noor', images: [img(CHARMS[1], 1), img(CHARMS[4], 2), img(CHARMS[6], 3)], description: 'A small heart charm in polished rose gold. A quiet, meaningful gift.', inStock: true, stockCount: 30, isNew: false, isBestSeller: true, isFeatured: false }),
  p({ name: 'Everyday Star Charm', price: 42, category: 'Charms', material: 'Silver', stone: 'None', color: 'Silver', collection: 'Everyday Luxe', images: [img(CHARMS[2], 1), img(CHARMS[5], 2), img(CHARMS[7], 3)], description: 'A tiny star charm with a brushed silver finish. Clips onto any chain or bracelet.', inStock: true, stockCount: 35, isNew: true, isBestSeller: false, isFeatured: false }),

  // JEWELLERY SETS (2)
  p({ name: 'Mehfil Bridal Set', price: 495, salePrice: 395, category: 'Jewellery Sets', material: 'Gold', stone: 'Kundan', color: 'Gold', collection: 'Mehfil', images: [img(SETS[0], 1), img(SETS[1], 2), img(SETS[3], 3)], description: 'A complete bridal set featuring a necklace, earrings, and matching maang tikka. Handcrafted with kundan and pearl detailing.', inStock: true, stockCount: 2, isNew: true, isBestSeller: true, isFeatured: true }),
  p({ name: 'Heritage Kundan Set', price: 385, category: 'Jewellery Sets', material: 'Gold', stone: 'Kundan', color: 'Gold', collection: 'Heritage', images: [img(SETS[1], 1), img(SETS[2], 2), img(SETS[4], 3)], description: 'A necklace and earrings set with blue gemstone accents and gold filigree. A versatile set for festive occasions.', inStock: true, stockCount: 4, isNew: false, isBestSeller: true, isFeatured: true }),
];

export const getProductById = (id: string) => products.find((x) => x.id === id);
export const getProductBySlug = (slug: string) => products.find((x) => x.slug === slug);
export const getRelatedProducts = (product: Product, count = 4) =>
  products.filter((x) => x.category === product.category && x.id !== product.id).slice(0, count);

export const categories: { name: string; image: string; description: string }[] = [
  { name: 'Rings', image: img(RINGS[0]), description: 'Solitaires, bands & statement rings' },
  { name: 'Earrings', image: img(EARRINGS[0]), description: 'Studs, drops & jhumkas' },
  { name: 'Necklaces', image: img(NECKLACES[0]), description: 'Pendants, chokers & layers' },
  { name: 'Bracelets', image: img(BRACELETS[0]), description: 'Tennis, cuffs & chains' },
  { name: 'Bangles', image: img(BANGLES[0]), description: 'Kadas & stack bangles' },
  { name: 'Charms', image: img(CHARMS[0]), description: 'Build-your-own pieces' },
  { name: 'Jewellery Sets', image: img(SETS[0]), description: 'Coordinated bridal sets' },
];

export const heroImage = 'https://images.pexels.com/photos/10944923/pexels-photo-10944923.jpeg?auto=compress&cs=tinysrgb&w=1400';
export const storyImage = 'https://images.pexels.com/photos/6262835/pexels-photo-6262835.jpeg?auto=compress&cs=tinysrgb&w=1000';
export const storyImage2 = 'https://images.pexels.com/photos/7411261/pexels-photo-7411261.jpeg?auto=compress&cs=tinysrgb&w=1000';

export const socialGallery = [
  'https://images.pexels.com/photos/7411261/pexels-photo-7411261.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/6467618/pexels-photo-6467618.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/14030660/pexels-photo-14030660.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/19917947/pexels-photo-19917947.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/30738563/pexels-photo-30738563.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/9617682/pexels-photo-9617682.jpeg?auto=compress&cs=tinysrgb&w=500',
];
