'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Lock, Check, CreditCard, Truck, Phone, MessageCircle, Shield } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { cn } from '@/lib/utils'

type Step = 'information' | 'shipping' | 'payment'
type PayMethod = 'card' | 'cod' | 'whatsapp'

const COUNTRIES  = ['Türkiye','Almanya','Fransa','İngiltere','ABD','Hollanda']
const SHIPPING_M = [
  { id:'standard', label:'Standart Kargo', desc:'3-5 iş günü', price:49.90 },
  { id:'express',  label:'Ekspres Kargo',  desc:'1-2 iş günü', price:89.90 },
]

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore()
  const [step,       setStep]       = useState<Step>('information')
  const [payMethod,  setPayMethod]  = useState<PayMethod>('card')
  const [shipMethod, setShipMethod] = useState('standard')
  const [loading,    setLoading]    = useState(false)
  const [done,       setDone]       = useState(false)
  const [form, setForm] = useState({
    email:'', firstName:'', lastName:'', address:'', city:'', postalCode:'', country:'Türkiye', phone:'',
  })
  const [card, setCard] = useState({ number:'', name:'', expiry:'', cvv:'' })

  const sub    = subtotal()
  const ship   = sub >= 500 ? 0 : (SHIPPING_M.find(m=>m.id===shipMethod)?.price ?? 49.90)
  const total  = sub + ship

  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handlePlaceOrder = async () => {
    setLoading(true)
    if (payMethod === 'whatsapp') {
      const lines = items.map(i => `• ${i.name} × ${i.quantity}`).join('\n')
      const msg   = encodeURIComponent(`Merhaba! Sipariş vermek istiyorum:\n${lines}\nToplam: ${total.toLocaleString('tr-TR')}₺`)
      window.open(`https://wa.me/905001234567?text=${msg}`, '_blank')
      setLoading(false)
      return
    }
    await new Promise(r => setTimeout(r, 2000))
    setDone(true)
    clearCart()
  }

  if (done) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-allorea-100 flex items-center justify-center mx-auto mb-8">
            <Check size={28} className="text-allorea-600" />
          </div>
          <h1 className="display-sm text-obsidian mb-3">Siparişiniz Alındı</h1>
          <p className="body-md mb-8">Onay e-postası {form.email} adresinize gönderildi. Teşekkürler.</p>
          <div className="bg-champagne/40 border border-mist/40 p-6 mb-8 text-left">
            <p className="eyebrow mb-1">Sipariş No</p>
            <p className="font-display text-2xl font-light text-obsidian">ALR-{Date.now().toString(36).toUpperCase()}</p>
          </div>
          <Link href="/" className="btn btn-primary gap-2 justify-center w-full">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    )
  }

  const STEPS: Step[] = ['information','shipping','payment']
  const STEP_LABELS = { information:'Bilgiler', shipping:'Kargo', payment:'Ödeme' }

  return (
    <div className="bg-ivory min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* Left — Form */}
        <div className="px-6 sm:px-10 lg:px-16 py-10 lg:py-16 order-2 lg:order-1">
          {/* Logo */}
          <Link href="/" className="inline-block mb-10">
            <div className="font-display text-xl tracking-[0.25em] text-obsidian">ALLOREA</div>
          </Link>

          {/* Step breadcrumb */}
          <div className="flex items-center gap-2 mb-10">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <button
                  onClick={() => STEPS.indexOf(step) > i && setStep(s)}
                  className={cn(
                    'font-body text-xs transition-colors',
                    step === s ? 'text-obsidian font-medium' :
                    STEPS.indexOf(step) > i ? 'text-allorea-600 hover:text-allorea-700 cursor-pointer' : 'text-obsidian/30'
                  )}
                >
                  {STEP_LABELS[s]}
                </button>
                {i < 2 && <ChevronRight size={12} className="text-obsidian/20" />}
              </div>
            ))}
          </div>

          {/* INFORMATION */}
          {step === 'information' && (
            <div className="space-y-5 animate-fade-up">
              <div>
                <p className="font-body text-2xs text-obsidian/40 tracking-[0.2em] uppercase mb-4">İletişim</p>
                <div className="space-y-3">
                  <input placeholder="E-posta adresi" type="email" value={form.email}
                    onChange={e => upd('email', e.target.value)}
                    className="input-field py-3.5" />
                  <input placeholder="Telefon" type="tel" value={form.phone}
                    onChange={e => upd('phone', e.target.value)}
                    className="input-field py-3.5" />
                </div>
              </div>
              <div>
                <p className="font-body text-2xs text-obsidian/40 tracking-[0.2em] uppercase mb-4">Teslimat Adresi</p>
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Ad" value={form.firstName} onChange={e => upd('firstName',e.target.value)} className="input-field py-3.5" />
                  <input placeholder="Soyad" value={form.lastName} onChange={e => upd('lastName',e.target.value)} className="input-field py-3.5" />
                </div>
                <div className="mt-3 space-y-3">
                  <input placeholder="Adres" value={form.address} onChange={e => upd('address',e.target.value)} className="input-field py-3.5" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Şehir" value={form.city} onChange={e => upd('city',e.target.value)} className="input-field py-3.5" />
                    <input placeholder="Posta Kodu" value={form.postalCode} onChange={e => upd('postalCode',e.target.value)} className="input-field py-3.5" />
                  </div>
                  <select value={form.country} onChange={e => upd('country',e.target.value)} className="input-field py-3.5 appearance-none">
                    {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <button
                onClick={() => setStep('shipping')}
                disabled={!form.email || !form.firstName}
                className="btn btn-primary w-full justify-center gap-2 py-4"
              >
                Devam — Kargo <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* SHIPPING */}
          {step === 'shipping' && (
            <div className="space-y-4 animate-fade-up">
              <p className="font-body text-2xs text-obsidian/40 tracking-[0.2em] uppercase mb-4">Kargo Yöntemi</p>
              {SHIPPING_M.map(m => (
                <label key={m.id} className={cn(
                  'flex items-center justify-between p-5 border cursor-pointer transition-all',
                  shipMethod === m.id ? 'border-allorea-500 bg-allorea-50/40' : 'border-mist hover:border-allorea-300'
                )}>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-4 h-4 rounded-full border-2 flex items-center justify-center',
                      shipMethod === m.id ? 'border-allorea-500' : 'border-mist'
                    )}>
                      {shipMethod === m.id && <div className="w-2 h-2 rounded-full bg-allorea-500" />}
                    </div>
                    <input type="radio" name="ship" value={m.id} checked={shipMethod===m.id} onChange={e=>setShipMethod(e.target.value)} className="sr-only" />
                    <div>
                      <p className="font-body text-sm font-medium text-obsidian">{m.label}</p>
                      <p className="font-body text-xs text-obsidian/45">{m.desc}</p>
                    </div>
                  </div>
                  <span className="font-body text-sm font-semibold text-obsidian">
                    {sub >= 500 && m.id==='standard' ? <span className="text-allorea-600">Ücretsiz</span> : `${m.price.toFixed(2)}₺`}
                  </span>
                </label>
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep('information')} className="btn btn-ghost border border-mist py-4 px-6 text-xs">← Geri</button>
                <button onClick={() => setStep('payment')} className="btn btn-primary flex-1 justify-center gap-2 py-4">Devam — Ödeme <ChevronRight size={16} /></button>
              </div>
            </div>
          )}

          {/* PAYMENT */}
          {step === 'payment' && (
            <div className="space-y-5 animate-fade-up">
              <p className="font-body text-2xs text-obsidian/40 tracking-[0.2em] uppercase mb-4">Ödeme Yöntemi</p>

              {/* Pay method selector */}
              <div className="space-y-2">
                {[
                  { id:'card'      as PayMethod, Icon:CreditCard,   label:'Kredi / Banka Kartı' },
                  { id:'cod'       as PayMethod, Icon:Truck,         label:'Kapıda Ödeme' },
                  { id:'whatsapp'  as PayMethod, Icon:MessageCircle, label:'WhatsApp ile Sipariş' },
                ].map(({ id, Icon, label }) => (
                  <button key={id} onClick={() => setPayMethod(id)}
                    className={cn(
                      'flex items-center gap-4 w-full px-5 py-4 border text-left transition-all',
                      payMethod===id ? 'border-allorea-500 bg-allorea-50/40' : 'border-mist hover:border-allorea-300'
                    )}>
                    <div className={cn(
                      'w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0',
                      payMethod===id ? 'border-allorea-500' : 'border-mist'
                    )}>
                      {payMethod===id && <div className="w-2 h-2 rounded-full bg-allorea-500" />}
                    </div>
                    <Icon size={16} className="text-obsidian/50 shrink-0" />
                    <span className="font-body text-sm text-obsidian">{label}</span>
                  </button>
                ))}
              </div>

              {/* Card fields */}
              {payMethod === 'card' && (
                <div className="space-y-3 p-5 bg-champagne/20 border border-mist/40">
                  <input placeholder="Kart numarası" value={card.number}
                    onChange={e => setCard(p=>({...p,number:e.target.value.replace(/\D/g,'').slice(0,16)}))}
                    className="input-field py-3.5 font-mono tracking-widest" maxLength={16} />
                  <input placeholder="Ad Soyad" value={card.name}
                    onChange={e => setCard(p=>({...p,name:e.target.value}))}
                    className="input-field py-3.5" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM/YY" value={card.expiry}
                      onChange={e => setCard(p=>({...p,expiry:e.target.value}))}
                      className="input-field py-3.5" maxLength={5} />
                    <input placeholder="CVV" value={card.cvv}
                      onChange={e => setCard(p=>({...p,cvv:e.target.value.replace(/\D/g,'').slice(0,4)}))}
                      className="input-field py-3.5" maxLength={4} />
                  </div>
                </div>
              )}

              {payMethod === 'cod' && (
                <div className="p-4 bg-amber-50/60 border border-amber-200/50">
                  <p className="font-body text-sm text-obsidian/70">
                    Siparişiniz kargoya verilir, teslimatta nakit veya kartla ödeme yaparsınız. +15₺ hizmet bedeli uygulanır.
                  </p>
                </div>
              )}

              {payMethod === 'whatsapp' && (
                <div className="p-4 bg-green-50/60 border border-green-200/50">
                  <p className="font-body text-sm text-obsidian/70">
                    Sipariş detaylarınız WhatsApp'a yönlendirilecek. Ekibimiz sizi arayarak siparişi onaylayacak.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 text-obsidian/35">
                <Lock size={13} />
                <span className="font-body text-2xs tracking-wider">256-bit SSL ile şifreli güvenli ödeme</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep('shipping')} className="btn btn-ghost border border-mist py-4 px-6 text-xs">← Geri</button>
                <button onClick={handlePlaceOrder} disabled={loading}
                  className="btn btn-primary flex-1 justify-center gap-2 py-4">
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" /> İşleniyor…</>
                  ) : payMethod==='whatsapp' ? (
                    <><MessageCircle size={16}/> WhatsApp'a Gönder</>
                  ) : (
                    <><Lock size={15}/> Siparişi Tamamla · {total.toLocaleString('tr-TR')}₺</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right — Summary */}
        <div className="bg-champagne/30 border-l border-mist/40 px-6 sm:px-10 lg:px-16 py-10 lg:py-16 order-1 lg:order-2">
          <h2 className="font-body text-2xs tracking-[0.2em] uppercase text-obsidian/40 mb-6">Sipariş Özeti</h2>

          <ul className="space-y-4 mb-8">
            {items.map(item => (
              <li key={item.id} className="flex gap-4">
                <div className="relative w-16 h-20 bg-ivory border border-mist/40 shrink-0 overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-allorea-600 text-ivory text-2xs font-body font-medium flex items-center justify-center rounded-full">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm text-obsidian leading-snug">{item.name}</p>
                  {item.variant && <p className="font-body text-2xs text-obsidian/40 mt-0.5">{item.variant}</p>}
                  <p className="font-body text-sm font-semibold text-obsidian mt-1">
                    {(item.price * item.quantity).toLocaleString('tr-TR')}₺
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-mist/40 pt-5 space-y-3">
            <div className="flex justify-between">
              <span className="font-body text-sm text-obsidian/55">Ara Toplam</span>
              <span className="font-body text-sm text-obsidian">{sub.toLocaleString('tr-TR')}₺</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-sm text-obsidian/55">Kargo</span>
              <span className="font-body text-sm text-obsidian">
                {ship === 0 ? <span className="text-allorea-600">Ücretsiz</span> : `${ship.toFixed(2)}₺`}
              </span>
            </div>
            <div className="flex justify-between pt-4 border-t border-mist/40">
              <span className="font-body text-sm font-semibold text-obsidian">Toplam</span>
              <span className="font-display text-2xl font-light text-obsidian">{total.toLocaleString('tr-TR')}₺</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
