import { Suspense } from 'react'
import CheckoutSuccessContent from '@/components/ui/CheckoutSuccessContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sipariş Onaylandı | ALLOREA',
  description: 'Siparişiniz başarıyla alındı.',
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-mist border-t-allorea-500 rounded-full animate-spin" />
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
