import React from 'react'
import ProductCard from './ProductCard'
import { productType } from '@/types'
import { getAllProducts } from '@/app/actions/ProductsAction'

type props = {
    title: string,
    data: productType[]
}

const ProductSection = async ({ title, data }: props) => {

    return (
        <section>
            <h1 className='px-4 sm:px-8 pt-4 sm:pt-6 font-bold text-[2em] capitalize'>{title}</h1>
            <div className='p-4 sm:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6'>
                {data.map((item, index) => {
                    return <ProductCard key={index} data={item} />
                })}
            </div>
        </section>
    )
}

export default ProductSection