import { Suspense } from 'react'
import LoginForm from '@/components/ui/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Giriş Yap | ALLOREA',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-ivory grid grid-cols-1 lg:grid-cols-2">
      {/* Left — brand imagery */}
      <div className="hidden lg:block relative bg-champagne overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80"
          alt="ALLOREA"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-obsidian/20" />
        <div className="absolute bottom-10 left-10 right-10">
          <p className="font-display text-3xl font-light text-ivory leading-tight">
            Güzelliğin bilimiyle<br />tanışın.
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center">
            <p className="font-display text-2xl font-light tracking-[0.2em] text-obsidian mb-1">ALLOREA</p>
            <div className="gold-line mx-auto mt-3" />
          </div>

          <h1 className="font-display text-2xl font-light text-obsidian text-center mb-8">
            Hoş Geldiniz
          </h1>

          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
