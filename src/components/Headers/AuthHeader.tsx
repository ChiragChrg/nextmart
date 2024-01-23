"use client"

import { TextLogoSVG } from '@/assets/SVGs'
import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AuthHeader = () => {
    return (
        <header className='flex justify-between items-center w-full px-4 py-3'>
            <Link href="/" className='hidden lg:block'>
                <TextLogoSVG width='200px' />
            </Link>

            <Link
                href="/"
                className='lg:bg-primary lg:px-2 py-1 lg:text-white rounded flex_center gap-2'>
                <ChevronLeftIcon width='20px' height='20px' />
                <span>Back</span>
            </Link>
        </header>
    )
}

export default AuthHeader