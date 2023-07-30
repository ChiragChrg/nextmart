import './globals.css'
import type { Metadata } from 'next'
import Provider from '@Providers/Provider'
import { Poppins, Josefin_Sans } from "next/font/google"

export const Poppin = Poppins({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: "--Poppins"
})

export const JosefinSans = Josefin_Sans({
  weight: "700",
  subsets: ['latin'],
  display: 'swap',
  variable: "--JosefinSans"
})

export const metadata: Metadata = {
  title: 'NextMart | Your Ultimate Shopping Destination!',
  description: 'Discover an unparalleled shopping experience with Next Mart, an exceptional web app developed by ChiragChrg. Unleash the power of online shopping with a vast array of products at your fingertips',
  creator: "ChiragChrg",
  authors: [{ name: 'ChiragChrg', url: 'https://chiragchrg.netlify.app/' }],
  verification: { google: "TSsuy8j81zZ0Ge0aestKiwZUPydASWd9aANj-ITDack" },
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
  themeColor: "#fafafa",
  icons: {
    icon: '/icons/192.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://nextmart.vercel.app/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-baseClr text-textClr min-h-screen font-poppins ${JosefinSans.variable} ${Poppin.variable}`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
