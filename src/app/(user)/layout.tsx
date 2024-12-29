import Header from '@/components/Headers/Header'
import React from 'react'

type PropType = {
    children: React.ReactNode
}

export default function UserLayout({ children }: PropType) {
    return (
        <main className='flex flex-col min-h-screen'>
            <Header />
            {children}
        </main>
    )
}