"use client"
import React, { useState } from 'react'
import ProductCard from './ProductCard'
import { productType } from '@/types'

// export type productType = {
//     productId: string,
//     productSlug: string
//     title: string,
//     longTitle: string,
//     description: string,
//     categoryId: string,
//     category: string,
//     brand: string,
//     price: {
//         original: number,
//         current: number,
//         discount: number,
//     },
//     stock: {
//         quantity: number,
//         isInStock: boolean
//     }
//     images: {
//         imageUrl: string,
//         altText: string,
//         blurData: string,
//         averageColor: string
//     }[],
//     features?: {
//         variant: {
//             size: string,
//             color: string,
//         }
//     },
//     variants?: {
//         size?: {
//             productSlug: string,
//             size: string
//         }[],
//         color?: {
//             productSlug: string,
//             color: string
//         }[]
//     }
//     ratings?: {
//         average: number,
//         reviewCount: number
//     },
//     tags: string[]
// }

const mockProducts: productType[] = [
    {
        productSlug: "a1b2c3d4-Ergonomic-Office-Chair-BLUE",
        title: "Ergonomic Office Chair",
        longTitle: "Ergonomic Office Chair",
        description: "A comfortable chair for long work hours.",
        category: "Furniture",
        categoryId: "Furniture",
        brand: "OfficePro",
        price: { original: 299, current: 249, discount: 17 },
        stock: { quantity: 50, isInStock: true },
        images: [{ imageUrl: "http://via.placeholder.com/400x400", altText: "Chair image", blurData: "blur1", averageColor: "#f0f0f0" }],
        ratings: { average: 4.5, reviewCount: 3220 },
        tags: ["office", "chair", "ergonomic"]
    },
    {
        productSlug: "e5f6g7h8",
        title: "Wireless Headphones",
        longTitle: "Wireless Headphones",
        description: "Noise-cancelling headphones with great sound.",
        category: "Electronics",
        categoryId: "Electronics",
        brand: "AudioTech",
        price: { original: 199, current: 149, discount: 25 },
        stock: { quantity: 20, isInStock: true },
        images: [{ imageUrl: "http://via.placeholder.com/400x400", altText: "Headphones image", blurData: "blur2", averageColor: "#000000" }],
        ratings: { average: 4.2, reviewCount: 60 },
        tags: ["headphones", "wireless", "audio"]
    },
    {
        productSlug: "i9j0k1l2",
        title: "Cotton T-Shirt",
        longTitle: "Cotton T-Shirt",
        description: "Soft and comfortable cotton t-shirt.",
        category: "Clothing",
        categoryId: "Clothing",
        brand: "FashionCo",
        price: { original: 29, current: 19, discount: 34 },
        stock: { quantity: 100, isInStock: true },
        images: [{ imageUrl: "http://via.placeholder.com/400x400", altText: "T-shirt image", blurData: "blur3", averageColor: "#ffffff" }],
        ratings: { average: 4.0, reviewCount: 45 },
        tags: ["t-shirt", "cotton", "casual"]
    },
    {
        productSlug: "m3n4o5p6",
        title: "Cookware Set",
        longTitle: "Cookware Set",
        description: "Non-stick cookware set for everyday cooking.",
        category: "Kitchen",
        categoryId: "Kitchen",
        brand: "CookMaster",
        price: { original: 149, current: 99, discount: 33 },
        stock: { quantity: 30, isInStock: true },
        images: [{ imageUrl: "http://via.placeholder.com/400x400", altText: "Cookware image", blurData: "blur4", averageColor: "#c0c0c0" }],
        ratings: { average: 4.6, reviewCount: 28 },
        tags: ["cookware", "kitchen", "pots"]
    },
    {
        productSlug: "q7r8s9t0",
        title: "Mystery Novel",
        longTitle: "Mystery Novel",
        description: "A thrilling mystery novel.",
        category: "Books",
        categoryId: "Books",
        brand: "ReadMore",
        price: { original: 12, current: 9, discount: 25 },
        stock: { quantity: 75, isInStock: true },
        images: [{ imageUrl: "http://via.placeholder.com/400x400", altText: "Book cover", blurData: "blur5", averageColor: "#a08060" }],
        ratings: { average: 4.3, reviewCount: 15 },
        tags: ["book", "mystery", "fiction"]
    },
    {
        productSlug: "u1v2w3x4",
        title: "Building Blocks Set",
        longTitle: "Building Blocks Set",
        description: "A set of colorful building blocks for kids.",
        category: "Toys",
        categoryId: "Toys",
        brand: "PlayTime",
        price: { original: 39, current: 29, discount: 26 },
        stock: { quantity: 60, isInStock: true },
        images: [{ imageUrl: "http://via.placeholder.com/400x400", altText: "Blocks image", blurData: "blur6", averageColor: "#ff0000" }],
        ratings: { average: 4.7, reviewCount: 35 },
        tags: ["toys", "blocks", "kids"]
    },
    {
        productSlug: "y5z6a7b8",
        title: "Laptop Backpack",
        longTitle: "Laptop Backpack",
        description: "Durable backpack for laptops and essentials.",
        category: "Bags",
        categoryId: "Bags",
        brand: "TravelGear",
        price: { original: 79, current: 59, discount: 25 },
        stock: { quantity: 40, isInStock: true },
        images: [{ imageUrl: "http://via.placeholder.com/400x400", altText: "Backpack image", blurData: "blur7", averageColor: "#008000" }],
        ratings: { average: 4.1, reviewCount: 22 },
        tags: ["backpack", "laptop", "travel"]
    },
    {
        productSlug: "c9d0e1f2",
        title: "Ceramic Coffee Mug",
        longTitle: "Ceramic Coffee Mug",
        description: "A stylish ceramic mug for coffee or tea.",
        category: "Kitchen",
        categoryId: "Kitchen",
        brand: "MugLife",
        price: { original: 15, current: 10, discount: 33 },
        stock: { quantity: 120, isInStock: true },
        images: [{ imageUrl: "http://via.placeholder.com/400x400", altText: "Mug image", blurData: "blur8", averageColor: "#0000ff" }],
        ratings: { average: 4.4, reviewCount: 50 },
        tags: ["mug", "coffee", "tea"]
    },
    {
        productSlug: "g3h4i5j6",
        title: "Running Shoes",
        longTitle: "Running Shoes",
        description: "Lightweight running shoes for optimal performance.",
        category: "Shoes",
        categoryId: "Shoes",
        brand: "RunFast",
        price: { original: 99, current: 79, discount: 20 },
        stock: { quantity: 80, isInStock: true },
        images: [{ imageUrl: "http://via.placeholder.com/400x400", altText: "Shoes image", blurData: "blur9", averageColor: "#800080" }],
        ratings: { average: 4.8, reviewCount: 65 },
        tags: ["shoes", "running", "sports"]
    },
    {
        productSlug: "k7l8m9n0",
        title: "Desk Lamp",
        longTitle: "Desk Lamp",
        description: "Adjustable desk lamp for reading and working.",
        category: "Lighting",
        categoryId: "Lighting",
        brand: "BrightLight",
        price: { original: 49, current: 39, discount: 20 },
        stock: { quantity: 90, isInStock: true },
        images: [{ imageUrl: "http://via.placeholder.com/400x400", altText: "Lamp image", blurData: "blur10", averageColor: "#ffff00" }],
        ratings: { average: 4.2, reviewCount: 38 },
        tags: ["lamp", "desk", "lighting"]
    }
]

