'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm]   = useState({ name:'', email:'', subject:'', message:'' })
  const [status, setStatus] = useState<'idle'|'loading'|'done'>('idle')

  const up = (k: string, v: string) => setForm(p => ({ ...p, [k]:v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    await new Promise(r => setTimeout(r, 1500))
    setStatus('done')
  }

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <div className="bg-champagne/40 border-b border-mist/40">
        <div className="container-main py-14 text-center">
          <div className="section-subtitle mb-3">Bize Ulaşın</div>
          <h1 className="display-md text-obsidian">Buradayız</h1>
          <div className="gold-line mt-6" />
        </div>
      </div>

      <div className="container-main py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">

          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-2xl font-light text-obsidian mb-5">Bilgiler</h2>
              <div className="space-y-5">
                {[
                  { icon:Mail,    title:'E-posta',  info:'hello@allorea-cosmetics.com', sub:'24 saat içinde yanıt' },
                  { icon:Phone,   title:'Telefon',  info:'+90 850 000 00 00', sub:'Pzt–Cum 09:00–18:00' },
                  { icon:MapPin,  title:'Adres',    info:'Maslak, İstanbul, Türkiye', sub:'Merkez ofis' },
                  { icon:Clock,   title:'Çalışma',  info:'Pazartesi – Cuma', sub:'09:00 – 18:00' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 bg-champagne flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={16} className="text-allorea-500" />
                    </div>
                    <div>
                      <p className="font-body text-2xs text-obsidian/40 tracking-widest uppercase mb-0.5">{item.title}</p>
                      <p className="font-body text-sm font-medium text-obsidian">{item.info}</p>
                      <p className="font-body text-xs text-obsidian/50 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {status === 'done' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-allorea-100 flex items-center justify-center mb-6">
                  <CheckCircle size={28} className="text-allorea-600" />
                </div>
                <h3 className="font-display text-2xl font-light text-obsidian mb-3">Mesajınız alındı</h3>
                <p className="font-body text-sm text-obsidian/55">En kısa sürede size dönüş yapacağız.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-2xs text-obsidian/50 tracking-[0.18em] uppercase mb-2">Ad Soyad</label>
                    <input type="text" value={form.name} onChange={e=>up('name',e.target.value)}
                      required className="input-field" placeholder="Adınız" />
                  </div>
                  <div>
                    <label className="block font-body text-2xs text-obsidian/50 tracking-[0.18em] uppercase mb-2">E-posta</label>
                    <input type="email" value={form.email} onChange={e=>up('email',e.target.value)}
                      required className="input-field" placeholder="ornek@mail.com" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-2xs text-obsidian/50 tracking-[0.18em] uppercase mb-2">Konu</label>
                  <input type="text" value={form.subject} onChange={e=>up('subject',e.target.value)}
                    required className="input-field" placeholder="Nasıl yardımcı olabiliriz?" />
                </div>
                <div>
                  <label className="block font-body text-2xs text-obsidian/50 tracking-[0.18em] uppercase mb-2">Mesaj</label>
                  <textarea value={form.message} onChange={e=>up('message',e.target.value)}
                    rows={6} required className="input-field resize-none"
                    placeholder="Mesajınızı yazın…" />
                </div>
                <button type="submit" disabled={status==='loading'}
                  className="btn btn-primary w-full justify-center py-4 gap-2 disabled:opacity-60">
                  {status==='loading' ? 'Gönderiliyor…' : 'Mesaj Gönder'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
