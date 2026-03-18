'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { calculateDiscount, cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: {
    id: string; name: string; slug: string; description: string
    price: number; comparePrice?: number; sku: string; stock: number
    isActive?: boolean; isBestSeller?: boolean; isNew?: boolean
    badge?: string; categorySlug?: string
    category?: { name: string; slug: string }
    images: { url: string; alt?: string }[]
    averageRating?: number; reviewCount?: number
    tags?: string[]
  }
  layout?: 'grid' | 'list'
}

export default function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const [hovered,      setHovered]      = useState(false)
  const [wishlisted,   setWishlisted]   = useState(false)
  const [adding,       setAdding]       = useState(false)
  const { addItem, openCart } = useCartStore()

  const mainImg  = product.images[0]?.url || ''
  const hoverImg = product.images[1]?.url || mainImg
  const discount = calculateDiscount(product.price, product.comparePrice)
  const rating   = product.averageRating ?? 4.8
  const reviews  = product.reviewCount   ?? 0

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.stock) return
    setAdding(true)
    addItem({
      productId: product.id, name: product.name, slug: product.slug,
      price: product.price, quantity: 1, image: mainImg, stock: product.stock,
    })
    toast.success(`${product.name} sepete eklendi`, { duration: 2500 })
    await new Promise(r => setTimeout(r, 700))
    setAdding(false)
    openCart()
  }

  if (layout === 'list') {
    return (
      <Link href={`/product/${product.slug}`}
        className="group flex gap-5 bg-white border border-mist/50 hover:shadow-luxury transition-all duration-500 p-4">
        <div className="w-24 h-28 shrink-0 overflow-hidden bg-champagne">
          <Image src={mainImg} alt={product.name} width={96} height={112}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="flex-1 min-w-0 py-1">
          <p className="font-body text-2xs text-obsidian/45 tracking-widest uppercase mb-1">{product.category?.name}</p>
          <h3 className="font-display text-base font-light text-obsidian group-hover:text-allorea-600 transition-colors leading-snug mb-2">{product.name}</h3>
          <div className="flex items-center gap-1.5 mb-3">
            {[1,2,3,4,5].map(s=>(
              <Star key={s} size={11} className={s<=Math.round(rating)?'fill-allorea-500 text-allorea-500':'fill-mist text-mist'} />
            ))}
            <span className="font-body text-2xs text-obsidian/40">({reviews})</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-body text-base font-semibold text-obsidian">{product.price.toLocaleString('tr-TR')}₺</span>
            {product.comparePrice && <span className="font-body text-sm text-obsidian/35 line-through">{product.comparePrice.toLocaleString('tr-TR')}₺</span>}
          </div>
        </div>
        <button onClick={handleAddToCart} disabled={!product.stock || adding}
          className="self-center btn btn-primary btn-sm px-5 shrink-0">
          <ShoppingBag size={14} />
        </button>
      </Link>
    )
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`}>
        {/* Image container */}
        <div className="product-image overflow-hidden bg-champagne/60 mb-4">
          <Image
            src={hovered && hoverImg !== mainImg ? hoverImg : mainImg}
            alt={product.name}
            fill
            className={cn(
              'object-cover transition-all duration-700 ease-luxury',
              hovered ? 'scale-105' : 'scale-100'
            )}
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="tag tag-gold">Yeni</span>
            )}
            {discount > 0 && (
              <span className="bg-obsidian text-ivory font-body text-2xs tracking-widest uppercase px-2.5 py-1">
                -%{discount}
              </span>
            )}
            {product.isBestSeller && !product.isNew && (
              <span className="tag tag-gold">Çok Satan</span>
            )}
          </div>

          {/* Quick actions overlay */}
          <div className={cn(
            'absolute inset-0 flex items-end justify-center pb-4 gap-2 transition-all duration-500',
            hovered ? 'opacity-100' : 'opacity-0'
          )}>
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.stock || adding}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 font-body text-xs tracking-widest uppercase transition-all duration-200',
                  !product.stock
                    ? 'bg-mist text-obsidian/40 cursor-not-allowed'
                    : adding
                    ? 'bg-sage text-ivory'
                    : 'bg-obsidian text-ivory hover:bg-allorea-700'
                )}
              >
                <ShoppingBag size={13} />
                {!product.stock ? 'Tükendi' : adding ? 'Eklendi' : 'Sepete Ekle'}
              </button>
              <button
                onClick={e => { e.preventDefault(); setWishlisted(!wishlisted) }}
                className={cn(
                  'w-10 h-10 flex items-center justify-center border transition-all duration-200',
                  wishlisted
                    ? 'bg-allorea-600 border-allorea-600 text-ivory'
                    : 'bg-ivory border-mist text-obsidian/60 hover:border-obsidian'
                )}
              >
                <Heart size={14} className={wishlisted ? 'fill-current' : ''} />
              </button>
            </div>
          </div>

          {/* Sold out overlay */}
          {!product.stock && (
            <div className="absolute inset-0 bg-ivory/60 flex items-center justify-center">
              <span className="font-body text-xs text-obsidian/50 tracking-widest uppercase border border-mist px-4 py-2">Tükendi</span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-1">
          <p className="font-body text-2xs text-obsidian/40 tracking-widest uppercase">
            {product.category?.name}
          </p>
          <h3 className="font-display text-base font-light text-obsidian group-hover:text-allorea-600 transition-colors duration-300 leading-snug">
            {product.name}
          </h3>
          {reviews > 0 && (
            <div className="flex items-center gap-1.5 pt-0.5">
              {[1,2,3,4,5].map(s=>(
                <Star key={s} size={11} className={s<=Math.round(rating)?'fill-allorea-500 text-allorea-500':'fill-mist text-mist'} />
              ))}
              <span className="font-body text-2xs text-obsidian/40">({reviews})</span>
            </div>
          )}
          <div className="flex items-baseline gap-3 pt-1">
            <span className="font-body text-base font-semibold text-obsidian">
              {product.price.toLocaleString('tr-TR')}₺
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="font-body text-sm text-obsidian/35 line-through">
                {product.comparePrice.toLocaleString('tr-TR')}₺
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
