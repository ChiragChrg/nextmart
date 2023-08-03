import type { Metadata } from 'next'
import ReturnNav from '@components/ReturnNav'

export const metadata: Metadata = {
    title: 'Login | NextMart',
    description: 'Unlock a world of shopping delights at Next Mart! Your gateway to a seamless shopping experience awaits. Log in securely to access a vast array of products, from trendy fashion to cutting-edge electronics. Discover personalized recommendations and exclusive deals. Join us now and redefine the way you shop!',
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
            <ReturnNav toHome />

            {children}
        </>
    )
}

export default layout