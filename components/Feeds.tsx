"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HeartSVG from './SVGs/HeartSVG'
import StarSVG from './SVGs/StarSVG'

type productType = {
    name: string,
    description: string,
    price: number,
    rating: number,
    images: string
}

const mockProducts: Array<productType> = [
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 92899,
        rating: 5,
        images: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 58564,
        rating: 4,
        images: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 656546,
        rating: 3,
        images: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 456845,
        rating: 2,
        images: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 78675,
        rating: 1,
        images: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 76861,
        rating: 0,
        images: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 56484,
        rating: 4,
        images: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 45648,
        rating: 3,
        images: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 45648,
        rating: 5,
        images: "http://via.placeholder.com/400x400",
    },
    {
        name: "HP LAptop",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
        price: 35434,
        rating: 1,
        images: "http://via.placeholder.com/400x400",
    },
]

const Feeds = () => {
    const [products, setProducts] = useState<Array<productType>>(mockProducts)

    return (
        <>
            <h1 className='px-4 sm:px-8 pt-4 sm:pt-6 font-josefin text-[2em]'>Trending</h1>
            <div className='bg-secondary px-4 sm:px-8 pb-[5em] grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4'>
                {products.map((item, index) => {
                    return <div key={index} className="relative flex_center flex-col rounded-md overflow-hidden cursor-pointer bg-slate-500/50">
                        <Image
                            src={item?.images as string}
                            alt='img'
                            fill={true}
                            style={{ objectFit: "cover" }}
                            className='!relative' />

                        <HeartSVG width='25px' height='25px' className='absolute top-2 right-2' />

                        <div className="w-full flex flex-col p-1 px-2 bg-baseLiteClr">
                            <h3>{item.name}</h3>
                            <div className="flex relative w-full">
                                <StarSVG width='20px' height='20px' isFilled={1 <= item?.rating} />
                                <StarSVG width='20px' height='20px' isFilled={2 <= item?.rating} />
                                <StarSVG width='20px' height='20px' isFilled={3 <= item?.rating} />
                                <StarSVG width='20px' height='20px' isFilled={4 <= item?.rating} />
                                <StarSVG width='20px' height='20px' isFilled={5 <= item?.rating} />
                            </div>
                            <div className="p-1 px-2">
                                <h3 className='font-sans font-bold'>{item?.price.toLocaleString("en-IN", {
                                    style: 'currency',
                                    currency: 'INR',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                })}</h3>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default Feeds