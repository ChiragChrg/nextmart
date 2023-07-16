import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from "@components"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextMart | Next Generation Ecommerce Market',
  description: 'NextMart is an Ecommerce website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-base">
        <Header />

        <main>{children}</main>

        {/* Footer */}
      </body>
    </html>
  )
}
