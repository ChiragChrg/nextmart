import React from 'react'
import { CarouselUI } from '@/components/CarouselUI'
import Categories from '@/components/CustomUI/Categories'
import ProductSection from '@/components/ProductSection'

const page = () => {
    return (
        <main className="min-h-screen flex flex-col max-w-[1600px] mx-auto">
            {/* <Categories /> */}
            <CarouselUI />

            <ProductSection title='Trending Now' />
            <ProductSection title='Best Sellers' />
            <ProductSection title='New Arrivals' />
            <ProductSection title='Exclusive Deals' />
            <ProductSection title='Flash Sale' />
        </main>
    )
}

export default page