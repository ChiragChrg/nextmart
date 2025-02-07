"use client"

import ProductCard from '@/components/products/ProductCard'
import { useFetchAllProducts } from '@/hooks/useFetchData'
import { productType } from '@/types'
import Fuse, { FuseResult } from 'fuse.js'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type pageProps = {

}

const Search: React.FC<pageProps> = ({ }) => {
    const searchQuery = useSearchParams().get('query') ?? ''
    const [searchResults, setSearchResults] = useState<FuseResult<productType>[]>([])

    const { data } = useFetchAllProducts()

    const fuse = new Fuse(data ?? [], {
        keys: ['title', 'productSlug'],
        shouldSort: true,
    })

    useEffect(() => {
        const result = fuse.search(searchQuery)
        setSearchResults(result)
    }, [data])

    return <main className='main_style mt-4 mb-8'>
        <h1 className='text-[2em] font-bold self-start'>
            <span>Search results for </span>
            <span className='text-primaryClr'>"{searchQuery}"</span>
        </h1>

        <div className='p-4 sm:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6'>
            {searchResults.map((product, index) => {
                return <ProductCard key={index} data={product.item} />
            })}
        </div>
    </main>
}

export default Search