import React from 'react'
import Sidebar from '../components/Sidebar'

type PropType = {
    children: React.ReactNode
}

export default function AdminPagesLayout({ children }: PropType) {
    return (
        <main className='flex w-full h-screen bg-secondaryClr p-4'>
            <Sidebar />
            {children}
        </main>
    )
}