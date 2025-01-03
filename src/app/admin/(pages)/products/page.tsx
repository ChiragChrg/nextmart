import { Button } from '@/components/ui/button'
import { PackagePlusIcon, SwatchBookIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Products = () => {
    return (
        <section className='admin_section'>
            <div className="flex justify-between items-center">
                <h1 className='text-[2em] font-bold'>Products</h1>

                <Button className='flex_center gap-4 bg-primaryClr hover:bg-primaryClr_Alt' asChild>
                    <Link href={"products/new"}>
                        <PackagePlusIcon />
                        <span>New Product</span>
                    </Link>
                </Button>
            </div>

        </section>
    )
}

export default Products