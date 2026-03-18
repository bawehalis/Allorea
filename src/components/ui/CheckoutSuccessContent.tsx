'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, ArrowRight, Download } from 'lucide-react'

export default function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id') ?? searchParams.get('session_id') ?? ''

  const STEPS = [
    { icon:'📦', label:'Sipariş Alındı',     done:true },
    { icon:'⚙️', label:'Hazırlanıyor',        done:false },
    { icon:'🚚', label:'Kargoya Verildi',     done:false },
    { icon:'✅', label:'Teslim Edildi',       done:false },
  ]

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Success icon */}
        <div className="w-20 h-20 bg-allorea-100 flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={36} className="text-allorea-600" />
        </div>

        <div className="section-subtitle mb-3">Teşekkürler</div>
        <h1 className="display-sm text-obsidian mb-4">Siparişiniz Alındı</h1>
        <p className="body-md mb-2">
          Onay e-postası kısa süre içinde gönderilecek.
        </p>
        {orderId && (
          <p className="font-body text-sm text-obsidian/50 mb-8">
            Sipariş no: <span className="font-semibold text-obsidian">{orderId}</span>
          </p>
        )}

        <div className="gold-line mx-auto mb-10" />

        {/* Progress steps */}
        <div className="bg-champagne/40 border border-mist/40 p-6 mb-8">
          <p className="eyebrow mb-5">Sipariş Durumu</p>
          <div className="flex items-center justify-between">
            {STEPS.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center gap-2 flex-1">
                <div className={`w-10 h-10 flex items-center justify-center text-lg rounded-full border-2 transition-all
                  ${step.done
                    ? 'border-allorea-500 bg-allorea-50'
                    : 'border-mist bg-white text-obsidian/25'
                  }`}>
                  {step.done ? step.icon : '○'}
                </div>
                <p className="font-body text-2xs text-obsidian/50 leading-tight text-center">{step.label}</p>
                {i < STEPS.length - 1 && (
                  <div className="absolute" style={{
                    /* connector drawn via grid — handled by flex */ 
                  }}/>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { emoji:'📬', title:'E-posta Onayı',   desc:'Birkaç dakika içinde' },
            { emoji:'🚚', title:'Hızlı Teslimat',  desc:'1-3 iş günü' },
            { emoji:'🔄', title:'Kolay İade',       desc:'30 gün içinde' },
          ].map(i => (
            <div key={i.title} className="p-4 bg-white border border-mist/40">
              <div className="text-2xl mb-1">{i.emoji}</div>
              <p className="font-body text-xs font-semibold text-obsidian">{i.title}</p>
              <p className="font-body text-2xs text-obsidian/45 mt-0.5">{i.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/track" className="btn btn-primary gap-2 py-4 px-8">
            <Package size={16}/> Siparişi Takip Et
          </Link>
          <Link href="/shop" className="btn btn-outline gap-2 py-4 px-8">
            Alışverişe Devam <ArrowRight size={16}/>
          </Link>
        </div>
      </div>
    </div>
  )
}
