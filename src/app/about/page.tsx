import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Leaf, Award, Heart, Globe, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hakkımızda | ALLOREA',
  description: 'ALLOREA\'nın hikâyesi — bilim, doğa ve lüksün kesişiminde.',
}

export default function AboutPage() {
  return (
    <div className="bg-ivory min-h-screen">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-obsidian">
          <img
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1920&q=60"
            alt="ALLOREA Lab"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        </div>
        <div className="container-main relative z-10 pb-16">
          <div className="section-subtitle text-allorea-400 mb-4">Biz Kimiz</div>
          <h1 className="display-xl text-ivory max-w-3xl">
            Güzellik Bir<br />
            <em className="text-gradient-gold">Bilim Dalıdır</em>
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section id="story" className="section-pad bg-ivory">
        <div className="container-main max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="section-subtitle mb-4">Misyonumuz</div>
              <h2 className="display-sm text-obsidian mb-6">Klinik etkinlik, lüks deneyim</h2>
              <div className="space-y-4 body-md">
                <p>ALLOREA, doğanın zenginliğini bilimin hassasiyetiyle buluşturan bir güzellik markasıdır. Her ürünümüz, saçınızın ve cildinizin gerçek ihtiyaçlarını karşılamak için formüle edilmiştir.</p>
                <p>Dermatoloji laboratuvarlarımızda yüzlerce klinik test geçiren formüllerimiz, yalnızca görünmez değil — ölçülebilir sonuçlar verir.</p>
                <p>Cruelty-free. Sürdürülebilir kaynaklı. Her zaman şeffaf.</p>
              </div>
            </div>
            <div className="relative aspect-[4/5] bg-champagne overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
                alt="ALLOREA formül"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-champagne/30">
        <div className="container-main">
          <div className="text-center mb-14">
            <div className="section-subtitle">Değerlerimiz</div>
            <h2 className="section-title">Her Kararda Temel Alan</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award,  title:'Klinik Mükemmellik', desc:'Her formül dermatoloji onayından geçer. Pazara çıkmadan önce klinik testlerde minimum %40 etkinlik ispatlanır.' },
              { icon: Leaf,   title:'Doğal & Temiz',       desc:'Paraben, sülfat, yapay koku ve zararlı dolgu maddesi kullanmıyoruz. İçerik listemiz her zaman şeffaftır.' },
              { icon: Heart,  title:'Cruelty-Free',        desc:'PETA sertifikalı. Hiçbir ürünümüz ya da bileşenimiz hayvan deneyine tabi tutulmaz.' },
              { icon: Globe,  title:'Sürdürülebilir',       desc:'Bileşenlerimizin %80\'i etik kaynaklıdır. Ambalajlarımız geri dönüştürülebilir veya yenilenebilir malzemelerden üretilir.' },
            ].map(v => (
              <div key={v.title} className="bg-ivory border border-mist/50 p-8 hover:shadow-luxury transition-all duration-300">
                <div className="w-12 h-12 bg-champagne flex items-center justify-center mb-6">
                  <v.icon size={20} className="text-allorea-500" />
                </div>
                <h3 className="font-display text-xl font-light text-obsidian mb-3">{v.title}</h3>
                <p className="font-body text-sm text-obsidian/55 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="section-pad bg-obsidian text-ivory">
        <div className="container-main max-w-4xl">
          <div className="text-center mb-14">
            <div className="section-subtitle text-allorea-400">Sürdürülebilirlik</div>
            <h2 className="display-sm text-ivory">Gezegene Karşı Taahhüdümüz</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/8">
            {[
              { n:'%80',  label:'Etik kaynaklı bileşen', sub:'tedarik zinciri' },
              { n:'2030', label:'Karbon nötr hedefi',     sub:'taahhüt yılı' },
              { n:'%100', label:'Geri dönüştürülebilir',  sub:'ambalaj hedefi' },
            ].map(s => (
              <div key={s.n} className="bg-obsidian p-10 text-center">
                <p className="font-display text-5xl font-light text-gradient-gold">{s.n}</p>
                <p className="font-body text-sm text-white/60 mt-2">{s.label}</p>
                <p className="font-body text-2xs text-white/30 tracking-widest uppercase mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-champagne/40 text-center">
        <div className="container-main max-w-xl">
          <h2 className="display-sm text-obsidian mb-4">Koleksiyonumuzu Keşfedin</h2>
          <p className="body-md mb-8">Her ürünün arkasında saatlerce bilimsel çalışma var.</p>
          <Link href="/shop" className="btn btn-primary gap-3 py-4 px-10">
            Tüm Ürünler <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
