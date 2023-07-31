import './globals.css'
import type { Metadata } from 'next'
import { Poppins, Josefin_Sans } from "next/font/google"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

import Provider from '@Providers/Provider'

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

type LayoutProps = {
  children: React.ReactNode,
}

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`bg-baseClr text-textClr min-h-screen font-poppins ${JosefinSans.variable} ${Poppin.variable}`}>
        <Provider>
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
        </Provider>
      </body>
    </html>
  )
}