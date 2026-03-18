'use client'
import { useState } from 'react'
import { Save, Check, Store, Mail, Lock, Globe } from 'lucide-react'

type Tab = 'store' | 'email' | 'security'

export default function AdminSettingsPage() {
  const [tab,   setTab]   = useState<Tab>('store')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const TABS: { id: Tab; label: string; icon: any }[] = [
    { id:'store',    label:'Mağaza',   icon:Store },
    { id:'email',    label:'E-posta',  icon:Mail },
    { id:'security', label:'Güvenlik', icon:Lock },
  ]

  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Ayarlar</h1>
        <p className="text-sm text-slate-500 mt-0.5">Mağaza yapılandırma ayarları</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100">
        {/* Tab bar */}
        <div className="flex border-b border-slate-100">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-allorea-500 text-allorea-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}>
              <t.icon size={15} /> {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-5">
          {tab === 'store' && (
            <>
              {[
                { label:'Mağaza Adı',    key:'storeName',  placeholder:'ALLOREA Cosmetics', type:'text' },
                { label:'Site URL',       key:'siteUrl',    placeholder:'https://allorea-cosmetics.com', type:'url' },
                { label:'İletişim E-posta',key:'contactEmail',placeholder:'hello@allorea-cosmetics.com', type:'email' },
                { label:'Telefon',        key:'phone',      placeholder:'+90 850 000 00 00', type:'tel' },
                { label:'Ücretsiz Kargo Limiti (₺)', key:'freeShip', placeholder:'500', type:'number' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder}
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-allorea-400/40" />
                </div>
              ))}
            </>
          )}
          {tab === 'email' && (
            <>
              {[
                { label:'SMTP Host',     placeholder:'smtp.gmail.com' },
                { label:'SMTP Port',     placeholder:'587' },
                { label:'SMTP Kullanıcı',placeholder:'ornek@gmail.com' },
                { label:'SMTP Şifre',    placeholder:'••••••••', type:'password' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">{f.label}</label>
                  <input type={f.type ?? 'text'} placeholder={f.placeholder}
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-allorea-400/40" />
                </div>
              ))}
            </>
          )}
          {tab === 'security' && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Mevcut Şifre</label>
                <input type="password" placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-allorea-400/40" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Yeni Şifre</label>
                <input type="password" placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-allorea-400/40" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Yeni Şifre (Tekrar)</label>
                <input type="password" placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-allorea-400/40" />
              </div>
            </>
          )}

          <button onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              saved
                ? 'bg-green-100 text-green-700'
                : 'bg-allorea-600 text-white hover:bg-allorea-700'
            }`}>
            {saved ? <><Check size={14}/> Kaydedildi</> : <><Save size={14}/> Kaydet</>}
          </button>
        </div>
      </div>
    </div>
  )
}
