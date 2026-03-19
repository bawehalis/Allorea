// src/lib/mock-data.ts — FINAL FIX

// ─── TYPES ─────────────────────────

export interface ProductBundle {
  id: string
  label: string
  quantity: number
  price: number
  discountPercent: number
  isMostPopular: boolean
}

export interface ProductImage {
  id: string
  url: string
  position: number
}

export interface SalesProduct {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice: number
  images: ProductImage[]
  bundles: ProductBundle[]
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
  price: 349,
  comparePrice: 499,
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
      discountPercent: 0,
      isMostPopular: false,
    },
    {
      id: 'b2',
      label: '3 Adet',
      quantity: 3,
      price: 799,
      discountPercent: 47,
      isMostPopular: true,
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

// 🔥 BU ÇOK ÖNEMLİ (hata fix)
export function getProductBySlug(slug: string) {
  return ALL_PRODUCTS.find((p) => p.slug === slug)
}

// ─── BLOG FIX ─────────────────────────

export interface BlogPost {
  id: string
  slug: string
  title: string
  content: string
  image?: string
  tags?: string[]
  authorName?: string
  publishedAt?: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'ornek-blog',
    title: 'Örnek Blog',
    content: 'İçerik',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908',
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

// 🔥 çift export (garanti)
export const CATEGORIES = CATEGORY_LIST
export default CATEGORY_LIST
