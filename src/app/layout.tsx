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
    default: 'KUU Matcha | Premium Japanese Matcha Private Label & Sourcing',
    template: '%s | KUU Matcha',
  },
  description: 'Premium Japanese Matcha private label & custom sourcing service. Ceremonial, culinary, and organic grades from Uji & Nishio — your trusted brand partner.',
  keywords: ['matcha', 'private label matcha', 'custom matcha', 'Japanese matcha', 'ceremonial matcha', 'organic matcha', 'matcha sourcing'],
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
