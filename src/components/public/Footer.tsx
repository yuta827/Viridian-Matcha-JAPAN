import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1a3009] text-green-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-white font-bold text-2xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              MATCHA OEM
            </div>
            <p className="text-green-200 text-sm leading-relaxed max-w-xs">
              Premium Japanese matcha sourced from the finest tea gardens in Uji, Kyoto and Nishio, Aichi.
              Trusted OEM partner for global brands.
            </p>
            <div className="mt-4 text-xs text-green-400">
              Origin: Kyoto Uji / Aichi Nishio, Japan
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider">NAVIGATE</h3>
            <ul className="space-y-2">
              {[
                ['/', 'Home'],
                ['/about', 'About Us'],
                ['/matcha', 'Matcha'],
                ['/oem', 'OEM Service'],
                ['/products', 'Products'],
                ['/news', 'News'],
                ['/faq', 'FAQ'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-green-200 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider">CONTACT</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/sample-order" className="block px-4 py-2 border border-green-400 text-green-300 hover:bg-green-400 hover:text-white transition-all text-center text-xs">
                  Sample Order
                </Link>
              </li>
              <li>
                <Link href="/quote" className="block px-4 py-2 bg-[#b8963e] text-white hover:bg-[#d4af6a] transition-all text-center font-semibold text-xs">
                  OEM Quote
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-green-200 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-green-400">© 2024 Matcha OEM Japan. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-green-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-green-400 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
