"use client"

import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { store } from '@/store'
import { Provider as StoreProvider } from 'react-redux'
import { EdgeStoreProvider } from '@/lib/edgestore'

type ProviderProps = {
    children: React.ReactNode,
}

const Provider = ({ children }: ProviderProps) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    }))

    useEffect(() => {
        if (typeof window !== undefined) {
            setIsMounted(true)
        }
    }, [])

    if (isMounted)
        return (
            <SessionProvider refetchOnWindowFocus={false}>
                <StoreProvider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <EdgeStoreProvider>
                            {children}
                            <Toaster position="bottom-right" />
                            <ReactQueryDevtools initialIsOpen={false} />
                        </EdgeStoreProvider>
                    </QueryClientProvider>
                </StoreProvider>
            </SessionProvider>
        )
}

export default Provider