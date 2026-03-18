import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Basın | ALLOREA',
}

const COVERAGE = [
  { outlet:'Vogue Türkiye',   headline:'ALLOREA: Kozmetiğin Geleceği Türkiye\'den Geliyor',  date:'Ocak 2025' },
  { outlet:'Harper\'s Bazaar',headline:'En İyi Saç Serumları: ALLOREA Listede',                date:'Aralık 2024' },
  { outlet:'Milliyet',        headline:'Yerli Kozmetik Markası ALLOREA ile Tanışın',            date:'Kasım 2024' },
]

export default function PressPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-champagne/40 border-b border-mist/40">
        <div className="container-main py-14 text-center">
          <div className="section-subtitle mb-3">Medya</div>
          <h1 className="display-md text-obsidian">Basın Odası</h1>
          <div className="gold-line mt-6" />
        </div>
      </div>

      <div className="container-main py-14 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl font-light text-obsidian mb-6">Medyada ALLOREA</h2>
            <div className="space-y-5">
              {COVERAGE.map(item => (
                <div key={item.headline} className="border-l-2 border-allorea-300 pl-5 py-1">
                  <p className="eyebrow mb-1">{item.outlet} — {item.date}</p>
                  <p className="font-display text-base font-light text-obsidian leading-snug">&ldquo;{item.headline}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-light text-obsidian mb-6">Basın Kiti</h2>
            <div className="space-y-3 mb-8">
              {[
                { title:'Marka Logoları',       desc:'PNG + SVG formatlarında, tüm varyasyonlar' },
                { title:'Ürün Görselleri',       desc:'Yüksek çözünürlüklü ürün fotoğrafları' },
                { title:'Marka Hikâyesi',        desc:'Tek sayfalık marka brief (TR/EN)' },
                { title:'Yönetici Biyografileri',desc:'Fotoğraflar ve biyografiler' },
              ].map(item => (
                <div key={item.title} className="flex items-center justify-between p-4 bg-white border border-mist/50 hover:shadow-luxury transition-all">
                  <div>
                    <p className="font-body text-sm font-medium text-obsidian">{item.title}</p>
                    <p className="font-body text-xs text-obsidian/50 mt-0.5">{item.desc}</p>
                  </div>
                  <button className="btn-icon text-allorea-500 hover:text-allorea-700">
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-6 bg-champagne/40 border border-mist/40">
              <p className="font-display text-xl font-light text-obsidian mb-2">Medya İletişimi</p>
              <p className="font-body text-sm text-obsidian/60 mb-4">Röportaj talepleri ve basın sorgulamaları için:</p>
              <a href="mailto:press@allorea-cosmetics.com" className="font-body text-sm text-allorea-600 hover:text-allorea-700 transition-colors">
                press@allorea-cosmetics.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
