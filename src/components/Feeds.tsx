"use client"
import React, { useState } from 'react'
import ProductCard from './ProductCard'

type productType = {
    name: string,
    description: string,
    price: number,
    rating: number,
    image: string
}

const mockProducts: Array<productType> = [
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 92899,
        rating: 5,
        image: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 58564,
        rating: 4,
        image: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 656546,
        rating: 3,
        image: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 456845,
        rating: 2,
        image: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 78675,
        rating: 1,
        image: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 76861,
        rating: 0,
        image: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 56484,
        rating: 4,
        image: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 45648,
        rating: 3,
        image: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 45648,
        rating: 5,
        image: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 35434,
        rating: 1,
        image: "http://via.placeholder.com/400x400",
    },
]

const Feeds = () => {
    const [products, setProducts] = useState<Array<productType>>(mockProducts)

    return (
        <>
            <h1 className='px-4 sm:px-8 pt-4 sm:pt-6 py-1 font-ubuntu text-[2em]'>Trending</h1>
            <div className='bg-secondary px-4 sm:px-8 pb-[5em] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4'>
                {products.map((item, index) => {
                    return <ProductCard key={index} data={item} />
                })}
            </div>
        </>
    )
}

export default Feeds