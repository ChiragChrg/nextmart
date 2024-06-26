import { CarouselUI } from '@/components/CarouselUI'
import Header from '@/components/Headers/Header'
import React from 'react'

const page = () => {
    return (
        <main className="min-h-screen flex flex-col items-center">
            <Header />
            <CarouselUI />
            <div>page</div>
        </main>
    )
}

export default page