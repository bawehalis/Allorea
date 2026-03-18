// src/lib/mock-data.ts — Allorea Cosmetics v2
// Uraw tarzı DTC satış funnel için örnek ürün verisi

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
  tagline: string          // kısa kampanya cümlesi
  description: string
  problemText: string      // Sorun anlatımı
  solutionText: string     // Çözüm anlatımı
  howToUse: string[]       // Adım adım kullanım
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
  badge?: string           // "En Çok Satan" / "Sınırlı Stok"
  categorySlug: string
}

// ─── ANA ÜRÜN — Saç Bakım Serumu ─────────────────────────────────────────────
const SAC_SERUMU_REVIEWS: Review[] = [
  {
    id: 'r1', name: 'Elif K.', rating: 5,
    title: 'İnanılmaz sonuç!',
    body: '3 haftada belirgin fark gördüm. Saçlarım artık çok daha dolgun ve güçlü. Önce inanmıyordum ama gerçekten işe yarıyor.',
    date: '12 Ocak 2025', isVerified: true,
    beforeImage: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=400&q=80',
    afterImage:  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'r2', name: 'Selin A.', rating: 5,
    title: 'Saçım büyüdü!',
    body: 'Doğum sonrası saç dökülmem çok fazlaydı. 2 ay kullanım sonrası yeni tüyler çıktı. Kesinlikle tavsiye ediyorum.',
    date: '8 Ocak 2025', isVerified: true,
  },
  {
    id: 'r3', name: 'Merve T.', rating: 5,
    title: 'Pişman olmayacaksınız',
    body: 'Annem de kullanmaya başladı. İkimiz de memnunuz. Duştan sonra tarakta kalan saç miktarı dramatik biçimde azaldı.',
    date: '2 Ocak 2025', isVerified: true,
  },
  {
    id: 'r4', name: 'Zeynep B.', rating: 4,
    title: 'Etkili ama sabır gerek',
    body: 'İlk ay sonuç göremedim, vazgeçecektim. 6. haftadan sonra farklılık başladı. Sabırlı olun, değiyor.',
    date: '28 Aralık 2024', isVerified: true,
  },
  {
    id: 'r5', name: 'Ayşe M.', rating: 5,
    title: 'Harika ürün',
    body: 'Hem anneme hem kendime aldım. Koku hafif ve hoş, saçlıkta rahatsızlık yaratmıyor. Çok memnunuz.',
    date: '20 Aralık 2024', isVerified: false,
  },
  {
    id: 'r6', name: 'Fatma D.', rating: 5,
    title: 'Beklediğimden çok iyi',
    body: '45 günde saçlarımın yoğunluğu gözle görülür arttı. Fiyat performans açısından da çok uygun.',
    date: '15 Aralık 2024', isVerified: true,
  },
]

