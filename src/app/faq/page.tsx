'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const FAQS = [
  { cat:'Sipariş & Kargo', items:[
    { q:'Siparişim ne zaman teslim edilir?',         a:'Standart kargo 3–5, ekspres kargo 1–2 iş günü içinde teslim edilir. 500₺ üzerindeki siparişlerde standart kargo ücretsizdir.' },
    { q:'Kargo takibini nasıl yapabilirim?',          a:'Sipariş onay e-postanızdaki takip bağlantısını kullanabilir veya /track adresini ziyaret edebilirsiniz.' },
    { q:'Kapıda ödeme seçeneği var mı?',              a:'Evet. Ödeme aşamasında "Kapıda Ödeme" seçeneğini seçebilirsiniz. Bu seçenek tüm Türkiye genelinde geçerlidir.' },
  ]},
  { cat:'Ürünler & Formüller', items:[
    { q:'Ürünleriniz dermatoloji test edilmiş mi?',   a:'Evet. Tüm formüllerimiz bağımsız dermatoloji laboratuvarlarında klinik olarak test edilmiş ve doğrulanmıştır.' },
    { q:'Ürünleriniz vegan mı?',                      a:'Evet. ALLOREA ürünleri %100 vegan ve cruelty-free formüllere sahiptir.' },
    { q:'Hamilelikte kullanabilir miyim?',             a:'Hamilelik ve emzirme döneminde doktorunuza danışmanızı öneririz.' },
  ]},
  { cat:'İade & Garanti', items:[
    { q:'30 gün garanti nasıl çalışıyor?',            a:'Ürünü 30 gün kullanın. Görünür bir fark yoksa, kullanılmış ambalajla bile tam para iadesi yapıyoruz. Hiçbir soru sormadan.' },
    { q:'İade süreci nedir?',                          a:'Ürünü aldığınız tarihten itibaren 30 gün içinde hello@allorea-cosmetics.com adresine e-posta gönderin. Kargo ücreti tarafımızca karşılanır.' },
    { q:'Para iade ne kadar sürer?',                   a:'İade onayından sonra 5–7 iş günü içinde ödeme yönteminize göre işlem tamamlanır.' },
  ]},
]

export default function FaqPage() {
  const [open, setOpen] = useState<string|null>(null)

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-champagne/40 border-b border-mist/40">
        <div className="container-main py-14 text-center">
          <div className="section-subtitle mb-3">Yardım Merkezi</div>
          <h1 className="display-md text-obsidian">Sıkça Sorulan Sorular</h1>
          <div className="gold-line mt-6" />
        </div>
      </div>

      <div className="container-main py-14 max-w-3xl">
        {FAQS.map(group => (
          <div key={group.cat} className="mb-10">
            <h2 className="font-display text-xl font-light text-obsidian mb-4 pb-3 border-b border-mist/40">{group.cat}</h2>
            <div className="divide-y divide-mist/30">
              {group.items.map(faq => {
                const id  = `${group.cat}-${faq.q}`
                const isOpen = open === id
                return (
                  <div key={id}>
                    <button onClick={() => setOpen(isOpen ? null : id)}
                      className="flex items-center justify-between w-full py-4.5 text-left gap-4 group">
                      <span className={cn('font-body text-sm font-medium transition-colors', isOpen ? 'text-allorea-600' : 'text-obsidian group-hover:text-allorea-500')}>
                        {faq.q}
                      </span>
                      <ChevronDown size={16} className={cn('text-obsidian/30 shrink-0 transition-transform duration-300', isOpen && 'rotate-180')} />
                    </button>
                    {isOpen && (
                      <div className="pb-5">
                        <p className="font-body text-sm text-obsidian/60 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="text-center mt-12 p-8 bg-champagne/40 border border-mist/40">
          <h3 className="font-display text-xl font-light text-obsidian mb-3">Yanıt bulamadınız mı?</h3>
          <p className="body-sm mb-5">Ekibimiz size yardımcı olmaktan mutluluk duyar.</p>
          <Link href="/contact" className="btn btn-primary py-3 px-8 text-xs">Bize Ulaşın</Link>
        </div>
      </div>
    </div>
  )
}
