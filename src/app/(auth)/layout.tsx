import AuthHeader from '@/components/Headers/AuthHeader'
import React from 'react'

type PropType = {
    children: React.ReactNode
}

export default function AuthLayout({ children }: PropType) {
    return (
        <main className='flex flex-col min-h-screen'>
            <AuthHeader />
            {children}
        </main>
    )
}