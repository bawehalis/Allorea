// src/lib/mock-data.ts — Allorea Cosmetics v2

export interface ProductBundle {
  id: string
  label: string
  quantity: number
  price: number
  comparePrice?: number
  discountPercent: number
  isMostPopular: boolean
  savings?: number
}

export interface ProductImage {
  id: string
  url: string
  alt?: string
  position: number
}

export interface ProductFaq {
  question: string
  answer: string
}

export interface Review {
  id: string
  name: string
  rating: number
  title: string
  body: string
  date: string
  isVerified: boolean
  avatar?: string
  beforeImage?: string
  afterImage?: string
}

export interface SalesProduct {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  problemText: string
  solutionText: string
  howToUse: string[]
  ingredients: string
  price: number
  comparePrice: number
  images: ProductImage[]
  bundles: ProductBundle[]
  reviews: Review[]
  faqs: ProductFaq[]
  stock: number
  isBestSeller: boolean
  isNew: boolean
  badge?: string
  categorySlug: string
}

// ─── ANA ÜRÜN ─────────────────────────────────────────

const SAC_SERUMU: SalesProduct = {
  id: 'sac-serumu-001',
  name: 'Allorea Saç Yoğunlaştırıcı Serum',
  slug: 'allorea-sac-yogunlastirici-serum',
  tagline: '30 Günde Görünür Fark — Ya Paranızı Geri Alın',
  description: 'Saç dökülmesini azaltmaya yardımcı premium serum.',
  problemText: 'Saç dökülmesi özgüveni etkiler.',
  solutionText: 'Kökten çözüm sunar.',
  howToUse: ['Uygula', 'Masaj yap', 'Durulama yok'],
  ingredients: 'Biotin, Kafein',
  price: 349,
  comparePrice: 499,
  images: [
    { id: 'i1', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be', position: 0 },
  ],
  bundles: [
    { id: 'b1', label: '1 Adet', quantity: 1, price: 349, discountPercent: 0, isMostPopular: false },
    { id: 'b2', label: '3 Adet', quantity: 3, price: 799, discountPercent: 47, isMostPopular: true },
  ],
  reviews: [],
  faqs: [],
  stock: 50,
  isBestSeller: true,
  isNew: false,
  categorySlug: 'hair-care',
}

// ─── EXPORTS ─────────────────────────────────────────

export const ALL_PRODUCTS: SalesProduct[] = [SAC_SERUMU]
export const FEATURED_PRODUCTS = ALL_PRODUCTS
export const PRODUCTS = ALL_PRODUCTS

// ─── BLOG ─────────────────────────────────────────────

export const BLOG_POSTS = []

// ─── CATEGORY NAMES ─────────────────────────────────

export const CATEGORY_NAMES: Record<string, string> = {
  'hair-care': 'Saç Bakımı',
  'skincare': 'Cilt Bakımı',
  'serums': 'Serumlar',
}

// ─── 🔥 CATEGORY FIX (FINAL) ─────────────────────────

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
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da',
  },
  {
    id: 'skincare',
    name: 'Cilt Bakımı',
    slug: 'skincare',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908',
  },
  {
    id: 'serums',
    name: 'Serumlar',
    slug: 'serums',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be',
  },
]

// 🔥 both export (garanti çözüm)
export const CATEGORIES = CATEGORY_LIST
export default CATEGORY_LIST
