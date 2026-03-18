'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

function sanitizeRedirect(raw: string | null): string {
  if (!raw) return '/admin'
  if (/^https?:\/\//i.test(raw) || raw.startsWith('//')) return '/admin'
  if (!raw.startsWith('/')) return '/admin'
  return raw
}

export default function LoginForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const redirectTo   = sanitizeRedirect(searchParams.get('redirect'))

  const [form, setForm]   = useState({ email:'', password:'' })
  const [show, setShow]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const up = (k: string, v: string) => setForm(p => ({ ...p, [k]:v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res  = await fetch('/api/auth/login', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error || 'Giriş başarısız'); return }
      router.push(redirectTo)
      router.refresh()
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.')
    } finally { setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200">
          <AlertCircle size={16} className="text-red-500 shrink-0" />
          <p className="font-body text-sm text-red-700">{error}</p>
        </div>
      )}

      <div>
        <label className="block font-body text-2xs text-obsidian/50 tracking-[0.18em] uppercase mb-2">
          E-posta
        </label>
        <input
          type="email"
          value={form.email}
          onChange={e => up('email', e.target.value)}
          required
          placeholder="ornek@mail.com"
          className="input-field"
          autoComplete="email"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-2xs text-obsidian/50 tracking-[0.18em] uppercase">
            Şifre
          </label>
          <Link href="/forgot-password" className="font-body text-2xs text-allorea-600 hover:text-allorea-700 transition-colors">
            Unuttum
          </Link>
        </div>
        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            value={form.password}
            onChange={e => up('password', e.target.value)}
            required
            placeholder="••••••••"
            className="input-field pr-12"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-obsidian/35 hover:text-obsidian transition-colors"
          >
            {show ? <EyeOff size={16}/> : <Eye size={16}/>}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full justify-center py-4 disabled:opacity-60"
      >
        {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
      </button>

      <p className="text-center font-body text-sm text-obsidian/50">
        Hesabınız yok mu?{' '}
        <Link href="/register" className="text-allorea-600 hover:text-allorea-700 transition-colors">
          Kayıt Ol
        </Link>
      </p>
    </form>
  )
}
