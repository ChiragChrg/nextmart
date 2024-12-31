import React from 'react'

type PropType = {
    children: React.ReactNode
}

export default function AdminLayout({ children }: PropType) {
    return (
        <main>
            {children}
        </main>
    )
}