'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/matcha', label: 'Matcha' },
  { href: '/oem', label: 'Private Label' },
  { href: '/products', label: 'Products' },
  { href: '/news', label: 'News' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a3009]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="text-white font-bold text-xl tracking-wider" style={{ fontFamily: 'var(--font-serif)' }}>
              KUU MATCHA
            </div>
            <div className="hidden sm:block w-px h-5 bg-white/30" />
            <div className="hidden sm:block text-green-300 text-xs tracking-widest">JAPAN</div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="text-green-100 hover:text-white px-3 py-2 text-sm transition-colors tracking-wide">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/sample-order"
              className="px-4 py-2 text-sm border border-green-400 text-green-300 hover:bg-green-400 hover:text-white transition-all">
              Sample Order
            </Link>
            <Link href="/quote"
              className="px-4 py-2 text-sm bg-[#b8963e] text-white hover:bg-[#d4af6a] transition-all font-semibold">
              Get a Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-white">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#1a3009] border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                className="block text-green-100 hover:text-white py-2 text-sm">
                {link.label}
              </Link>
            ))}
            <div className="pt-4 grid grid-cols-2 gap-3">
              <Link href="/sample-order" onClick={() => setOpen(false)}
                className="text-center px-4 py-2 text-sm border border-green-400 text-green-300">
                Sample Order
              </Link>
              <Link href="/quote" onClick={() => setOpen(false)}
                className="text-center px-4 py-2 text-sm bg-[#b8963e] text-white font-semibold">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
