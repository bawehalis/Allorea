'use client'
import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ShoppingBag, CheckCircle, Minus, Plus, Star, Truck, RotateCcw, Shield, ChevronRight, MessageCircle, ChevronDown } from 'lucide-react'
import { getProductBySlug } from '@/lib/mock-data'
import { useCartStore } from '@/store/cart'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import ProductGallery   from '@/components/sales/ProductGallery'
import BundleSelector   from '@/components/sales/BundleSelector'
import BeforeAfterSlider from '@/components/sales/BeforeAfterSlider'
import ReviewList        from '@/components/sales/ReviewList'
import FaqAccordion      from '@/components/sales/FaqAccordion'
import StickyAddToCart   from '@/components/sales/StickyAddToCart'

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={size} className={s <= rating ? 'fill-allorea-500 text-allorea-500' : 'fill-mist text-mist'} />
      ))}
    </div>
  )
}

const TRUST = [
  { icon: Truck,       text: '1–3 Gün Teslimat' },
  { icon: RotateCcw,   text: '30 Gün İade' },
  { icon: Shield,      text: 'Güvenli Ödeme' },
]

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const [selectedBundle, setSelectedBundle] = useState(product.bundles[0].id)
  const [qty,    setQty]    = useState(1)
  const [adding, setAdding] = useState(false)
  const [activeTab, setActiveTab] = useState<'details'|'ingredients'|'howto'>('details')
  const { addItem, openCart } = useCartStore()

  const bundle    = product.bundles.find(b => b.id === selectedBundle)!
  const avgRating = product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length

  const handleAddToCart = async () => {
    setAdding(true)
    addItem({
      productId: product.id, name: product.name, slug: product.slug,
      price: bundle.price, quantity: qty,
      image: product.images[0]?.url || '', stock: product.stock, variant: bundle.label,
    })
    toast.success(`${product.name} sepete eklendi`, { duration: 2500 })
    await new Promise(r => setTimeout(r, 700))
    setAdding(false)
    openCart()
  }

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Merhaba! "${product.name}" - ${bundle.label} paketi için bilgi almak istiyorum.`)
    window.open(`https://wa.me/905001234567?text=${msg}`, '_blank')
  }

  return (
    <div className="bg-ivory min-h-screen">

      {/* Breadcrumb */}
      <div className="bg-champagne/40 border-b border-mist/40">
        <div className="container-main py-3">
          <nav className="flex items-center gap-2 font-body text-2xs tracking-widest uppercase text-obsidian/40">
            <Link href="/" className="hover:text-obsidian transition-colors">Ana Sayfa</Link>
            <ChevronRight size={11} />
            <Link href="/shop" className="hover:text-obsidian transition-colors">Mağaza</Link>
            <ChevronRight size={11} />
            <span className="text-obsidian/70 truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main product section */}
      <section className="section-pad">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Gallery */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Product details */}
            <div>
              {/* Category / badge */}
              <div className="flex items-center gap-3 mb-4">
                {product.badge && (
                  <span className="tag tag-gold">{product.badge}</span>
                )}
                {product.isBestSeller && (
                  <span className="eyebrow">Çok Satan</span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl lg:text-4xl font-light text-obsidian leading-tight mb-3">
                {product.name}
              </h1>
              <p className="font-body text-sm text-allorea-600 font-medium tracking-wide mb-5">
                {product.tagline}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-mist/40">
                <Stars rating={Math.round(avgRating)} size={14} />
                <span className="font-body text-sm font-semibold text-obsidian">{avgRating.toFixed(1)}</span>
                <Link href="#yorumlar" className="font-body text-sm text-obsidian/45 hover:text-allorea-600 transition-colors">
                  ({product.reviews.length} değerlendirme)
                </Link>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-4xl font-light text-obsidian">
                    {bundle.price.toLocaleString('tr-TR')}₺
                  </span>
                  {bundle.comparePrice && bundle.comparePrice > bundle.price && (
                    <>
                      <span className="font-body text-xl text-obsidian/30 line-through">
                        {bundle.comparePrice.toLocaleString('tr-TR')}₺
                      </span>
                      <span className="tag tag-gold">%{bundle.discountPercent} İndirim</span>
                    </>
                  )}
                </div>
                {bundle.savings && bundle.savings > 0 && (
                  <p className="font-body text-xs text-allorea-600 mt-1.5">
                    Bu paketle {bundle.savings.toLocaleString('tr-TR')}₺ tasarruf ediyorsunuz
                  </p>
                )}
              </div>

              {/* Stock warning */}
              {product.stock > 0 && product.stock < 20 && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-amber-50 border border-amber-200/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="font-body text-xs text-amber-700">
                    Stokta sadece {product.stock} adet kaldı
                  </span>
                </div>
              )}

              {/* Bundle selector */}
              <div className="mb-6">
                <BundleSelector
                  bundles={product.bundles}
                  selected={selectedBundle}
                  onChange={setSelectedBundle}
                />
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="font-body text-2xs text-obsidian/45 tracking-[0.2em] uppercase mb-3">Adet</p>
                <div className="inline-flex items-center border border-mist">
                  <button onClick={() => setQty(Math.max(1, qty-1))}
                    className="w-11 h-11 flex items-center justify-center text-obsidian/50 hover:text-obsidian hover:bg-champagne transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center font-body text-sm font-medium">{qty}</span>
                  <button onClick={() => setQty(Math.min(product.stock, qty+1))}
                    className="w-11 h-11 flex items-center justify-center text-obsidian/50 hover:text-obsidian hover:bg-champagne transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 mb-7">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.stock || adding}
                  className={cn(
                    'btn w-full justify-center gap-3 py-4 text-xs tracking-widest',
                    !product.stock
                      ? 'bg-mist text-obsidian/40 cursor-not-allowed'
                      : adding
                      ? 'bg-sage text-ivory'
                      : 'btn-primary'
                  )}
                >
                  <ShoppingBag size={16} />
                  {!product.stock ? 'Tükendi' : adding ? '✓ Sepete Eklendi' : 'Sepete Ekle'}
                </button>
                <button onClick={() => { handleAddToCart(); setTimeout(() => window.location.href='/checkout?method=cod', 500) }}
                  className="btn btn-outline w-full justify-center gap-3 py-4 text-xs tracking-widest">
                  💵 Kapıda Öde
                </button>
                <button onClick={handleWhatsApp}
                  className="btn w-full justify-center gap-2 py-3.5 text-xs bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/30 hover:bg-[#25D366]/20 tracking-widest">
                  <MessageCircle size={15} />
                  WhatsApp ile Sipariş
                </button>
              </div>

              {/* Trust */}
              <div className="flex items-center gap-5 py-5 border-y border-mist/40 mb-6">
                {TRUST.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <Icon size={13} className="text-allorea-500" />
                    <span className="font-body text-2xs text-obsidian/55">{text}</span>
                  </div>
                ))}
              </div>

              {/* Product features checklist */}
              <div className="space-y-2 mb-6">
                {['Klinik olarak test edilmiş', 'Paraben ve sülfatsız', 'Dermatolog tavsiyeli', '30 gün sonuç garantisi'].map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CheckCircle size={14} className="text-allorea-500 shrink-0" />
                    <span className="font-body text-sm text-obsidian/65">{f}</span>
                  </div>
                ))}
              </div>

              {/* Tab navigation */}
              <div className="border-t border-mist/40 pt-6">
                <div className="flex gap-0 border-b border-mist/40 mb-5">
                  {(['details','ingredients','howto'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'font-body text-2xs tracking-[0.15em] uppercase px-5 py-3 transition-all border-b-2 -mb-px',
                        activeTab === tab
                          ? 'text-allorea-600 border-allorea-600'
                          : 'text-obsidian/40 border-transparent hover:text-obsidian/70'
                      )}
                    >
                      {tab === 'details' ? 'Detaylar' : tab === 'ingredients' ? 'İçerikler' : 'Kullanım'}
                    </button>
                  ))}
                </div>

                {activeTab === 'details' && (
                  <div className="prose-luxury">
                    <p className="font-body text-sm text-obsidian/65 leading-relaxed">{product.description}</p>
                  </div>
                )}
                {activeTab === 'ingredients' && (
                  <div>
                    <p className="font-body text-sm text-obsidian/65 leading-relaxed">{product.ingredients}</p>
                  </div>
                )}
                {activeTab === 'howto' && (
                  <div className="space-y-3">
                    (product.howToUse ?? []).map((step, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-allorea-100 text-allorea-700 rounded-full flex items-center justify-center text-2xs font-body font-semibold shrink-0 mt-0.5">
                          {i+1}
                        </div>
                        <p className="font-body text-sm text-obsidian/65 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical results */}
      <section className="py-16 bg-champagne/40">
        <div className="container-main max-w-4xl">
          <div className="text-center mb-12">
            <div className="section-subtitle">Klinik Sonuçlar</div>
            <h2 className="display-sm text-obsidian">Bilimin Gücü</h2>
          </div>
          <div className="grid grid-cols-3 gap-px bg-mist/40">
            {[
              { n:'%47', text:'Saç dökülmesinde azalma', sub:'4. haftada' },
              { n:'%63', text:'Yeni tüy oluşumu',        sub:'8. haftada' },
              { n:'%31', text:'Yoğunluk artışı',         sub:'3. ayda' },
            ].map(s => (
              <div key={s.n} className="bg-ivory p-8 text-center">
                <p className="font-display text-5xl font-light text-allorea-600 mb-2">{s.n}</p>
                <p className="font-body text-sm text-obsidian/65">{s.text}</p>
                <p className="font-body text-2xs text-obsidian/35 mt-1 tracking-widest uppercase">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="section-pad bg-ivory">
        <div className="container-main max-w-2xl">
          <div className="text-center mb-12">
            <div className="section-subtitle">Gerçek Sonuçlar</div>
            <h2 className="display-sm text-obsidian">Kendiniz Görün</h2>
            <p className="body-sm mt-3">Kaydırarak önce/sonra görünümü karşılaştırın</p>
          </div>
          <BeforeAfterSlider
            beforeUrl="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=800&q=80"
            afterUrl="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
            beforeLabel="Önce"
            afterLabel="Sonra"
          />
        </div>
      </section>

      {/* Reviews */}
      <section className="section-pad bg-champagne/30" id="yorumlar">
        <div className="container-main max-w-3xl">
          <div className="text-center mb-12">
            <div className="section-subtitle">Müşteri Yorumları</div>
            <h2 className="display-sm text-obsidian">{product.reviews.length}+ Değerlendirme</h2>
          </div>
          <ReviewList reviews={product.reviews} productName={product.name} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-ivory">
        <div className="container-main max-w-2xl">
          <div className="text-center mb-12">
            <div className="section-subtitle">SSS</div>
            <h2 className="display-sm text-obsidian">Sıkça Sorulan Sorular</h2>
          </div>
          <FaqAccordion faqs={product.faqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-obsidian text-ivory text-center">
        <div className="container-main max-w-xl">
          <div className="section-subtitle text-allorea-400 mb-4">Sınırlı Stok</div>
          <h2 className="display-sm text-ivory mb-4">{product.tagline}</h2>
          <Stars rating={5} size={16} />
          <p className="body-sm text-white/50 mt-2 mb-8">{product.reviews.length} kişi satın aldı</p>
          <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
            className="btn btn-gold gap-3 py-5 px-12 text-xs tracking-widest">
            <ShoppingBag size={16} />
            Hemen Sipariş Ver
          </button>
        </div>
      </section>

      {/* Sticky mobile bar */}
      <StickyAddToCart
        price={bundle.price}
        onAdd={handleAddToCart}
        productName={product.name}
        inStock={product.stock > 0}
      />
    </div>
  )
}
