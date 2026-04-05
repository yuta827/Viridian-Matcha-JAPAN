'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard, Package, MessageSquare, FileText,
  ShoppingCart, Newspaper, HelpCircle, Image,
  Settings, Building2, LogOut, Leaf, ChevronRight,
  BarChart3
} from 'lucide-react';

const menuItems = [
  { href: '/admin/dashboard', label: 'ダッシュボード', icon: LayoutDashboard },
  { divider: true, label: 'コンテンツ管理' },
  { href: '/admin/products', label: '商品管理', icon: Package },
  { href: '/admin/top-page', label: 'トップページCMS', icon: BarChart3 },
  { href: '/admin/banners', label: 'バナー管理', icon: Image },
  { href: '/admin/faq', label: 'FAQ管理', icon: HelpCircle },
  { href: '/admin/news', label: 'お知らせ管理', icon: Newspaper },
  { divider: true, label: '問い合わせ・注文' },
  { href: '/admin/inquiries', label: '問い合わせ管理', icon: MessageSquare },
  { href: '/admin/quotes', label: '見積依頼管理', icon: FileText },
  { href: '/admin/orders', label: '注文管理', icon: ShoppingCart },
  { divider: true, label: '設定' },
  { href: '/admin/company', label: '会社情報管理', icon: Building2 },
  { href: '/admin/settings', label: 'サイト基本設定', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 min-h-screen bg-[#0f1923] text-white flex flex-col shrink-0">
      {/* ロゴ */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#C9A84C]/20 rounded flex items-center justify-center">
            <Leaf className="w-3.5 h-3.5 text-[#C9A84C]" />
          </div>
          <div>
            <span className="text-white text-sm font-semibold tracking-wider">MATCHA OEM</span>
            <span className="block text-gray-500 text-xs">管理画面</span>
          </div>
        </Link>
      </div>

      {/* メニュー */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {menuItems.map((item, i) => {
          if ('divider' in item && item.divider) {
            return (
              <div key={i} className="px-3 pt-6 pb-2">
                <span className="text-gray-500 text-xs tracking-widest uppercase font-medium">
                  {item.label}
                </span>
              </div>
            );
          }

          if (!item.href) return null;
          const Icon = item.icon!;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-all group ${
                isActive
                  ? 'bg-[#2D5016] text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C9A84C]' : 'group-hover:text-[#C9A84C]'}`} />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="w-3 h-3 text-[#C9A84C]" />}
            </Link>
          );
        })}
      </nav>

      {/* 公開サイトリンク・ログアウト */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white text-sm transition-all"
        >
          <Leaf className="w-4 h-4" />
          <span>公開サイトを見る</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 text-sm transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>ログアウト</span>
        </button>
      </div>
    </aside>
  );
}
