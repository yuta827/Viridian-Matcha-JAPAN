'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Leaf } from 'lucide-react';

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/matcha', label: 'Matcha' },
  { href: '/oem', label: 'Private Label' },
  { href: '/products', label: 'Products' },
  { href: '/news', label: 'News' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#C9A84C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#2D5016] rounded-sm flex items-center justify-center group-hover:bg-[#3d6b1f] transition-colors">
              <Leaf className="w-4 h-4 text-[#C9A84C]" />
            </div>
            <div>
              <span className="text-[#2D5016] font-semibold text-lg tracking-widest">MATCHA</span>
              <span className="text-[#C9A84C] font-light text-sm tracking-widest ml-1">KUU</span>
            </div>
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-[#2D5016] text-sm tracking-wider transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A84C] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTAボタン */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/sample-order"
              className="text-[#2D5016] border border-[#2D5016] px-4 py-2 text-sm tracking-wider hover:bg-[#2D5016] hover:text-white transition-colors"
            >
              Sample Order
            </Link>
            <Link
              href="/quote"
              className="bg-[#2D5016] text-white px-4 py-2 text-sm tracking-wider hover:bg-[#3d6b1f] transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* モバイルメニュー */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-[#2D5016]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="メニュー"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* モバイルドロワー */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2.5 text-gray-700 hover:text-[#2D5016] hover:bg-[#F8F5EE] rounded text-sm tracking-wider transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link
                href="/sample-order"
                className="text-center border border-[#2D5016] text-[#2D5016] py-2.5 text-sm tracking-wider"
                onClick={() => setIsOpen(false)}
              >
                Sample Order
              </Link>
              <Link
                href="/quote"
                className="text-center bg-[#2D5016] text-white py-2.5 text-sm tracking-wider"
                onClick={() => setIsOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
