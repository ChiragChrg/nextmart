"use client"

import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

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
        if (typeof window !== 'undefined') {
            setIsMounted(true)
        }
    }, [])

    if (isMounted)
        return (
            <QueryClientProvider client={queryClient}>
                {children}
                <Toaster position="bottom-right" />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        )
}

export default Provider