import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ArrowRight, Star, ShieldCheck, Truck, RotateCcw, Leaf, Award } from 'lucide-react'
import { SAC_SERUMU, FEATURED_PRODUCTS } from '@/lib/mock-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ALLOREA — Lüks Cilt ve Saç Bakımı',
  description: 'Bilimsel formüller, lüks deneyim. Dermatoloji onaylı, klinik test edilmiş güzellik ürünleri.',
}

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={size} className={s <= rating ? 'fill-allorea-500 text-allorea-500' : 'fill-mist text-mist'} />
      ))}
    </div>
  )
}

export default function HomePage() {
  const product   = SAC_SERUMU
  const avgRating = product.reviews.reduce((s,r)=>s+r.rating,0)/product.reviews.length
  const bestBundle = product.bundles.find(b=>b.isMostPopular)!

  return (
    <div className="bg-ivory">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Full-bleed cinematic
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-gradient-luxury" />
        <div className="absolute inset-0 opacity-30"
          style={{backgroundImage:"url('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1920&q=60')", backgroundSize:'cover', backgroundPosition:'center right'}} />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/95 via-ivory/80 to-ivory/20" />

        {/* Decorative element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-[45%] overflow-hidden">
          <div className="relative h-full">
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              priority
              className="object-cover object-center"
              sizes="50vw"
            />
            {/* Gradient overlay left side */}
            <div className="absolute inset-0 bg-gradient-to-r from-ivory via-transparent to-transparent" />
          </div>
        </div>

        <div className="container-main relative z-10 py-24">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 animate-fade-up" style={{animationDelay:'0.1s', animationFillMode:'both'}}>
              <span className="eyebrow">Yeni Koleksiyon 2025</span>
              <div className="h-px w-10 bg-allorea-400" />
              <div className="flex items-center gap-1.5">
                <StarRow rating={5} size={12} />
                <span className="font-body text-xs text-obsidian/60">{avgRating.toFixed(1)} ({product.reviews.length} yorum)</span>
              </div>
            </div>

            {/* Headline */}
            <h1
              className="display-xl text-obsidian mb-8 animate-fade-up"
              style={{animationDelay:'0.2s', animationFillMode:'both'}}
            >
              Saçın<br />
              <em className="text-gradient-gold not-italic">Gücünü</em><br />
              Geri Al
            </h1>

            {/* Description */}
            <p
              className="body-lg max-w-sm mb-10 animate-fade-up"
              style={{animationDelay:'0.3s', animationFillMode:'both'}}
            >
              Klinik test edilmiş biotin ve kafein kompleksiyle formüle edilmiş serum.
              30 günde görünür fark — ya paranızı geri alın.
            </p>

            {/* Social proof */}
            <div
              className="flex items-center gap-4 mb-8 animate-fade-up"
              style={{animationDelay:'0.35s', animationFillMode:'both'}}
            >
              <div className="flex -space-x-2">
                {['1622338242992','1596462502278','1598440947619','1544005088'].map((id,i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-ivory overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-${id}?w=64&q=80`} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-body text-xs font-semibold text-obsidian">2.847+ mutlu müşteri</p>
                <p className="font-body text-2xs text-obsidian/50">son 30 günde</p>
              </div>
            </div>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3 animate-fade-up"
              style={{animationDelay:'0.4s', animationFillMode:'both'}}
            >
              <Link href={`/product/${product.slug}`} className="btn btn-primary gap-3 py-4 px-8">
                Hemen Dene <ArrowRight size={16} />
              </Link>
              <Link href="/shop" className="btn btn-outline gap-3 py-4 px-8">
                Koleksiyonu Gör
              </Link>
            </div>

            {/* Guarantees */}
            <div
              className="flex flex-wrap gap-x-5 gap-y-2 mt-7 animate-fade-up"
              style={{animationDelay:'0.5s', animationFillMode:'both'}}
            >
              {[
                { icon: ShieldCheck, text: '30 Gün Garanti' },
                { icon: Truck,       text: 'Ücretsiz Kargo' },
                { icon: Leaf,        text: 'Doğal Formül' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon size={13} className="text-allorea-500" />
                  <span className="font-body text-xs text-obsidian/55">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-allorea-400" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TRUST MARQUEE
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-obsidian py-4 overflow-hidden">
        <div className="marquee-inner whitespace-nowrap">
          {[...Array(4)].map((_,i) => (
            <span key={i} className="inline-flex items-center gap-12 mr-12 shrink-0">
              {[
                '✦ 2.847 Mutlu Müşteri',
                '✦ Klinik Test Edilmiş',
                '✦ Dermatoloji Onaylı',
                '✦ Cruelty-Free',
                '✦ 30 Gün Para İadesi',
                '✦ Ücretsiz Kargo',
              ].map(t => (
                <span key={t} className="font-body text-xs tracking-[0.15em] uppercase text-white/50">{t}</span>
              ))}
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BRAND VALUES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-ivory">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-mist/50">
            {[
              { icon: Award,      title: 'Klinik Onaylı', desc: 'Dermatoloji test sonuçlarıyla doğrulanmış etkinlik' },
              { icon: Leaf,       title: '%100 Doğal',    desc: 'Paraben, sülfat ve silikon içermez' },
              { icon: ShieldCheck,title: '30 Gün İade',   desc: 'Sonuç görmezseniz tam iade garantisi' },
              { icon: Truck,      title: 'Hızlı Teslimat',desc: '1–3 iş günü içinde kapınıza' },
            ].map((item, i) => (
              <div key={item.title} className={cn(
                'p-8 lg:p-10 flex flex-col items-center text-center border-mist/50',
                i < 3 && 'border-r',
                i >= 2 && 'border-t lg:border-t-0'
              )}>
                <div className="w-12 h-12 rounded-full bg-champagne flex items-center justify-center mb-5">
                  <item.icon size={20} className="text-allorea-500" />
                </div>
                <p className="font-display text-base font-light text-obsidian mb-2">{item.title}</p>
                <p className="font-body text-xs text-obsidian/50 leading-relaxed max-w-[140px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FEATURED PRODUCT — Editorial hero
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-champagne/40 overflow-hidden">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image cluster */}
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
                <div className="w-full h-full bg-champagne overflow-hidden">
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-6 -right-6 bg-ivory border border-mist/50 p-4 shadow-luxury max-w-[160px]">
                  <StarRow rating={5} size={12} />
                  <p className="font-display text-2xl font-light text-obsidian mt-1">{avgRating.toFixed(1)}</p>
                  <p className="font-body text-2xs text-obsidian/50 mt-0.5">{product.reviews.length} doğrulanmış yorum</p>
                </div>
                {/* Small accent image */}
                {product.images[1] && (
                  <div className="absolute -top-4 -right-4 w-28 h-28 overflow-hidden border-4 border-ivory shadow-luxury">
                    <Image src={product.images[1].url} alt="" fill className="object-cover" sizes="112px" />
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="eyebrow mb-4">En Çok Satan</div>
              <h2 className="display-md text-obsidian mb-5">{product.name}</h2>
              <p className="body-md mb-8 max-w-md">{product.description}</p>

              {/* Clinical stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { n:'%47', label:'Dökülme azalması', sub:'4. haftada' },
                  { n:'%63', label:'Yeni tüy oluşumu', sub:'8. haftada' },
                  { n:'%31', label:'Yoğunluk artışı',  sub:'3. ayda' },
                ].map(s => (
                  <div key={s.n} className="text-center p-4 bg-ivory border border-mist/40">
                    <p className="font-display text-2xl font-light text-allorea-600">{s.n}</p>
                    <p className="font-body text-2xs text-obsidian/60 leading-tight mt-1">{s.label}</p>
                    <p className="font-body text-2xs text-obsidian/35 mt-0.5">{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-display text-3xl font-light text-obsidian">
                  {bestBundle.price.toLocaleString('tr-TR')}₺
                </span>
                {bestBundle.comparePrice && (
                  <span className="font-body text-base text-obsidian/35 line-through">
                    {bestBundle.comparePrice.toLocaleString('tr-TR')}₺
                  </span>
                )}
                {bestBundle.discountPercent > 0 && (
                  <span className="tag tag-gold">%{bestBundle.discountPercent} İndirim</span>
                )}
              </div>

              {/* Bundles mini */}
              <div className="flex gap-2 mb-7">
                {product.bundles.map(b => (
                  <Link
                    key={b.id}
                    href={`/product/${product.slug}`}
                    className={cn(
                      'flex-1 text-center py-2.5 font-body text-xs tracking-wider transition-all duration-200',
                      b.isMostPopular
                        ? 'bg-obsidian text-ivory'
                        : 'border border-mist text-obsidian/65 hover:border-obsidian hover:text-obsidian'
                    )}
                  >
                    {b.label}
                    {b.discountPercent > 0 && <span className="block text-2xs opacity-60">-%{b.discountPercent}</span>}
                  </Link>
                ))}
              </div>

              <Link href={`/product/${product.slug}`} className="btn btn-primary w-full sm:w-auto justify-center gap-3 py-4 px-10">
                Ürünü İncele <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          INGREDIENTS STORY
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-obsidian text-ivory relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{backgroundImage:'radial-gradient(ellipse at 20% 50%, rgba(181,128,79,0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(181,128,79,0.3) 0%, transparent 50%)'}} />

        <div className="container-main relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="eyebrow text-allorea-400 mb-4">Formül Felsefemiz</div>
            <h2 className="display-md text-ivory mb-5">
              Doğanın Gücü,<br />
              <em className="text-gradient-gold">Bilimin Hassasiyetiyle</em>
            </h2>
            <p className="body-md text-white/55">
              Her formül, onlarca klinik test ve dermatoloji onayından geçer.
              Sonuç: cildinizdeki gerçek, ölçülebilir değişim.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8">
            {[
              { ingredient:'Biotin %5', benefit:'Saç köklerini güçlendirir', origin:'Fermentasyon' },
              { ingredient:'Kafein %1.5', benefit:'Kan dolaşımını artırır', origin:'Yeşil çay özü' },
              { ingredient:'Keratin', benefit:'Saç telini onarır', origin:'Bitki bazlı' },
              { ingredient:'Panthenol B5', benefit:'Derin nem sağlar', origin:'Doğal türev' },
            ].map(item => (
              <div key={item.ingredient} className="bg-obsidian p-7 text-center">
                <div className="gold-line mb-5" />
                <p className="font-display text-base font-light text-ivory mb-2">{item.ingredient}</p>
                <p className="font-body text-xs text-white/50 leading-relaxed mb-3">{item.benefit}</p>
                <p className="font-body text-2xs text-allorea-500 tracking-widest uppercase">{item.origin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          REVIEWS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-ivory">
        <div className="container-main">
          <div className="section-header text-center">
            <div className="section-subtitle">Müşteri Yorumları</div>
            <h2 className="section-title">Onlar Denedi, Sonucu Gördü</h2>
            <div className="gold-line mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.reviews.slice(0,3).map((review, i) => (
              <div key={review.id} className={cn(
                'p-8 border border-mist/50 relative',
                i === 1 && 'md:-mt-4 md:mb-4 shadow-luxury'
              )}>
                <StarRow rating={review.rating} size={13} />
                <p className="font-display text-xl font-light text-obsidian mt-4 mb-3 leading-snug">
                  &ldquo;{review.title}&rdquo;
                </p>
                <p className="font-body text-sm text-obsidian/55 leading-relaxed line-clamp-4">
                  {review.body}
                </p>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-mist/40">
                  <div>
                    <p className="font-body text-xs font-semibold text-obsidian">{review.name}</p>
                    <p className="font-body text-2xs text-obsidian/40 mt-0.5">{review.date}</p>
                  </div>
                  {review.isVerified && (
                    <span className="tag tag-gold text-2xs">✓ Doğrulanmış</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href={`/product/${product.slug}#yorumlar`} className="btn btn-ghost gap-2">
              Tüm yorumları gör <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BUNDLE / PRICING
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-champagne/50">
        <div className="container-main max-w-4xl">
          <div className="section-header text-center">
            <div className="section-subtitle">Fiyatlandırma</div>
            <h2 className="section-title">Paketinizi Seçin</h2>
            <p className="body-md mt-4">Daha fazla alın, daha çok tasarruf edin</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {product.bundles.map(b => (
              <div key={b.id} className={cn(
                'relative bg-ivory p-8 border transition-all duration-300',
                b.isMostPopular
                  ? 'border-allorea-400 shadow-luxury-lg -mt-2 -mb-2'
                  : 'border-mist/60 hover:border-allorea-300 hover:shadow-luxury'
              )}>
                {b.isMostPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-allorea-600 text-ivory font-body text-2xs tracking-[0.15em] uppercase px-4 py-1">
                      En Popüler
                    </span>
                  </div>
                )}
                <p className="font-display text-xl font-light text-obsidian mb-1">{b.label}</p>
                {b.discountPercent > 0 && (
                  <span className="tag tag-gold mb-3 inline-block">%{b.discountPercent} tasarruf</span>
                )}
                <div className="my-5">
                  <div className="font-display text-3xl font-light text-obsidian">
                    {b.price.toLocaleString('tr-TR')}₺
                  </div>
                  {b.comparePrice && (
                    <div className="font-body text-sm text-obsidian/35 line-through mt-1">
                      {b.comparePrice.toLocaleString('tr-TR')}₺
                    </div>
                  )}
                  {b.savings && b.savings > 0 && (
                    <p className="font-body text-xs text-allorea-600 font-medium mt-1">
                      {b.savings.toLocaleString('tr-TR')}₺ tasarruf
                    </p>
                  )}
                </div>
                <Link
                  href={`/product/${product.slug}`}
                  className={cn(
                    'btn w-full justify-center py-3.5 text-xs tracking-widest',
                    b.isMostPopular
                      ? 'btn-primary'
                      : 'btn-outline'
                  )}
                >
                  Seç
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center font-body text-xs text-obsidian/40 mt-6 tracking-wider">
            💳 Kapıda ödeme · 🚚 299₺ üzeri ücretsiz kargo · 🔄 30 gün iade garantisi
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          NEWSLETTER
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-obsidian text-ivory relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10"
          style={{backgroundImage:'url(https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=40)', backgroundSize:'cover'}} />
        <div className="container-main relative z-10">
          <div className="max-w-xl">
            <div className="eyebrow text-allorea-400 mb-4">Bülten</div>
            <h2 className="display-sm text-ivory mb-4">İlk %15 İndiriminizi Kazanın</h2>
            <p className="body-md text-white/50 mb-8">
              Yeni koleksiyonlar, özel teklifler ve güzellik ipuçları için abone olun.
            </p>
            <form className="flex gap-3" onSubmit={e=>{e.preventDefault()}}>
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-5 py-4 bg-white/8 border border-white/15 text-ivory font-body text-sm placeholder-white/35 focus:outline-none focus:border-allorea-400 transition-colors"
              />
              <button type="submit" className="btn btn-gold px-6 py-4 shrink-0">
                Abone Ol
              </button>
            </form>
            <p className="font-body text-2xs text-white/30 mt-3 tracking-wider">
              Spam göndermiyoruz. İstediğiniz zaman aboneliği iptal edebilirsiniz.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}


