import { CarouselUI } from '@/components/CarouselUI'
import Categories from '@/components/CustomUI/Categories'
import Feeds from '@/components/Feeds'
import Header from '@/components/Headers/Header'
import React from 'react'

const page = () => {
    return (
        <main className="min-h-screen flex flex-col max-w-[1600px] mx-auto">
            <Header />
            {/* <Categories /> */}
            <CarouselUI />

            <Feeds />
        </main>
    )
}

export default page