import type { Metadata } from 'next'
import Link from 'next/link'
import Provider from "../../Provider"
import { ThemeButton } from '@components/Buttons'

export const metadata: Metadata = {
    title: 'SignIn | NextMart'
}

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider>
            <header className="bg-baseClr w-full flex justify-between items-center p-3 px-6">
                <Link href="/" className="flex_center text-[1.3em] font-bold text-primaryClr">
                    NEXT MART
                </Link>


                <div className="flex gap-4 items-center">
                    <ThemeButton />
                    <Link href="/" className='bg-primaryClr p-2 text-white rounded flex_center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>

                        <span>Go Back</span>
                    </Link>
                </div>
            </header>

            {children}
        </Provider>
    )
}

export default layout