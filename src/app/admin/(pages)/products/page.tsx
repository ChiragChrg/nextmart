import { Button } from '@/components/ui/button'
import { PackagePlusIcon, SwatchBookIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { DataTable } from '../../components/data-table'
import { columns } from './columns'
import { getAllCategories, getAllProducts } from '@/app/actions/ProductsAction'
import { productType, ProductTypeFlat } from '@/types'
import { CategoryType } from '@/store/categorySlice'

const Products = async () => {
    const productData = await (await getAllProducts()).response as productType[]

    const formattedData: ProductTypeFlat[] = productData.map(product => ({
        productId: product.productId,
        image: product.images[0],
        title: product.title,
        category: product?.category?.categoryName ?? "",
        brand: product.brand,
        price: product.price.current,
        stock: product.stock.quantity,
        productPath: `/product/${product.category?.categorySlug}/${product.productSlug}`
    }))

    return (
        <section className='admin_section'>
            <div className="flex justify-between items-center mb-4">
                <h1 className='text-[2em] font-bold'>Products</h1>

                <Button className='flex_center gap-4 bg-primaryClr hover:bg-primaryClr_Alt' asChild>
                    <Link href={"products/new"}>
                        <PackagePlusIcon />
                        <span>New Product</span>
                    </Link>
                </Button>
            </div>

            <DataTable columns={columns} data={formattedData} />
        </section>
    )
}

export default Products