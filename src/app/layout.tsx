import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Metadata } from "next";
import Provider from "@/providers/Provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  title: 'NextMart | Your Ultimate Shopping Destination!',
  description: 'Discover an unparalleled shopping experience with Next Mart, an exceptional web app developed by ChiragChrg. Unleash the power of online shopping with a vast array of products at your fingertips',
  keywords: ["chiragchrg", "chirag", "chrgchirag", 'Next Mart', 'next-mart', 'nextmart', "shopping", "ecommerce", "chiruchirag2001"],
  authors: [{ name: "ChiragChrg" }, { url: "https://chiragchrg.netlify.app/" }],
  creator: "ChiragChrg",
  metadataBase: new URL(defaultUrl),
  applicationName: "Next Mart",
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'd2pS_qzLYMcFTx9l8FtCPjCaAQygUYw_NLlTZ_zlDJU',
  },
  manifest: "/manifest.json",
  icons: {
    icon: '/Icons/144.png',
    shortcut: '/favicon.svg',
    apple: '/Icons/192.png',
  },
  openGraph: {
    title: 'NextMart | Your Ultimate Shopping Destination!',
    description: 'Discover an unparalleled shopping experience with Next Mart, an exceptional web app developed by ChiragChrg. Unleash the power of online shopping with a vast array of products at your fingertips',
    url: defaultUrl,
    siteName: 'Next Mart',
    images: [
      {
        url: '/icons/192.png',
        width: 192,
        height: 192,
        alt: 'NextMart Logo',
      },
      {
        url: '/icons/ARMSDevices.png',
        width: 1800,
        height: 760,
        alt: 'NextMart Mockup Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextMart | Your Ultimate Shopping Destination!',
    description: 'Discover an unparalleled shopping experience with Next Mart, an exceptional web app developed by ChiragChrg. Unleash the power of online shopping with a vast array of products at your fingertips',
    creator: '@chrgchirag',
    images: ['/icons/192.png', '/icons/ARMSDevices.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <Provider>
            {children}
          </Provider>
        </main>
      </body>
    </html>
  );
}
