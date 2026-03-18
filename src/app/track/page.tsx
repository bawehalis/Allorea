import { Suspense } from 'react'
import TrackContent from '@/components/ui/TrackContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sipariş Takibi | ALLOREA',
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] bg-ivory flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-mist border-t-allorea-500 rounded-full animate-spin" />
      </div>
    }>
      <TrackContent />
    </Suspense>
  )
}
