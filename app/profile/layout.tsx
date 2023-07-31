import type { Metadata } from 'next'
import Provider from '@Providers/Provider'
import ReturnNav from '@components/ReturnNav'

export const metadata: Metadata = {
    title: 'My Profile | NextMart',
    description: "Your personalized shopping hub awaits! Access, update, and track orders hassle-free. Elevate your experience with Next Mart's My Profile page!",
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
    alternates: {
        canonical: 'https://nextmart.vercel.app/',
    },
}

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider>
            <ReturnNav />

            {children}
        </Provider>
    )
}

export default layout