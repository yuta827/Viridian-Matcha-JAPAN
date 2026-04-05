'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard, Package, MessageSquare, FileText,
  ShoppingCart, Newspaper, HelpCircle, Settings,
  Home, Building2, LogOut, Menu, X, Image
} from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'ダッシュボード', icon: LayoutDashboard },
  { href: '/admin/products', label: '商品管理', icon: Package },
  { href: '/admin/inquiries', label: '問い合わせ', icon: MessageSquare },
  { href: '/admin/quotes', label: '見積管理', icon: FileText },
  { href: '/admin/orders', label: '注文管理', icon: ShoppingCart },
  { href: '/admin/news', label: 'ニュース', icon: Newspaper },
  { href: '/admin/faq', label: 'FAQ管理', icon: HelpCircle },
  { href: '/admin/top-page', label: 'TOPページ編集', icon: Home },
  { href: '/admin/banners', label: 'バナー管理', icon: Image },
  { href: '/admin/company', label: '会社情報', icon: Building2 },
  { href: '/admin/settings', label: 'サイト設定', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClient()

    // 初回セッション確認
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && pathname !== '/admin/login') {
        window.location.href = '/admin/login'
        return
      }
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // セッション変化を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session && pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    })

    return () => subscription.unsubscribe()
  }, [pathname])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-sm">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#1a3009] flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <Link href="/admin/dashboard" className="block">
            <div className="text-white font-bold text-lg leading-tight">抹茶OEM</div>
            <div className="text-green-300 text-xs mt-0.5">管理パネル</div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-5 py-3 text-sm transition-all
                  ${active
                    ? 'bg-green-800 text-white font-medium border-r-4 border-green-400'
                    : 'text-green-100 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <div className="text-green-200 text-xs mb-1 truncate">{user?.email}</div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-green-300 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            ログアウト
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-gray-500 hover:text-green-800 transition-colors"
            >
              公開サイトを見る →
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
