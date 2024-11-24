import { CarouselUI } from '@/components/CarouselUI'
import Categories from '@/components/CustomUI/Categories'
import Header from '@/components/Headers/Header'
import React from 'react'

const page = () => {
    return (
        <main className="min-h-screen flex flex-col items-center max-w-[1600px] mx-auto">
            <Header />
            <Categories />
            <CarouselUI />
            <div>page</div>
        </main>
    )
}

export default page