import './globals.css'
import type { Metadata } from 'next'
import Provider from './Provider'

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
      <body className="bg-baseClr text-textClr">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
