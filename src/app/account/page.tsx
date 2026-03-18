'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, Package, Heart, MapPin, LogOut, Edit2, CheckCircle, Loader2 } from 'lucide-react'

interface AuthUser { id: string; email: string; name?: string; role: string }

const ACCOUNT_NAV = [
  { href:'/account',           icon:User,    label:'Profil' },
  { href:'/account/orders',    icon:Package, label:'Siparişlerim' },
  { href:'/wishlist',          icon:Heart,   label:'Favorilerim' },
  { href:'/account/addresses', icon:MapPin,  label:'Adreslerim' },
]

export default function AccountPage() {
  const router = useRouter()
  const [user,    setUser]    = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [name,    setName]    = useState('')
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(j => {
        if (!j?.data) { router.push('/login'); return }
        setUser(j.data)
        setName(j.data.name ?? '')
      })
      .finally(() => setLoading(false))
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method:'POST' })
    router.push('/')
    router.refresh()
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res  = await fetch('/api/auth/me', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ name }) })
      const json = await res.json()
      if (res.ok) { setUser(json.data); setSaved(true); setEditing(false); setTimeout(()=>setSaved(false),3000) }
    } finally { setSaving(false) }
  }

  if (loading) return (
    <div className="min-h-[60vh] bg-ivory flex items-center justify-center">
      <Loader2 size={24} className="animate-spin text-allorea-400" />
    </div>
  )

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-champagne/40 border-b border-mist/40">
        <div className="container-main py-10">
          <div className="section-subtitle mb-1">Merhaba, {user?.name?.split(' ')[0] ?? 'Misafir'}</div>
          <h1 className="display-sm text-obsidian">Hesabım</h1>
        </div>
      </div>

      <div className="container-main py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar nav */}
          <aside>
            <nav className="space-y-0.5">
              {ACCOUNT_NAV.map(n => (
                <Link key={n.href} href={n.href}
                  className="flex items-center gap-3 px-4 py-3 font-body text-sm text-obsidian/65 hover:text-obsidian hover:bg-champagne/40 transition-all border-l-2 border-transparent hover:border-allorea-400">
                  <n.icon size={15} className="shrink-0" /> {n.label}
                </Link>
              ))}
              <button onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 font-body text-sm text-obsidian/40 hover:text-red-600 hover:bg-red-50 transition-all border-l-2 border-transparent">
                <LogOut size={15} className="shrink-0" /> Çıkış Yap
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile card */}
            <div className="bg-white border border-mist/40 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-light text-obsidian">Profil Bilgileri</h2>
                {!editing && (
                  <button onClick={() => setEditing(true)}
                    className="flex items-center gap-1.5 font-body text-xs text-allorea-600 hover:text-allorea-700 transition-colors">
                    <Edit2 size={13}/> Düzenle
                  </button>
                )}
              </div>

              {saved && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-allorea-50 border border-allorea-200">
                  <CheckCircle size={14} className="text-allorea-600" />
                  <p className="font-body text-sm text-allorea-700">Profiliniz güncellendi.</p>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <p className="font-body text-2xs text-obsidian/40 tracking-[0.18em] uppercase mb-2">Ad Soyad</p>
                  {editing ? (
                    <input value={name} onChange={e=>setName(e.target.value)}
                      className="input-field" placeholder="Adınız Soyadınız" />
                  ) : (
                    <p className="font-body text-sm text-obsidian">{user?.name ?? '—'}</p>
                  )}
                </div>
                <div>
                  <p className="font-body text-2xs text-obsidian/40 tracking-[0.18em] uppercase mb-2">E-posta</p>
                  <p className="font-body text-sm text-obsidian">{user?.email}</p>
                  <p className="font-body text-2xs text-obsidian/40 mt-0.5">E-posta adresi değiştirilemez.</p>
                </div>

                {editing && (
                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSave} disabled={saving}
                      className="btn btn-primary py-3 px-7 text-xs disabled:opacity-60">
                      {saving ? 'Kaydediliyor…' : 'Kaydet'}
                    </button>
                    <button onClick={() => { setEditing(false); setName(user?.name ?? '') }}
                      className="btn btn-ghost py-3 px-5 text-xs">
                      İptal
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { href:'/account/orders',    icon:Package, label:'Siparişlerim',  desc:'Geçmiş ve aktif siparişler' },
                { href:'/wishlist',          icon:Heart,   label:'Favorilerim',   desc:'Kaydettiğiniz ürünler' },
                { href:'/account/addresses', icon:MapPin,  label:'Adreslerim',    desc:'Kayıtlı teslimat adresleri' },
              ].map(n => (
                <Link key={n.href} href={n.href}
                  className="group p-6 bg-white border border-mist/40 hover:shadow-luxury hover:border-allorea-200 transition-all duration-300">
                  <n.icon size={20} className="text-allorea-400 mb-3 group-hover:text-allorea-600 transition-colors" />
                  <p className="font-body text-sm font-medium text-obsidian mb-1">{n.label}</p>
                  <p className="font-body text-xs text-obsidian/45">{n.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
