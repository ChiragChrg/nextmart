import type { Metadata } from 'next'
import Provider from "../../Provider"

export const metadata: Metadata = {
    title: 'Login | NextMart'
}

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider>
            <section>{children}</section>
        </Provider>
    )
}

export default layout