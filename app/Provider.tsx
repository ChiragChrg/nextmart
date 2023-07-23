"use client"

import { SessionProvider } from "next-auth/react"

interface propTypes {
    children: React.ReactNode,
    session?: object | any
}

const Provider = ({ children, session }: propTypes) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default Provider