import type { Metadata } from 'next'
import ReturnNav from '@components/ReturnNav'

export const metadata: Metadata = {
    title: 'Register | NextMart',
    description: "Join the Next Mart family! Register now for an exceptional shopping experience. Access a vast array of products, from fashion to electronics. Enjoy personalized recommendations and exclusive deals. Sign up securely and embark on a journey of endless shopping possibilities!",
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
        <>
            <ReturnNav />

            {children}
        </>
    )
}

export default layout