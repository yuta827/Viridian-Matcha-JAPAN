import Link from 'next/link';
import { Leaf, Mail, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a2f0d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ブランド */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#C9A84C]/20 rounded-sm flex items-center justify-center">
                <Leaf className="w-4 h-4 text-[#C9A84C]" />
              </div>
              <div>
                <span className="text-white font-semibold tracking-widest">MATCHA</span>
                <span className="text-[#C9A84C] font-light ml-1 tracking-widest">KUU</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium Japanese matcha for private label & custom brand sourcing worldwide.
            </p>
            <p className="text-gray-500 text-xs mt-3">
              Premium Japanese Matcha for the World
            </p>
          </div>

          {/* プロダクト */}
          <div>
            <h3 className="text-[#C9A84C] text-xs tracking-widest uppercase mb-4 font-medium">Products</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/products?line=premium', label: 'Premium Line' },
                { href: '/products?line=standard', label: 'Standard Line' },
                { href: '/products?line=organic', label: 'Organic Line' },
                { href: '/sample-order', label: 'Sample Order' },
                { href: '/quote', label: 'Get a Quote' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サービス */}
          <div>
            <h3 className="text-[#C9A84C] text-xs tracking-widest uppercase mb-4 font-medium">Services</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/oem', label: 'Private Label' },
                { href: '/matcha', label: 'About Matcha' },
                { href: '/about', label: 'About Us' },
                { href: '/faq', label: 'FAQ' },
                { href: '/news', label: 'News' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 連絡先 */}
          <div>
            <h3 className="text-[#C9A84C] text-xs tracking-widest uppercase mb-4 font-medium">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-[#C9A84C] shrink-0" />
                <a href="mailto:maccha.kuu@gmail.com" className="hover:text-white transition-colors">
                  maccha.kuu@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-[#C9A84C] shrink-0" />
                <a href="tel:+81529902209" className="hover:text-white transition-colors">+81-52-990-2209</a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4 mt-0.5 text-[#C9A84C] shrink-0" />
                <span>Mon–Fri 9:00–18:00 JST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ゴールドライン */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} KUU LLC (合同会社KUU). All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
