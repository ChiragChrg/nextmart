"use client"

import { SessionProvider } from "next-auth/react"
import { Provider as ReduxProvider } from "react-redux"
import store from "@redux/store"

export interface ProviderProps {
    children: React.ReactNode,
}

const Provider = ({ children }: ProviderProps) => {
    return (
        <SessionProvider refetchOnWindowFocus={true}>
            <ReduxProvider store={store}>
                {children}
            </ReduxProvider>
        </SessionProvider>
    )
}

export default Provider