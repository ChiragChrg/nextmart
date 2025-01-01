import React from 'react'
import { CarouselUI } from '@/components/CarouselUI'
import Categories from '@/components/CustomUI/Categories'
import ProductSection from '@/components/products/ProductSection'

const page = () => {
    return (
        <main className="main_style">
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