export const SAC_SERUMU: SalesProduct = {
  id: 'sac-serumu-001',
  name: 'Allorea Saç Yoğunlaştırıcı Serum',
  slug: 'allorea-sac-yogunlastirici-serum',
  tagline: '30 Günde Görünür Fark — Ya Paranızı Geri Alın',
  description: 'Klinik olarak test edilmiş biotin, kafein ve keratin kompleksiyle formüle edilmiş güçlendirici serum. Saç derisini besler, saç dökülmesini yavaşlatır, yeni saç çıkışını destekler.',
  problemText: `**Saç dökülmesi yaşıyorsanız yalnız değilsiniz.**

Her sabah yastıkta, her gün duşta, her taramada düşen saçları görmek... Bu sadece estetik bir sorun değil, özgüveninizi de etkiliyor.

Kadınların %40'ı 35 yaşından sonra saç incelenmesi ve dökülmesi yaşıyor. Erkeklerin ise büyük çoğunluğu 50'li yaşlara kadar belirgin seyrelmeler fark ediyor.

Peki ne yapıyorsunuz? Pahalı şampuanlar, vitamin takviyeleri, belki doktora gidiyorsunuz... Ama hiçbiri kalıcı çözüm sunmuyor.`,
  solutionText: `**Allorea Serum farklı çalışıyor — saçın kökünden.**

Çünkü sorun sadece saç telinde değil, saç derisinde. Serum, özel mikro-kapsül teknolojisiyle aktif bileşenleri doğrudan saç köküne ulaştırır.

**Klinik sonuçlar:**
- 4. haftada saç dökülmesinde %47 azalma
- 8. haftada yeni tüy oluşumunda %63 artış
- 3. ayda saç yoğunluğunda %31 görünür iyileşme

**Her sabah 5 dakika** — Bu kadar. Serum saç derisine masaj yapılarak uygulanır, durulama gerekmez.`,
  howToUse: [
    'Saçlarınızı yıkayın ve havluyla kurutun',
    'Aplikatörle serumu doğrudan saç derisine 4-5 noktaya damlatın',
    'Parmak uçlarıyla 2-3 dakika nazikçe masaj yapın',
    'Durulamayın — gün içinde veya gecelik bırakın',
    'Haftada 5-7 gün düzenli kullanın',
  ],
  ingredients: 'Biotin %5, Kafein %1.5, Keratin Hidrolizat, Panthenol (B5), Niasinamid, Arginin, Çay Ağacı Yağı, Aloe Vera Özü',
  price: 349,
  comparePrice: 499,
  images: [
    { id: 'i1', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', alt: 'Allorea Saç Serumu', position: 0 },
    { id: 'i2', url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80', alt: 'Serum dokusu', position: 1 },
    { id: 'i3', url: 'https://images.unsplash.com/photo-1601049541271-d2dd2a8ef05b?auto=format&fit=crop&w=800&q=80', alt: 'Uygulama', position: 2 },
    { id: 'i4', url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?auto=format&fit=crop&w=800&q=80', alt: 'Ürün detayı', position: 3 },
  ],
  bundles: [
    {
      id: 'b1', label: '1 Adet', quantity: 1,
      price: 349, comparePrice: 499, discountPercent: 0,
      isMostPopular: false, savings: 0,
    },
    {
      id: 'b2', label: '3 Adet', quantity: 3,
      price: 799, comparePrice: 1497, discountPercent: 47,
      isMostPopular: true, savings: 698,
    },
    {
      id: 'b3', label: '5 Adet', quantity: 5,
      price: 1199, comparePrice: 2495, discountPercent: 52,
      isMostPopular: false, savings: 1296,
    },
  ],
  reviews: SAC_SERUMU_REVIEWS,
  faqs: [
    { question: 'Sonuçları ne zaman görürüm?', answer: 'İlk 2-4 haftada saç dökülmesinde azalma fark edersiniz. Yeni tüy çıkışı ve yoğunluk artışı genellikle 6-12. haftada belirginleşir. Bireysel sonuçlar farklılık gösterebilir.' },
    { question: 'Kadınlar da kullanabilir mi?', answer: 'Evet! Formülümüz hem kadın hem erkek saç dökülmesine karşı etkili olarak geliştirilmiştir. Hormonsal saç dökülmesi, stres kaynaklı dökülme ve mevsimsel dökülmede etkilidir.' },
    { question: 'Boyalı veya işlem görmüş saçlarda kullanılabilir mi?', answer: 'Evet, serum boyalı, röfle ve kimyasal işlem görmüş saçlarda güvenle kullanılabilir. Rengi etkilemez.' },
    { question: 'Durulamam gerekiyor mu?', answer: 'Hayır. Serum "leave-in" yani durulama gerektirmeyen bir formüle sahiptir. Saç derisine uygulandıktan sonra tamamen emilir.' },
    { question: 'Para iade garantisi var mı?', answer: '30 gün boyunca kullanın. Sonuç görmezseniz, ürünü iade ederek tam para iadenizi alın. Hiçbir soru sormuyoruz.' },
    { question: 'Kaç aylık kullanım önerilir?', answer: 'En iyi sonuç için en az 3 aylık düzenli kullanım önerilir. Bu nedenle 3\'lü ve 5\'li paketler en popüler seçeneklerimizdir.' },
  ],
  stock: 47,
  isBestSeller: true,
  isNew: false,
  badge: '⚡ Sınırlı Stok',
  categorySlug: 'hair-care',
}

// ─── TÜM ÜRÜNLER LİSTESİ ─────────────────────────────────────────────────────
export const ALL_PRODUCTS: SalesProduct[] = [SAC_SERUMU]

export function getProductBySlug(slug: string): SalesProduct | undefined {
  return ALL_PRODUCTS.find(p => p.slug === slug)
}

// ─── ANASAYFA İÇİN KISA ÜRÜN KARTI ──────────────────────────────────────────
export interface ProductCard {
  id: string
  name: string
  slug: string
  tagline: string
  price: number
  comparePrice: number
  image: string
  badge?: string
  rating: number
  reviewCount: number
  bestBundle?: ProductBundle
}

export const FEATURED_PRODUCTS: ProductCard[] = ALL_PRODUCTS.map(p => ({
  id:           p.id,
  name:         p.name,
  slug:         p.slug,
  tagline:      p.tagline,
  price:        p.price,
  comparePrice: p.comparePrice,
  image:        p.images[0]?.url || '',
  badge:        p.badge,
  rating:       4.9,
  reviewCount:  p.reviews.length,
  bestBundle:   p.bundles.find(b => b.isMostPopular),
}))

// Alias for backward compatibility with ShopContent
export const PRODUCTS = ALL_PRODUCTS.map(p => ({
  id:           p.id,
  name:         p.name,
  slug:         p.slug,
  description:  p.description,
  price:        p.price,
  comparePrice: p.comparePrice,
  sku:          p.id,
  stock:        p.stock,
  isActive:     true,
  isFeatured:   p.isBestSeller,
  isBestSeller: p.isBestSeller,
  isNew:        p.isNew,
  badge:        p.badge,
  category:     { id: p.categorySlug, name: p.categorySlug, slug: p.categorySlug },
  images:       p.images,
  averageRating: p.reviews.reduce((s,r)=>s+r.rating,0)/p.reviews.length,
  reviewCount:   p.reviews.length,
  createdAt:    '2024-01-01',
  updatedAt:    '2024-01-01',
}))


// ─── BLOG VERİSİ ──────────────────────────────────────────────────────────────
export interface BlogPostData {
  id: string; title: string; slug: string; excerpt: string
  content: string; image?: string; authorName: string
  tags: string[]; isPublished: boolean; publishedAt?: string; createdAt: string
}

export const BLOG_POSTS: BlogPostData[] = [
  {
    id: 'bp1',
    title: 'C Vitamini: Cilt Bakımının Altın Standardı',
    slug:  'c-vitamini-cilt-bakiminin-altin-standardi',
    excerpt: 'C vitamini neden dermatolojinin en değerli antioksidanıdır ve sabah rutininize nasıl dahil etmelisiniz?',
    content: 'C vitamini, dermatolojinin uzun süredir değer verdiği bir bileşendir. Antioksidan özellikleriyle serbest radikallere karşı mücadele eder, kolajen sentezini destekler ve hiperpigmentasyonu azaltır. Sabah rutininizdeki yerini aldığında, güneş hasarına karşı ekstra bir koruma katmanı oluşturur. Doğru konsantrasyon %10–20 arasında, pH 3.5 altında olmalıdır. Stabil kalması için amberköre veya opak ambalaj tercih edilmelidir.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    authorName: 'Dr. Isabelle Laurent',
    tags: ['Cilt Bakımı', 'C Vitamini', 'Antioksidan'],
    isPublished: true, publishedAt: '2025-01-15', createdAt: '2025-01-15',
  },
  {
    id: 'bp2',
    title: 'Yeni Başlayanlar İçin Cilt Bakım Rutini',
    slug:  'yeni-baslayanlar-icin-cilt-bakim-rutini',
    excerpt: 'Cilt bakımına nereden başlayacağınızı bilmiyor musunuz? İşte 5 adımlık başlangıç rehberi.',
    content: 'Etkili bir cilt bakım rutini oluşturmak göz korkutucu görünebilir. Ancak temel ürünlerle ve doğru sırayla başlamak yeterlidir. Temizleyici, tonik, serum, nemlendirici ve güneş koruyucu — bu beş ürün sağlıklı bir cildin temelini oluşturur. Her adımı sabahları ve akşamları uygulamak, uzun vadede görünür farklılıklar yaratır.',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    authorName: 'Sophia Chen',
    tags: ['Rutin', 'Başlangıç', 'Cilt Bakımı'],
    isPublished: true, publishedAt: '2025-01-08', createdAt: '2025-01-08',
  },
  {
    id: 'bp3',
    title: 'Saç Dökülmesiyle Başa Çıkmanın 7 Yolu',
    slug:  'sac-dokulmesiyle-basa-cikmak',
    excerpt: 'Stres kaynaklı, hormonal veya genetik saç dökülmesine karşı bilimsel temelli çözüm yolları.',
    content: 'Saç dökülmesi hem kadınları hem erkekleri etkileyen yaygın bir sorundur. Nedenine göre yaklaşım farklılaşır. Stres yönetimi, beslenme düzeni ve doğru bakım ürünlerinin kombinasyonu çoğu vakada görünür iyileşme sağlar. Klinik olarak kanıtlanmış bileşenler arasında minoksidil, kafein ve biyotin öne çıkar.',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=800&q=80',
    authorName: 'Dr. Mia Fontaine',
    tags: ['Saç Bakımı', 'Saç Dökülmesi', 'Bilim'],
    isPublished: true, publishedAt: '2025-01-22', createdAt: '2025-01-22',
  },
]

// Category display names
export const CATEGORY_NAMES: Record<string, string> = {
  'skincare':  'Cilt Bakımı',
  'makeup':    'Makyaj',
  'body-care': 'Vücut Bakımı',
  'fragrance': 'Parfüm',
  'hair-care': 'Saç Bakımı',
  'serums':    'Serumlar',
}
