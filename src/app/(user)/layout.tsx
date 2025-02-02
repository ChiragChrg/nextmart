import Footer from '@/components/Footer'
import Header from '@/components/Headers/Header'
import React from 'react'

type PropType = {
    children: React.ReactNode
}

export default function UserLayout({ children }: PropType) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}