// type productType = {
//     name: string,
//     description: string,
//     price: number,
//     rating: number,
//     image: string,
//     reviewCount?: number | null,
//     category?: string
// }
// const mockProducts: Array<productType> = [
//     {
//         name: "HP LAptop",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
//         price: 92899,
//         rating: 5,
//         image: "http://via.placeholder.com/400x400",
//         reviewCount: 92899,
//     },
//     {
//         name: "HP LAptop",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
//         price: 58564,
//         rating: 4,
//         image: "http://via.placeholder.com/400x400",
//         reviewCount: 58564,
//     },
//     {
//         name: "HP Laptop",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
//         price: 656546,
//         rating: 3,
//         image: "http://via.placeholder.com/400x400",
//         reviewCount: 656546,
//     },
//     {
//         name: "HP Laptop",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
//         price: 456845,
//         rating: 2,
//         image: "http://via.placeholder.com/400x400",
//         reviewCount: 456845,
//     },
//     {
//         name: "HP Laptop",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
//         price: 78675,
//         rating: 1,
//         image: "http://via.placeholder.com/400x400",
//         reviewCount: 78675,
//     },
//     {
//         name: "HP Laptop",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
//         price: 76861,
//         rating: 0,
//         image: "http://via.placeholder.com/400x400",
//         reviewCount: 76861,
//     },
//     {
//         name: "HP Laptop",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
//         price: 56484,
//         rating: 4,
//         image: "http://via.placeholder.com/400x400",
//         reviewCount: 56484,
//     },
//     {
//         name: "HP Laptop",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
//         price: 45648,
//         rating: 3,
//         image: "http://via.placeholder.com/400x400",
//         reviewCount: 45648,
//     },
//     {
//         name: "HP Laptop",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
//         price: 45648,
//         rating: 5,
//         image: "http://via.placeholder.com/400x400",
//         reviewCount: 45648,
//     },
//     {
//         name: "HP Laptop",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, necessitatibus cumque? Veniam totam labore eum error quod quasi alias consequatur!",
//         price: 35434,
//         rating: 1,
//         image: "http://via.placeholder.com/400x400",
//         reviewCount: 35434,
//     },
// ]

const ProductSection = ({ title }: { title: string }) => {
    // const [products, setProducts] = useState<Array<productType>>(mockProducts)
    const [products, setProducts] = useState<Array<productType>>(mockProducts)

    return (
        <section>
            <h1 className='px-4 sm:px-8 pt-4 sm:pt-6 font-bold text-[2em] capitalize'>{title}</h1>
            <div className='p-4 sm:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6'>
                {products.map((item, index) => {
                    return <ProductCard key={index} data={item} />
                })}
            </div>
        </section>
    )
}

export default ProductSection