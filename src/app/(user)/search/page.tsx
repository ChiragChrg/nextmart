"use client"

import ProductCard from '@/components/products/ProductCard'
import { useFetchAllProducts } from '@/hooks/useFetchData'
import { productType } from '@/types'
import Fuse, { FuseResult } from 'fuse.js'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'


const Search: React.FC = ({ }) => {
    const searchQuery = useSearchParams().get('query') ?? ''
    const [searchResults, setSearchResults] = useState<FuseResult<productType>[]>([])

    const { data } = useFetchAllProducts()

    const fuse = useMemo(() => new Fuse(data ?? [], {
        keys: ['title', 'productSlug'],
        shouldSort: true,
    }), [data])

    useEffect(() => {
        setSearchResults(fuse.search(searchQuery))
    }, [searchQuery, fuse])

    return <main className='main_style mt-4 mb-8'>
        <h1 className='text-[2em] font-bold self-start'>
            <span>Search results for </span>
            <span className='text-primaryClr'>&quot;{searchQuery}&quot;</span>
        </h1>

        <div className='p-4 sm:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6'>
            {searchResults.map((product, index) => {
                return <ProductCard key={index} data={product.item} />
            })}
        </div>
    </main>
}

export default Search