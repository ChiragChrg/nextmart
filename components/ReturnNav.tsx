"use client"
import React from 'react'
import LogoSVG from './SVGs/LogoSVG'
import Link from 'next/link'
import BackSVG from './SVGs/BackSVG'
import { useRouter } from 'next/navigation'

const ReturnNav = () => {
    const router = useRouter()

    return (
        <header className='flex justify-between items-center w-full px-4 py-2 lg:py-3'>
            <Link href="/" className='hidden lg:block'>
                <LogoSVG width="200px" />
            </Link>

            <button
                onClick={() => router.back()}
                className='lg:bg-primaryClr lg:px-2 py-1 lg:text-white rounded flex_center gap-2'>
                <BackSVG width='20px' height='20px' />
                <span>Back</span>
            </button>
        </header>
    )
}

export default ReturnNav