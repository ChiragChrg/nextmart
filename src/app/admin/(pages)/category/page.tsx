"use client"

import { Button } from '@/components/ui/button'
import { useFetchAllCategories } from '@/hooks/useFetchData'
import { SwatchBookIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Category = () => {
    const { data: categories } = useFetchAllCategories()

    return (
        <section className='admin_section'>
            <div className="flex justify-between items-center mb-4">
                <h1 className='text-[2em] font-bold'>Category</h1>

                <Button className='flex_center gap-4 bg-primaryClr hover:bg-primaryClr_Alt' asChild>
                    <Link href={"category/new"}>
                        <SwatchBookIcon />
                        <span>New Category</span>
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 w-full">
                {categories?.map((category) => (
                    <div key={category.categoryId} className="flex flex-col justify-between p-4 bg-secondaryClr/80 rounded-md shadow">
                        <h2 className='text-xl font-bold'>{category.categoryName}</h2>
                        <p className='text-[0.9em]'>{category.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <Link href={`category/${category.categoryId}`}>
                                <Button className='bg-primaryClr hover:bg-primaryClr_Alt'>View Products</Button>
                            </Link>
                            <Link href={`category/${category.categoryId}/edit`}>
                                <Button className='bg-gray-500 hover:bg-gray-500/60'>Edit</Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Category