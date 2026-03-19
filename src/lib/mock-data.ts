// src/lib/mock-data.ts — ULTIMATE FINAL (NO MORE ERRORS)

// ─── TYPES ─────────────────────────

export interface ProductBundle {
  id: string
  label: string
  quantity: number
  price: number
  comparePrice?: number
  savings?: number
  discountPercent: number
  isMostPopular: boolean
}

export interface ProductImage {
  id: string
  url: string
  position: number
}

export interface ProductReview {
  id: string
  rating: number
  title: string
  body: string
  name: string
  date: string
  isVerified: boolean
}

export interface SalesProduct {
  id: string
  name: string
  slug: string
  description: string
  tagline?: string
  subtitle?: string

  price: number
  comparePrice: number

  images: ProductImage[]
  bundles: ProductBundle[]
  reviews: ProductReview[]

  badge?: string
  benefits?: string[]
  ingredients?: string[]
  faq?: { question: string; answer: string }[]

  stock: number
  isBestSeller: boolean
  isNew: boolean

  categorySlug: string
}

// ─── PRODUCT ─────────────────────────

export const SAC_SERUMU: SalesProduct = {
  id: 'sac-serumu-001',
  name: 'Allorea Saç Yoğunlaştırıcı Serum',
  slug: 'allorea-sac-yogunlastirici-serum',

  description: 'Saç dökülmesini azaltmaya yardımcı premium serum.',
  tagline: 'Daha güçlü ve dolgun saçlar için özel formül',
  subtitle: 'Profesyonel saç bakım çözümü',

  price: 349,
  comparePrice: 499,

  badge: 'Premium',

  images: [
    {
      id: 'i1',
      url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be',
      position: 0,
    },
  ],

  bundles: [
    {
      id: 'b1',
      label: '1 Adet',
      quantity: 1,
      price: 349,
      comparePrice: 499,
      savings: 150,
      discountPercent: 0,
      isMostPopular: false,
    },
    {
      id: 'b2',
      label: '3 Adet',
      quantity: 3,
      price: 799,
      comparePrice: 1497,
      savings: 698,
      discountPercent: 47,
      isMostPopular: true,
    },
  ],

  reviews: [
    {
      id: 'r1',
      rating: 5,
      title: 'Gerçekten işe yarıyor',
      body: '2 haftada saç dökülmem ciddi şekilde azaldı.',
      name: 'Ayşe K.',
      date: '2025-02-01',
      isVerified: true,
    },
    {
      id: 'r2',
      rating: 5,
      title: 'Kaliteli ürün',
      body: 'Saçlarım daha dolgun ve canlı görünüyor.',
      name: 'Mehmet T.',
      date: '2025-02-10',
      isVerified: true,
    },
    {
      id: 'r3',
      rating: 4,
      title: 'Memnun kaldım',
      body: 'Fiyat biraz yüksek ama performans iyi.',
      name: 'Elif A.',
      date: '2025-02-15',
      isVerified: false,
    },
  ],

  benefits: [
    'Saç dökülmesini azaltır',
    'Saç köklerini güçlendirir',
    'Daha dolgun görünüm sağlar',
  ],

  ingredients: [
    'Biotin',
    'Keratin',
    'Argan Yağı',
  ],

  faq: [
    {
      question: 'Ne kadar sürede etkisini gösterir?',
      answer: 'Genellikle 2-4 hafta içinde etkiler görülür.',
    },
    {
      question: 'Günde kaç kez kullanılmalı?',
      answer: 'Günde 1 kez düzenli kullanım önerilir.',
    },
  ],

  stock: 50,
  isBestSeller: true,
  isNew: false,
  categorySlug: 'hair-care',
}

// ─── PRODUCTS ─────────────────────────

export const ALL_PRODUCTS = [SAC_SERUMU]
export const FEATURED_PRODUCTS = ALL_PRODUCTS
export const PRODUCTS = ALL_PRODUCTS

export function getProductBySlug(slug: string) {
  return ALL_PRODUCTS.find((p) => p.slug === slug)
}

// ─── BLOG ─────────────────────────

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image?: string
  tags: string[]
  authorName?: string
  publishedAt?: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'ornek-blog',
    title: 'Allorea Blog Yazısı',
    excerpt: 'Saç bakımında devrim niteliğinde çözümler.',
    content:
      'Bu bir örnek blog içeriğidir. Allorea ürünleriyle saç bakımınızı güçlendirin.',
    image:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908',
    tags: ['Saç Bakımı', 'Serum'],
    authorName: 'Allorea Team',
    publishedAt: '2025-01-01',
  },
]

// ─── CATEGORY ─────────────────────────

export interface CategoryItem {
  id: string
  name: string
  slug: string
  image: string
}

const CATEGORY_LIST: CategoryItem[] = [
  {
    id: 'hair-care',
    name: 'Saç Bakımı',
    slug: 'hair-care',
    image:
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da',
  },
  {
    id: 'skincare',
    name: 'Cilt Bakımı',
    slug: 'skincare',
    image:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908',
  },
  {
    id: 'serums',
    name: 'Serumlar',
    slug: 'serums',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be',
  },
]

export const CATEGORIES = CATEGORY_LIST
export default CATEGORY_LIST
