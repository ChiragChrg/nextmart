import React from 'react'
import { CarouselUI } from '@/components/CarouselUI'
// import Categories from '@/components/CustomUI/Categories'
import ProductSection from '@/components/products/ProductSection'
import { getProductsByAnalytics } from '../actions/UserActions'
import { productType } from '@/types'

const page = async () => {
    const res = await getProductsByAnalytics()
    const { bestSellers, latestProducts, trendingProducts } = res.response as { bestSellers: productType[], latestProducts: productType[], trendingProducts: productType[] }


    return (
        <main className="main_style mb-8">
            {/* <Categories /> */}
            <CarouselUI />

            <ProductSection title='Best Sellers' data={bestSellers} />
            <ProductSection title='New Arrivals' data={latestProducts} />
            {/* <ProductSection title='Trending Now' data={trendingProducts} /> */}
        </main>
    )
}

export default page