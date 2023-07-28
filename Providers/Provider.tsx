"use client"

import { SessionProvider } from "next-auth/react"
import { Provider as ReduxProvider } from "react-redux"
import store from "@redux/store"

interface propTypes {
    children: React.ReactNode,
}

const Provider = ({ children }: propTypes) => {
    return (
        <SessionProvider>
            <ReduxProvider store={store}>
                {children}
            </ReduxProvider>
        </SessionProvider>
    )
}

export default Provider