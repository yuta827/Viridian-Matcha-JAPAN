import type { Metadata } from 'next'
import { Noto_Serif_JP, Inter } from 'next/font/google'
import './globals.css'

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Matcha OEM | Premium Japanese Matcha for Global Brands',
    template: '%s | Matcha OEM',
  },
  description: 'Premium Japanese Matcha OEM service. Ceremonial, culinary, and organic grades available for private label and bulk orders.',
  keywords: ['matcha', 'OEM', 'private label', 'Japanese matcha', 'ceremonial matcha', 'organic matcha'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${notoSerifJP.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
