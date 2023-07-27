"use client"

import { SessionProvider } from "next-auth/react"

interface propTypes {
    children: React.ReactNode,
}

const Provider = ({ children }: propTypes) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default Provider