'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Package, ShoppingCart, Users, Tag,
  BarChart3, Settings, FileText, LogOut, Menu, X,
  ChevronRight, Bell, Search, Archive, TrendingUp, Gem
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href:'/admin',            label:'Dashboard',  icon:LayoutDashboard, exact:true },
  { href:'/admin/products',   label:'Ürünler',    icon:Package },
  { href:'/admin/inventory',  label:'Stok',       icon:Archive },
  { href:'/admin/orders',     label:'Siparişler', icon:ShoppingCart },
  { href:'/admin/customers',  label:'Müşteriler', icon:Users },
  { href:'/admin/analytics',  label:'Analitik',   icon:BarChart3 },
  { href:'/admin/coupons',    label:'Kuponlar',   icon:Tag },
  { href:'/admin/blog',       label:'Blog',       icon:FileText },
  { href:'/admin/settings',   label:'Ayarlar',    icon:Settings },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname              = usePathname()
  const router                = useRouter()
  const [sidebarOpen,       setSidebarOpen]       = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className={cn('px-5 py-6 border-b border-white/8', !sidebarOpen && 'px-3')}>
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-gold flex items-center justify-center shrink-0">
            <Gem size={14} className="text-ivory" />
          </div>
          {sidebarOpen && (
            <div>
              <p className="font-display text-base tracking-[0.2em] text-ivory font-light">ALLOREA</p>
              <p className="font-body text-2xs text-white/30 tracking-[0.3em] uppercase -mt-0.5">Admin</p>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-hide">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact)
          return (
            <Link key={href} href={href}
              onClick={() => setMobileSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 transition-all duration-200',
                sidebarOpen ? '' : 'justify-center',
                active
                  ? 'bg-allorea-600/90 text-ivory'
                  : 'text-white/45 hover:bg-white/8 hover:text-white/80'
              )}
              title={!sidebarOpen ? label : undefined}
            >
              <Icon size={16} className="shrink-0" />
              {sidebarOpen && (
                <>
                  <span className="font-body text-sm flex-1">{label}</span>
                  {active && <ChevronRight size={12} className="opacity-50" />}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={cn('px-3 py-4 border-t border-white/8 space-y-0.5')}>
        <Link href="/" target="_blank"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 text-white/35 hover:bg-white/8 hover:text-white/70 transition-all',
            !sidebarOpen && 'justify-center'
          )}
          title={!sidebarOpen ? 'Siteye Git' : undefined}
        >
          <TrendingUp size={15} />
          {sidebarOpen && <span className="font-body text-sm">Siteyi Gör</span>}
        </Link>
        <button onClick={handleLogout}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 text-white/35 hover:bg-red-500/15 hover:text-red-400 transition-all',
            !sidebarOpen && 'justify-center'
          )}
          title={!sidebarOpen ? 'Çıkış' : undefined}
        >
          <LogOut size={15} />
          {sidebarOpen && <span className="font-body text-sm">Çıkış Yap</span>}
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col transition-all duration-300 shrink-0',
        'bg-[#131211]',
        sidebarOpen ? 'w-56' : 'w-[60px]'
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar backdrop */}
      <div className={cn(
        'fixed inset-0 bg-obsidian/60 z-40 lg:hidden transition-opacity duration-300',
        mobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )} onClick={() => setMobileSidebarOpen(false)} />

      {/* Mobile sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 h-full w-56 bg-[#131211] z-50 lg:hidden transition-transform duration-300',
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <SidebarContent />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-5 py-3 flex items-center gap-4 shrink-0 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
          <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden p-1.5 hover:bg-slate-100 rounded">
            <Menu size={20} className="text-slate-600" />
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:block p-1.5 hover:bg-slate-100 rounded">
            <Menu size={20} className="text-slate-500" />
          </button>

          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Ürün, sipariş, müşteri ara…"
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-allorea-400/40 focus:border-allorea-300 transition-all rounded"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 hover:bg-slate-100 rounded transition-colors">
              <Bell size={17} className="text-slate-500" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-allorea-500 rounded-full" />
            </button>
            <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center text-ivory font-body text-xs font-semibold">A</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-7 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  )
}
