'use client'

import { notFound } from 'next/navigation'
import { useState } from 'react'
import { getProductBySlug } from '@/lib/mock-data'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)

  if (!product) return notFound()

  const [activeTab, setActiveTab] = useState<'details' | 'howto' | 'faq'>('details')

  const avgRating =
    (product.reviews ?? []).reduce((s, r) => s + r.rating, 0) /
    ((product.reviews ?? []).length || 1)

  const bestBundle =
    (product.bundles ?? []).find((b) => b.isMostPopular) ||
    product.bundles?.[0]

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      
      {/* TITLE */}
      <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>

      {product.tagline && (
        <p className="text-sm text-gray-500 mb-4">{product.tagline}</p>
      )}

      {/* PRICE */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-2xl font-bold">
          {bestBundle?.price}₺
        </span>

        {bestBundle?.comparePrice && (
          <span className="line-through text-gray-400">
            {bestBundle.comparePrice}₺
          </span>
        )}
      </div>

      {/* RATING */}
      <p className="mb-6 text-sm text-gray-600">
        ⭐ {avgRating.toFixed(1)} / 5
      </p>

      {/* TABS */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab('details')}>Detay</button>
        <button onClick={() => setActiveTab('howto')}>Nasıl Kullanılır</button>
        <button onClick={() => setActiveTab('faq')}>SSS</button>
      </div>

      {/* CONTENT */}

      {activeTab === 'details' && (
        <div className="space-y-4">
          <p>{product.description}</p>

          <ul>
            {(product.benefits ?? []).map((b, i) => (
              <li key={i}>• {b}</li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'howto' && (
        <div className="space-y-3">
          {(product.howToUse ?? []).map((step, i) => (
            <div key={i} className="flex gap-3">
              <span>{i + 1}.</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="space-y-4">
          {(product.faq ?? []).map((f, i) => (
            <div key={i}>
              <p className="font-semibold">{f.question}</p>
              <p className="text-sm text-gray-600">{f.answer}</p>
            </div>
          ))}
        </div>
      )}

      {/* REVIEWS */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Yorumlar</h2>

        <div className="space-y-4">
          {(product.reviews ?? []).map((r) => (
            <div key={r.id} className="border p-4">
              <p className="font-medium">{r.title}</p>
              <p className="text-sm text-gray-600">{r.body}</p>
              <p className="text-xs mt-2">{r.name}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
