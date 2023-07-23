import './globals.css'
import type { Metadata } from 'next'
import Provider from './Provider'

export const metadata: Metadata = {
  title: 'NextMart | Next Generation Ecommerce Market',
  description: 'NextMart is an Ecommerce website',
  creator: "ChiragChrg",
  authors: [{ name: 'ChiragChrg', url: 'https://chiragchrg.netlify.app/' }],
  verification: { google: "YRAUUyc8TP4QJ1s53KAdLxcON9xifQf33BnLeP-F_5Y" },
  applicationName: "Next Mart",
  manifest: "/manifest.json",
  keywords: ['Next Mart', 'next-mart', 'nextmart', 'chiragchrg', 'ChiragChrg', 'chiruchirag2001', 'ecommerce', 'shopping', 'next.js'],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#050505' },
  ],
  icons: {
    icon: '/icons/192.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-baseClr text-textClr">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
